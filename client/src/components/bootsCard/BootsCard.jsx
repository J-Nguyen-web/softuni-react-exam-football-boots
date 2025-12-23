import { Link } from "react-router-dom";

export default function BootsCard({
    _id,
    title,
    type,
    price,
    image,
    description,

}) {
    return (
        <div className="boots-card">
            <div className="boots-image">
                <img src={image} alt={title} />
                
            </div>
            
            <div className="boots-content">
                <h3 className="boots-name">{title}</h3>
                <div className="boots-meta">
                    <span className="boots-terrain">Terrain type: {type}</span>
                    <span className="boots-price">Price: {price.toFixed(2)} $</span>
                </div>
                {/* <p className="boot-description">{description}</p> */}
                <Link to={`details/${_id}`} className="boots-details-btn">Details</Link>
            </div>
        </div>
    );
}