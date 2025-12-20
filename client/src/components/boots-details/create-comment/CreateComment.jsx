import { useModal } from "../../../context/ModalContext.jsx";
import UserContext from "../../../context/UserContext.jsx";
import useForm from "../../../hooks/useFormValidate.js";
import useReq from "../../../hooks/useReq.js";
import { parseServerError } from "../../../util/errorHandler.js";

export default function CreateComment({
    user,
    onCreate
}) {
    const { bootsId } = userParams();
    const {showModal} = useModal();
    const { user, isAuth } = UserContext()
    const { request } = useReq();
    
    const submitHandler = async ({ comment }) => {
        try {
            await request('/data/comments', 'POST', {
                message: comment,
                bootsId
            });
            onCreate();
        } catch (error) {
            showModal(parseServerError(error));
        }
    }

    const {
        inputData,
        formAction
    } = useForm(submitHandler, {
        comment: '',
    })


    
    return (
        <div className="comments-section">
            <h3>Comments</h3>
            {boots.comments?.length === 0 && (
                <p className="no-comments">No comments yet.</p>
            )}
            
            <ul className="comments-list">
                {boots.comments?.map((comment, i) => (
                    <li key={i} className="comment">{comment}</li>
                ))}
            </ul>

            <form action={formAction} className="comments-form">
                <textarea {...inputData('comment')} placeholder="Show us how much you love this boots.."></textarea>
                <button className="btn submit" type="submit" disabled={!user}>Shooot it</button>
            </form>
        </div>
);
}