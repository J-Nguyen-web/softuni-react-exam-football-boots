import UserContext from "../../context/UserContext.jsx";
import BootsCard from "../bootsCard/BootsCard.jsx";

export default function Profile() {

    const {user} = UserContext

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
                        <BootsCard key={boots._id} {...boots} />
                    ))}
                </div>
            </section>
            
            <section className="profile-section">
                <h3>Liked Boots</h3>
                {likedBoots.lenght === 0 && <p>No liked boots yet.</p>}
                <div className="profile-grid">
                    {likedBoots.map( boots => (
                        <BootsCard key={boots._id} {...boots} />
                    ))}
                </div>
            </section>

            <section className="profile-section">
                <h3>Comments</h3>
                {comments.lenght === 0 && <p>No comments yet.</p>}
                <ul className="profile-comments">
                    <li key={comment._id}>
                        <strong>{comment.bootTitle}: {comment.text}</strong>
                    </li>
                </ul>
            </section>

        </section>
    );
}