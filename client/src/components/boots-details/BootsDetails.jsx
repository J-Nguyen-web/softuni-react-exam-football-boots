import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx";
import { useState } from "react";
import { useModal } from "../../context/ModalContext.jsx";
import Roulette from "../Roulette.jsx";
import useForm from "../../hooks/useForm.js";
import { parseServerError } from "../../util/errorHandler.js";
import { useEffect } from "react";
import TERRAIN_TYPE from "../../util/terrainType.js";
import { supabase } from "../../supabaseClient.js";

export default function BootsDetails() {
    
    const { user, isAuth } = useUserContext();
    const { showModal, showConfirm } = useModal();
    const { bootsId } = useParams();

    const [refresh, setRefresh] = useState(false);
    const [sending, setSending] = useState();
    const [sendingLike, setSendingLike] = useState();
    const [boots, setBoots] = useState(null);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDetails() {
            try {
                const [bootsResult, likesResult, commentsResult, profilesResult] = await Promise.all ([
                    supabase
                        .from('boots')
                        .select('*')
                        .eq('id', bootsId) // equal - връща специфичен резултат
                        .single(),      // return single object вместо array
                    supabase
                        .from('likes')
                        .select('*')
                        .eq('boots_id', bootsId), // prevent fecth на likes and comments на други чифт бутонки
                    supabase
                        .from('comments')
                        .select('*')
                        .eq('boots_id', bootsId),
                    supabase
                        .from('profiles')
                        .select('id, username'),
                ])
                if(bootsResult.error) throw bootsResult.error
                if(likesResult.error) throw likesResult.error
                if(commentsResult.error) throw commentsResult.error
                if(profilesResult.error) throw profilesResult.error

                // намиране на username от таблицата profiles в PostgreSQL чрез user.id-то отговарящо на дадения username
                // по този начин дори username да се смени, ще се отрази и в коментарите, вместо да се запазва username-a по време на post
                const commentsWithAuthor = commentsResult.data.map( comment => ({
                    ...comment,
                    author: profilesResult.data.find(
                        profile => profile.id === comment.user_id
                    ) ?? null
                }));

                setBoots(bootsResult.data)
                setLikes(likesResult.data)
                setComments(commentsWithAuthor)

            } catch (error) {
                showModal(error.message, 'error')
            }
        }
        fetchDetails();
        
    },[bootsId, refresh])
    
    // const { data: boots, request } = useReq(`/data/boots/${bootsId}`, null)

    const isOwner = user?.id === boots?.user_id;


    // const urlParams = new URLSearchParams({
    //     where: `bootsId="${bootsId}"`,
    //     load: 'author=_ownerId:users'
    // });

    // const commentsUrl = `/data/comments?${urlParams.toString()}`;
    
    const userLike= likes.find( like => like.user_id === user?.id);
    const liked = !!userLike
    const likeId = userLike?.id ?? null;

    const likeBootsHandler = async () => {
        if(!isAuth || sendingLike) return;

            setSendingLike(true);
        try {
            if(liked && likeId){
                // await request(`/data/likes/${likeId}`, 'DELETE');
                // setLiked(false);
                // setLikeId(null);
               const { error } = await supabase
                    .from('likes')
                    .delete()
                    .eq('id', likeId)

                if (error) throw error;                
            } else {
                // const newLike = await request('/data/likes', 'POST', {bootsId, userId: user._id})
                // setLiked(true);
                // setLikeId(newLike._id);
               const { error } = await supabase
                    .from('likes')
                    .insert({
                        boots_id: bootsId,
                        user_id: user.id
                    });

                if (error) throw error;                   
            }
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Failed to like/unlike", error);
            showModal("Unable to process like action!", "error");
        } finally {
            setSendingLike(false)
        }
    };

    // refresh comments when refresh changes
    // useEffect(() => {
    //     fetchComments(commentsUrl, "GET")
    // }, [refresh, commentsUrl,])

    const submitHandler = async ({ comment }) => {
        if(!comment.trim() || sending) return;

        setSending(true);

        try {
            // await request('/data/comments', 'POST', {
            //     message: comment, bootsId });
            const { error } = await supabase
                .from('comments')
                .insert({
                    message: comment.trim(),
                    boots_id: bootsId,
                    user_id: user.id
                });
            
            if (error) throw error;

            setRefresh(state => !state);
            setValues({comment: ''})
        } catch (error) {
            showModal(parseServerError(error), "error");
        } finally {
            setSending(false);
        }
    }

    const {
        inputData,
        formAction,
        setValues, 
    } = useForm(submitHandler, {
        comment: '',
    });
    
    const delteBootsHandler = async () => {
        if (!isOwner) return;
        showConfirm(`Are you sure you want to delete that entry?`, async () => {
            try {

                // const bootsUriCode = encodeURIComponent(`bootsId="${bootsId}"`)
                // const comments = await request(
                //     `/data/comments?where=${bootsUriCode}`)
                // await Promise.all(
                //     comments.map( comment => request(`/data/comments/${comment._id}`, "DELETE")))
                // await request(`/data/boots/${bootsId}`, 'DELETE');

                const { data, error } = await supabase
                    .from('boots')
                    .delete()
                    .eq('id', bootsId)
                    .eq('user_id', user.id)
                    .select(); // only for verification за изтрития запис

                if (!data.length) {
                    throw new Error('No boot was deleted. Check ownership or permission.')
                }

                if(error) throw error;        

                showModal("Boots deleted succesfully!", "success")
                navigate('/boots');
            } catch (error) {
                showModal("Unable to delete the boots!", "error")
            }
        })
    };

    const deleteCommentHandler = async (commentId, ownerId) => {

        if (user?.id !== ownerId) return;
        showConfirm(`Are you sure you want to delete that comment?`, async () => {
            try {
                // await request(`/data/comments/${commentId}`, 'DELETE');
                // showModal("Comment deleted succesfully!", "success")
                // setRefresh(state => !state);

                const { error } = await supabase
                    .from('comments')
                    .delete()
                    .eq('id', commentId)
                    .eq('user_id', user.id)

                if(error) throw error;
                showModal('Comment deleted succesfully!', "succes");
                setRefresh(state => !state);
            } catch (error) {
                showModal(parseServerError(error), "error") // error.message?
            }
        })
    };
    

    if (!boots) return <Roulette />

    return (
        <section className="details-page">
            <div className="details-card">
                <div className="details-image"><img src={boots?.image} alt={boots?.title} /></div>
                <div className="details-content">
                    <h2 className="details-title">{boots?.title || 'Loading...'}</h2>
                    <div className="details-meta">
                        <Link to={`/terrains#${boots?.type}`} target="_blank">
                            <span className="details-terrain"  title={TERRAIN_TYPE[boots?.type]}>Terrain type: {boots?.type || '-'}</span>
                        </Link>
                        <span className="details-price">Price: {boots?.price != null && !isNaN(Number(boots.price)) ? Number(boots.price).toFixed(2) : '0.00'} $</span>
                    </div>
                    <p className="details-description">{boots?.description || '-'}</p>

                    {isAuth && isOwner && (
                        <div className="details-actions">
                            <Link to={`/boots/edit/${bootsId}`} className="btn edit">Edit</Link>
                            <button className="btn delete" onClick={delteBootsHandler}>Delete</button>
                        </div>
                    )}
                    {isAuth && !isOwner && (
                        <button className={`btn like ${liked ? 'liked' : ''} `} onClick={likeBootsHandler} disabled={sendingLike}>{liked ? 'Unlike' : 'Like'} ({likes.length})</button>
                    )}
                    {!isAuth && (
                        <p><Link to={`/login`} ><span className="linkTo">Login</span></Link> to interact.</p>
                    )}

                </div>
            </div>

            <div className="comments-section">
                <h3>Comments</h3>
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id} className="comment">
                            <span className="comment-author">{comment.author?.username} :</span>
                            <p className="comment-text"> {comment.message} </p>
                            <div className="comments-action">
                                {user?.id === comment.user_id ? 
                                    <button className="btn-delete-comment" onClick={() => deleteCommentHandler(comment.id, comment.user_id)}>Delete</button>
                                : ''
                                }
                            </div>
                        </li>
                    ))}
                </ul>
                {comments?.length === 0 && (
                    <p className="no-comments">No comments yet.</p>
                )}

                <form action={formAction} className="comments-form">
                    <textarea {...inputData('comment')} placeholder="Good vibes or nothing.."></textarea>
                    <button className="btn submit" type="submit" disabled={!user || sending}>Shooot it</button>
                    {/* <p>(button is dissabled while sending or empty message)</p> */}
                </form>
            </div>
        </section>
    );
}