import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx";

export default function Header() {
    const { isAuth } = useUserContext();
    return (
        <header className="nav Link home">
            <nav>
                <Link className="home" to="/"><img alt="" /></Link>
                <Link to="/boots" className="nav-link">Catalog</Link>
                {isAuth
                    ? (
                        <div id="user">
                            <Link to="/boots/create" className="nav-link">Create boots</Link>
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </div>
                    )
                    : (
                        <div className="guests">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </div>
                    )}
            </nav>
        </header>
    );
}