import { Link } from "react-router-dom";
import TERRAIN_TYPE from "../../util/terrainType.js";

export default function BootsCard({
    id,
    _id,
    title,
    type,
    price,
    image,
    likes,

}) {
    const bootsId = id ?? _id // ?? - otherwise if no id exist
    // todo image exist or not - display default image

    return (
        <div className="boots-card">
            <div className="boots-image">
                <img src={image} alt={title} />
                
            </div>
            
            <div className="boots-content">
                <h3 className="boots-name" title={title}>{title}</h3>
                <div className="boots-meta">
                    <Link to={`/terrains#${type}`} target="_blank"><span className="boots-terrain" title={TERRAIN_TYPE[type]}>Terrain type: {type}</span></Link>
                    <span className="boots-price">Price: {price.toFixed(2)} $</span>
                </div>
                <div className="boots-likes">Likes: {likes} </div>
                <Link to={`/boots/details/${bootsId}`} className="boots-details-btn">Details</Link>
            </div>
        </div>
    );
}