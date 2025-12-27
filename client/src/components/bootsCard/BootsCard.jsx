import { Link } from "react-router-dom";

export default function BootsCard({
    _id,
    title,
    type,
    price,
    image,

}) {

    const TERRAIN_TYPE = {
            AG:"Artificial Grass - 3G/4G synthetic turf",
            FG:"Firm Ground - natural gras, dry or sligthly damp",
            HG:"Hard Ground - short, robust studs, durability",
            MG:"Multi-Ground - multiple surface",
            SG:"Soft Ground - natural grass, muddy",
            TF:"Turf - hard ground, old artificial turf",
            IN:"Indoor - futsal, indoor terrain",
            
    }

    return (
        <div className="boots-card">
            <div className="boots-image">
                <img src={image} alt={title} />
                
            </div>
            
            <div className="boots-content">
                <h3 className="boots-name">{title}</h3>
                <div className="boots-meta">
                    <Link to={`/terrains#${type}`}><span className="boots-terrain" title={TERRAIN_TYPE[type]}>Terrain type: {type}</span></Link>
                    <span className="boots-price">Price: {price.toFixed(2)} $</span>
                </div>
                {/* <p className="boot-description">{description}</p> */}
                <Link to={`details/${_id}`} className="boots-details-btn">Details</Link>
            </div>
        </div>
    );
}