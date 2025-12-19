import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx";
import { useState } from "react";
import useReq from "../../hooks/useReq.js";
import Roulette from "../Roulette.jsx";

export default function BootsDetails() {
    const { user, isAuth } = useUserContext();
    const navigate = useNavigate();
    const {bootsId} = useParams();
    const [ refresh, setRefresh] = useState(false);
    const { data: boots, request} = useReq(`/data/boots/${bootsId}`, null)

    const isOwner = user?._id === boots?._ownerId;

    const delteBootsHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete that entry?`)

        if (!isConfirmed) return;
        if (!isOwner) return;
        
        try {
            await request(`/data/boots/${bootsId}`, 'DELETE');

            navigate('/boots');
        } catch (error) {
            alert('Unable to delete entry!', error.message)
        }
    }

    const refreshHandler = () => {
        setRefresh(state => !state)
    }

    if (!boots){
        return <Roulette />
    }

        return (
            <section className="details-page">
                <div className="details-card">
                    <div className="details-image"><img src={boots?.image} alt={boots?.title} /></div>
                    <div className="details-content">
                        <h2 className="details-title">{boots?.title || 'Loading...'}</h2>
                        <div className="details-meta">
                            <span className="details-terrain">Terrain type: {boots?.type || '-'}</span>
                            <span className="details-price">{boots?.price !== undefined ? boots.price.toFixed(2) : '0.00'} $</span>
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
                             <p><Link to={`/login`} >Login</Link> to interact.</p>
                            )}
                             
                    </div>
                </div>

                <div className="comments-section">
                    <h3>Comments</h3>
                    {customElements?.length === 0 && (
                        <p className="no-comments">No comments yet.</p>
                    )}
                    
                    <ul className="comments-list">
                        {boots.comments?.map((comment, i) => (
                            <li key={i} className="comment">{comment}</li>
                        ))}
                    </ul>

                    <form action="" className="comments-form">
                        <textarea name="" id=""></textarea>
                        <button>Post Comment</button></form>
                </div>
            </section>
        );
    }