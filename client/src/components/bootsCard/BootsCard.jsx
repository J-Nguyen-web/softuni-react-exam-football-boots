import { Link } from "react-router-dom";
import TERRAIN_TYPE from "../../util/terrainType.js";

export default function BootsCard({
    _id,
    title,
    type,
    price,
    image,
    likes,

}) {

    return (
        <div className="boots-card">
            <div className="boots-image">
                <img src={image} alt={title} />
                
            </div>
            
            <div className="boots-content">
                <h3 className="boots-name">{title}</h3>
                <div className="boots-meta">
                    <Link to={`/terrains#${type}`} target="_blank"><span className="boots-terrain" title={TERRAIN_TYPE[type]}>Terrain type: {type}</span></Link>
                    <span className="boots-price">Price: {price.toFixed(2)} $</span>
                </div>
                <div className="boots-likes">Likes: {likes} </div>
                <Link to={`details/${_id}`} className="boots-details-btn">Details</Link>
            </div>
        </div>
    );
}