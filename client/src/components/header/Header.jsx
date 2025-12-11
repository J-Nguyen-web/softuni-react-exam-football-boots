export default function Header() {
    return (
        <header className="nav Link home">
            <nav>
                <Link className="home" to="/"><img src="" alt="" /></Link>
                <Link to="/catalog">Catalog</Link>
                <div id="user">
                    <Link to="boots/create">Create boots</Link>
                    <Link to="/logout">Logout</Link>
                </div>
                <div className="guests">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
}