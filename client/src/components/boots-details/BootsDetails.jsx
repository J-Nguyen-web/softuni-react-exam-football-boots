import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx";
import { useState } from "react";
import useReq from "../../hooks/useReq.js";
import { useModal } from "../../context/ModalContext.jsx";
import Roulette from "../Roulette.jsx";
import useForm from "../../hooks/useForm.js";
import { parseServerError } from "../../util/errorHandler.js";
import { useEffect } from "react";

export default function BootsDetails() {
    const { user, isAuth } = useUserContext();
    const { showModal, showConfirm } = useModal();
    const { bootsId } = useParams();
    const [refresh, setRefresh] = useState(false);
    const [sending, setSending] = useState();
    const navigate = useNavigate();
    
    const { data: boots, request } = useReq(`/data/boots/${bootsId}`, null, [refresh])

    const isOwner = user?._id === boots?._ownerId;


    const urlParams = new URLSearchParams({
        where: `bootsId="${bootsId}"`,
        load: 'author=_ownerId:users'
    });

    const commentsUrl = `/data/comments?${urlParams.toString()}`;
    const {data: comments =[], request: fetchComments} = useReq(commentsUrl, []);

    // refresh comments when refresh changes
    useEffect(() => {
        fetchComments(commentsUrl, "GET")
    }, [refresh])

    const submitHandler = async ({ comment }) => {
        if(!comment.trim()) return;

        setSending(true);
        try {
            await request('/data/comments', 'POST', {
                message: comment,
                bootsId
            });
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
                const bootsUriCode = encodeURIComponent(`bootsId="${bootsId}"`)
                const comments = await request(
                    `/data/comments?where=${bootsUriCode}`
                )

                await Promise.all(
                    comments.map( comment => request(`/data/comments/${comment._id}`, "DELETE"))
                )

                await request(`/data/boots/${bootsId}`, 'DELETE');
                showModal("Boots deleted succesfully!", "success")
                navigate('/boots');
            } catch (error) {
                showModal("Unable to delete the boots!", "error")
            }
        })
    };

    const deleteCommentHandler = async (commentId) => {
        if (!isOwner) return;
        showConfirm(`Are you sure you want to delete that comment?`, async () => {
            try {
                await request(`/data/comments/${commentId}`, 'DELETE');
                showModal("Comment deleted succesfully!", "success")
                setRefresh(state => !state);
            } catch (error) {
                showModal(parseServerError(error), "error")
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
                        <span className="details-terrain">Terrain type: {boots?.type || '-'}</span>
                        <span className="details-price">{boots?.price != null && !isNaN(Number(boots.price)) ? Number(boots.price).toFixed(2) : '0.00'} $</span>
                    </div>
                    <p className="details-description">{boots?.description || '-'}</p>

                    {isAuth && isOwner && (
                        <div className="details-actions">
                            <Link to={`/boots/edit/${bootsId}`} className="btn edit">Edit</Link>
                            <button className="btn delete" onClick={delteBootsHandler}>Delete</button>
                        </div>
                    )}
                    {isAuth && !isOwner && (
                        <button className="btn delete">Like</button>
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
                        <li key={comment._id} className="comment">
                            <span className="comment-author">{comment.author?.email} :</span>
                            <p className="comment-text"> {comment.message} </p>
                            <div className="comments-action">
                                {user._id === comment._ownerId ? 
                                    <button className="btn-delete-comment" onClick={() => deleteCommentHandler(comment._id)}>Delete</button>
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
                    <button className="btn submit" type="submit" disabled={!user}>Shooot it</button>
                    <p>(button is dissabled while sending)</p>
                </form>
            </div>
        </section>
    );
}