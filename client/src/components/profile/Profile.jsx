import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext.jsx";
import BootsCard from "../bootsCard/BootsCard.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import Roulette from "../Roulette.jsx";
import { attachLikes } from "../../util/attachLikes.js";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient.js";

export default function Profile() {

    const {user} = useUserContext();
    const {showModal} = useModal();

    const [createdBoots, setCreatedBoots] = useState([]);
    const [likedBoots, setLikedBoots] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchProfileData = async () => {

            if(!user?.id) {
                setLoading(false)
                return
            }

            try {
                const [
                    createdBootsData,
                    userLikes,
                    commentsData,
                    likesData,
                ] = await Promise.all([
                    // request(`/data/boots?where=${encodeURIComponent(`_ownerId="${user._id}"`)}`),
                    // request(`/data/comments?where=${encodeURIComponent(`_ownerId="${user._id}"`)}`),
                    // request(`/data/likes?where=${encodeURIComponent(`userId="${user._id}"`)}`),
                    // request(`/data/likes`),

                    supabase
                        .from('boots')
                        .select('*')
                        .eq('user_id', user.id), // equal - връща специфичен резултат
                    supabase
                        .from('likes')
                        .select('*')
                        .eq('user_id', user.id), // prevent fecth на likes and comments на други чифт бутонки
                    supabase
                        .from('comments')
                        .select('*')
                        .eq('user_id', user.id),
                    supabase
                        .from('likes')
                        .select('*'),
                ]);

                if(createdBootsData.error) throw createdBootsData.error;
                if(userLikes.error) throw userLikes.error;
                if(commentsData.error) throw commentsData.error;
                if(likesData.error) throw likesData.error;
                
                // намиране на likes и comments на определени обувки
                const relatedBootsId = [
                    ...new Set([
                        ...userLikes.data.map(like => like.boots_id),
                        ...commentsData.data.map(comment => comment.boots_id),
                    ]),
                ];
                
                const {data: relatedBoots, error: relatedBootsError} = 
                    relatedBootsId.length
                        ? await supabase
                            .from('boots')
                            .select('*')
                            .in('id', relatedBootsId) // fetch all related boots в един .in спрямо id колоната
                        : {data: [], error: null };

                    if (relatedBootsError) throw relatedBootsError;

                    // create look up object using boots ID
                    const bootsMap = relatedBoots.reduce((acc, boot) => {
                        acc[boot.id] = boot;
                        return acc;
                },{});

                // добавяне на имената на модела към коментарите на потребителя
                const commentsWithTitles = commentsData.data.map(comment => ({
                    ...comment,
                    bootsTitle: bootsMap[comment.boots_id]?.title ?? 'Delete boots',
                }));

                // boots liked by the user
                const likedBootsByUser = userLikes.data
                    .map(like => bootsMap[like.boots_id])
                    .filter(Boolean);

                // всички likes за всяа обувка
                const likesMap = likesData.data.reduce((acc, like) => {
                    acc[like.boots_id] = (acc[like.boots_id] || 0) +1;
                    return acc;
                },{})

                const addLikeCounts = boots => boots.map(boot => ({
                    ...boot,
                    likes: likesMap[boot.id] || 0,
                }));

                const createdBootsWithLike = addLikeCounts(createdBootsData.data)
                const likedBootsWithLikes = addLikeCounts(likedBootsByUser)

                if(!mounted) return;

                setCreatedBoots(createdBootsWithLike)
                setLikedBoots(likedBootsWithLikes)
                setComments(commentsWithTitles);

            } catch (error) {
                if (mounted) {
                    console.error('Failed to load profile:', error);
                    showModal(error.message, 'error');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

            fetchProfileData();

            return () => {
                mounted = false;
            }
        }, [user?.id]);
    
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
                        <BootsCard key={boots?.id} {...boots} />
                    ))
                )}
                    
                </div>
            </section>
            
            <section className="profile-section">
                <h3>Liked Boots</h3>
                {!likedBoots || likedBoots.length === 0 ? (
                    <p>No liked boots yet.</p>
                ) : (
                    <div className="profile-grid">
                        {likedBoots.map( boots => (
                            <BootsCard key={boots?.id} {...boots} />
                            )
                        )}
                    </div>
                )}
            </section>

            <section className="profile-section">
                <h3>Your Comments</h3>
                {!comments || comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <div className="profile-comments">
                        {comments.map(comment => (
                        <div className="profile-comment" key={comment?.id}>
                            <Link to={`/boots/details/${comment.boots_id}`}>
                                <div className="profile-comment-title" title={comment.bootsTitle}>
                                    <strong>{comment.bootsTitle}</strong>
                                </div>
                                <div className="profile-comment-text">
                                    {comment.message}
                                </div>
                            </Link> 
                        </div>  
                        ))}
                    </div>
                )}
            </section>
        </section>
    );
}