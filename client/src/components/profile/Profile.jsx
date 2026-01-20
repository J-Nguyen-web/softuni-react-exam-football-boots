import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext.jsx";
import useReq from "../../hooks/useReq.js";
import BootsCard from "../bootsCard/BootsCard.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import Roulette from "../Roulette.jsx";
import { attachLikes } from "../../util/attachLikes.js";
import { Link } from "react-router-dom";

export default function Profile() {

    const {user} = useUserContext();

    const {request} = useReq();
    const {showModal} = useModal();
    const [createdBoots, setCreatedBoots] = useState([]);
    const [likedBoots, setLikedBoots] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        let mounted = true;

        (async () => {
            try {
                const [
                    createdBootsData,
                    commentsData,
                    userLikes,
                    likesData,
                ] = await Promise.all([
                    request(`/data/boots?where=${encodeURIComponent(`_ownerId="${user._id}"`)}`),
                    request(`/data/comments?where=${encodeURIComponent(`_ownerId="${user._id}"`)}`),
                    request(`/data/likes?where=${encodeURIComponent(`userId="${user._id}"`)}`),
                    request(`/data/likes`),
                ]);

                if(!mounted) return;
                
                const commentedBootsId = [...new Set(commentsData.map(comment => comment.bootsId))];

                const commentedBoots = await Promise.all(
                    commentedBootsId.map( id => request(`/data/boots/${id}`))
                );

                const bootsMap = commentedBoots.reduce((acc, bootsPair) => {
                    acc[bootsPair._id] = bootsPair;
                    return acc;
                }, {});

                const commentsWithTitles = commentsData.map( comment => ({
                    ...comment,
                    bootsTitle: bootsMap[comment.bootsId]?.title ?? 'Deleted boots'
                }))

                const likedBootsByUser = await Promise.all(
                    (userLikes.map(like => like.bootsId)).map(id => request(`/data/boots/${id}`))
                );

                setLikedBoots(attachLikes(likedBootsByUser, likesData));
                setCreatedBoots(attachLikes(createdBootsData, likesData));
                setComments(commentsWithTitles); //TODO COMMENTS WITH LINK AND TITLE OF THE BOOTS
                setLoading(false);
                console.log('e',commentsWithTitles)
                
            } catch (error) {
                showModal(error.message || 'Something went wrong')
                setLoading(false);
            }
        })(); 
        return ()=> (mounted = false)
    }, []);
    
    if(loading){
        return <Roulette />
    }

    return (
        <section className="profile-page">
            <div className="profile-header">
                <img src={user} alt="" className="profile-avatar" />
                <h2>{user.email}</h2>
            </div>


            <section className="profile-section">
                <h3>Created Boots</h3>
                <div className="profile-grid">
                {!createdBoots || createdBoots.length === 0 ? (
                    <p>No created boots yet.</p>
                    ) : (
                    createdBoots.map(boots => (
                        <BootsCard key={boots?._id} {...boots} />
                    ))
                    )
                }
                    
                </div>
            </section>
            
            <section className="profile-section">
                <h3>Liked Boots</h3>
                {!likedBoots || likedBoots.length === 0 ? (
                    <p>No liked boots yet.</p>
                    ) : (
                    <div className="profile-grid">
                        {likedBoots.map( boots => (
                            <BootsCard key={boots?._id} {...boots} />
                            )
                        )}
                    </div>
                )
                }
            </section>

            <section className="profile-section">
                <h3>Comments</h3>
                {!comments || comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul className="profile-comments">
                        {comments.map((comment) => (
                        <li key={comment?._id}>
                            <Link to={`/boots/details/${comment.bootsId}`}><strong>{comment.bootsTitle} :</strong></Link> {comment.message}
                        </li>  
                        ))}
                    </ul>
                )}
            </section>

        </section>
    );
}