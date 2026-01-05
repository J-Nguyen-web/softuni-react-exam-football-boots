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
    const [comments, setCommnets] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        let mounted = true;

        (async () => {
            try {
                const [ boots, likes, comments ] = await Promise.all([
                    request(`/data/boots?where=${encodeURIComponent(`_ownerId="${user._id}"`)}`),
                    request(`/data/likes?where=${encodeURIComponent(`userId="${user._id}"`)}`),
                    request(`/data/comments?where=${encodeURIComponent(`_ownerId="${user._id}"`)}`),
                ]);
                console.log('after')

                if(!mounted) return;
                setCreatedBoots(boots);
                setCommnets(comments);

                const likedBootsIds = likes.map( like => like.bootsId);
                const liked = await Promise.all(
                    likedBootsIds.map(id => request(`/data/boots/${id}`))
                );

                setLikedBoots(liked);
                setLoading(false);
                
                console.log(boots)
                console.log(likes)
                console.log(comments)
                
            } catch (error) {
                alert('error')
                showModal(error)
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
                <h2>{user}</h2>
            </div>


            <section className="profile-section">
                <h3>"Created Boots"</h3>
                <div className="profile-grid">
                    {createdBoots.map(boots => (
                        <BootsCard key={boots?._id} {...boots} />
                    ))}
                </div>
            </section>
            
            <section className="profile-section">
                <h3>Liked Boots</h3>
                {likedBoots.lenght === 0 && <p>No liked boots yet.</p>}
                <div className="profile-grid">
                    {likedBoots.map( boots => (
                        <BootsCard key={boots?._id} {...boots} />
                    ))}
                </div>
            </section>

            <section className="profile-section">
                <h3>Comments</h3>
                {comments.lenght === 0 && <p>No comments yet.</p>}
                <ul className="profile-comments">
                    <li key={comments?._id}>
                        <strong>{comments.bootTitle}: {comments.text}</strong>
                    </li>
                </ul>
            </section>

        </section>
    );
}