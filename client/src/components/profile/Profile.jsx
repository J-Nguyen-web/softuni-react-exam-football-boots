import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext.jsx";
import useReq from "../../hooks/useReq.js";
import BootsCard from "../bootsCard/BootsCard.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import Roulette from "../Roulette.jsx";

export default function Profile() {

    const {user} = useUserContext();

    const {request} = useReq();
    const {showModal} = useModal();
    const [createdBoots, setCreatedBoots] = useState();
    const [likedBoots, setLikedBoots] = useState();
    const [comments, setComments] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        let mounted = true;

        (async () => {
            try {
                const [
                    createdBoots,
                    userLikes,
                    allLikes,
                    comments,
                ] = await Promise.all([
                    request(`/data/boots?where=${encodeURIComponent(`_ownerId="${user._id}"`)}`),
                    request(`/data/likes?where=${encodeURIComponent(`userId="${user._id}"`)}`),
                    request(`/data/likes`),
                    request(`/data/comments?where=${encodeURIComponent(`_ownerId="${user._id}"`)}`),
                ]);

                if(!mounted) return;
                
                // likes count map
                const likesCount = allLikes.reduce((acc, likes) => {
                    acc[likes.bootsId] = (acc[likes.bootsId] || 0) +1;
                    return acc;
                }, {});
                
                // attach likes helper
                const withLikes = boots =>
                    boots.map(pairBoots => ({
                        ...pairBoots,
                        likes: likesCount[pairBoots._id] || 0
                    }));

                const likedBoots = await Promise.all(
                    (userLikes.map( like => like.bootsId)).map(id => request(`/data/boots/${id}`))
                );

                setLikedBoots(withLikes(likedBoots));
                setCreatedBoots(withLikes(createdBoots));
                setComments(comments);
                setLoading(false);

                console.log('e',likedBoots)

                
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
                {!createdBoots ? (
                    <p>No liked boots yet.</p>
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
                            <strong>{comment.bootTitle}: {comment.text}</strong>
                        </li>  
                        ))}
                    </ul>
                )}
            </section>

        </section>
    );
}