import { Link } from "react-router-dom";

export default function BootsCard({
    _id,
    name,
    type,
    image
}) {
    return (
        <div className="boots-card">
            <img src={image} alt={name} />
            <div className="short-info">
                <p className="name">{name}</p>
                <p className="type">{type}</p>
            </div>
            <Link to={`boots/${_id}/details`}></Link>
        </div>
    );
}