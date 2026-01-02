import UserContext from "../../context/UserContext.jsx";

export default function Profile() {

    const {user} = UserContext
    return (
        <section className="profile-page">
            <div className="profile-header">
                <img src="http" alt="" className="profile-avatar" />
                <h2>{user}</h2>
            </div>
        </section>
    );
}