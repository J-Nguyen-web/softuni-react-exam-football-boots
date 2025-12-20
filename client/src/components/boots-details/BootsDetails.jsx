import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx";
import { useState } from "react";
import useReq from "../../hooks/useReq.js";
import { useModal } from "../../context/ModalContext.jsx";
import Roulette from "../Roulette.jsx";
import useForm from "../../hooks/useForm.js";
import { parseServerError } from "../../util/errorHandler.js";

export default function BootsDetails() {
    const { user, isAuth } = useUserContext();
    const { showModal, showConfirm } = useModal();
    const navigate = useNavigate();
    const { bootsId } = useParams();
    const [refresh, setRefresh] = useState(false);
    const { data: boots, request } = useReq(`/data/boots/${bootsId}`, null, [refresh])

    const isOwner = user?._id === boots?._ownerId;


    const urlParams = new URLSearchParams({
        where: `bootsId="${bootsId}"`,
        load: 'author=_ownerId:users'
    });

    const {data: comments} = useReq(`/data/comments?${urlParams.toString()}`, [refresh]);
    console.log(comments)

    const submitHandler = async ({ comment }) => {
        try {
            await request('/data/comments', 'POST', {
                message: comment,
                bootsId
            });
            refreshHandler();
            setRefresh(refresh => !refresh)
        } catch (error) {
            showModal(parseServerError(error), "error");
        }
    }

    const {
        inputData,
        formAction
    } = useForm(submitHandler, {
        comment: '',
    });
    
    const delteBootsHandler = async () => {
        if (!isOwner) return;
        showConfirm(`Are you sure you want to delete that entry?`, async () => {
            try {
                await request(`/data/boots/${bootsId}`, 'DELETE');
                showModal("Boots deleted succesfully!", "succes")
                navigate('/boots');
            } catch (error) {
                showModal("Unable to delete the boots!", "error")
            }
        })
    };

    const refreshHandler = () => setRefresh(state => !state)

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
                            <p>{comment.author?.email}: {comment.message} </p>
                        </li>
                    ))}
                </ul>
                {comments?.length === 0 && (
                    <p className="no-comments">No comments yet.</p>
                )}

                <ul className="comments-list">
                    {boots.comments?.map((comment, i) => (
                        <li key={i} className="comment">{comment}</li>
                    ))}
                </ul>

                <form action={formAction} className="comments-form">
                    <textarea {...inputData('comment')} placeholder="Good vibes or nothing.."></textarea>
                    <button className="btn submit" type="submit" disabled={!user}>Shooot it</button>
                </form>
            </div>
        </section>
    );
}