import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx";
import { useState } from "react";

export default function Header() {
    const {user, isAuth } = useUserContext();
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const onSearch = (formData) => {
        const search = formData.get('search');

        if(!search) return;
        
        navigate(`/boots?search=${encodeURIComponent(search)}`)
    }
    return (
        <header className="nav Link home">

            <nav className="nav-inner">                
                <Link className="home-logo" to="/">
                    <span className="ball-wrapper">
                        <img src="/public/classic.png" alt="logo" />
                    </span>
                    <p className="nav-link">Home</p>
                </Link>

                <div className="search-wrapper">
                    <form action={onSearch} className="search-form">
                        <label htmlFor="search">Search</label>
                        <input
                            id="search"
                            name="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)} 
                            placeholder="Search boots and terrain types.." 
                        />
                    </form>
                </div>
                
                <div className="nav-group">
                <Link to="/terrains" className="nav-link">Terrain types</Link>
                <Link to="/boots" className="nav-link">Catalog</Link>
                {isAuth
                    ? (
                        <div id="user">
                            <Link to="/boots/create" className="nav-link">Create boots</Link>
                            <Link to="/profile" className="nav-link">You are logged with {user.email}</Link>
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </div>
                    )
                    : (
                        <div className="guests">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}