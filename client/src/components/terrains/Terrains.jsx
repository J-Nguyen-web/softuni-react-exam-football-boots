import { useEffect } from "react";

export default function Terrains() {

    useEffect(() => {
        const hash = window.location.hash;

        if(hash) {
            const element = document.querySelector(hash);
            element?.scrollIntoView({ behavior: "smooth"});
        }
    },[]);
    
    return (
        <div className="terrain-page">
            <nav className="terrain-nav">
                <a href="#AG">AG</a>
                <a href="#FG">FG</a>
                <a href="#HG">HG</a>
                <a href="#MG">MG</a>
                <a href="#SG">SG</a>
                <a href="#TF">TF</a>
                <a href="#IN">IN/IC</a>
                <a href="#FG-AG">FG/AG</a>
                <a href="#top" className="to-top"> Top</a>
            </nav>
            <div id="top"></div>
            <div className="title-info">
                <h2>Why terrain matters</h2>
                <p>The abbreviations found on football boots primarily relate to the recommended ground or surface type they are designed for, ensuring optimal performance and safety. These codes, such as FG, SG, and AG, are not just random letters but crucial indicators for players to select the correct footwear for natural grass, artificial turf, or indoor courts. Understanding these abbreviations is paramount for a footballer. Wearing the wrong soleplate for the surface can not only negatively impact your performance and stability, but it also increases the risk of injury and can void the boot's warranty. Choosing the correct pair ensures you have the right grip, comfort, and protection for the "beautiful game" no matter where you play. 
                </p>
            </div>
            <div className="terrain-container">
            <section id="AG" className="terrain-card ag">
                <h2>AG - Artificial Grass</h2>
                <p>These boots are specifically engineered for modern synthetic surfaces like 3G and 4G artificial turf (which feature rubber infill). AG boots have shorter, more numerous, and often rounded studs to distribute the player's weight more evenly, reducing joint pressure and preventing the studs from catching in the abrasive surface.</p>
            </section>
            <section id="FG" className="terrain-card fg">
                <h2>FG - Firm Ground</h2>
                <p>These are the most common type of football boots, designed for natural grass pitches that are dry or slightly damp. They usually feature molded plastic studs (conical or bladed) that provide excellent traction and stability on standard, firm playing surfaces.</p>
            </section>
            <section id="HG" className="terrain-card hg">
                <h2>HG - Hard Ground</h2>
                <p>While less common now due to the rise of MG and TF options, HG boots are specifically for extremely hard, dry natural grass pitches or older ash (cinder) courts. They have short, robust studs that are built for durability on abrasive surfaces.</p>
            </section>
            <section id="MG" className="terrain-card mg">
                <h2>MG - Multi-Ground</h2>
                <p>An all-around, versatile option for players who frequently switch between different surfaces, including both natural grass and artificial turf. They typically feature a hybrid soleplate with a mix of stud shapes and sizes, offering a balanced level of grip across various conditions.</p>
            </section>
            <section id="SG" className="terrain-card sg">
                <h2>SG - Soft Ground</h2>
                <p>Built for wet, muddy, and soft natural grass pitches, SG boots have longer studs, often made of metal and sometimes detachable, to dig deep into the ground and provide maximum grip. This helps prevent slipping in challenging, waterlogged conditions.</p>
            </section>
            <section id="TF" className="terrain-card tf">
                <h2>TF - Turf</h2>
                <p>Also known as Astro Turf shoes, these are designed for older artificial turf surfaces, hard ground, or compacted fields. They have a durable rubber sole covered in many small rubber dimples or nubs, which offer consistent traction on hard, unforgiving surfaces without digging in.</p>
            </section>
            <section id="IN" className="terrain-card indoor">
                <h2>IN - Indoor</h2>
                <p>Sometimes also labeled as IC or IT, these shoes are made for polished indoor surfaces such as gym floors and futsal courts. They have flat, non-marking rubber soles designed for maximum grip and quick movements on hard, flat surfaces.</p>
            </section>
            <section id="FG-AG" className="terrain-card fg-ag">
                <h2>FG/AG</h2>
                <p>Some modern boots feature a soleplate specifically certified by brands as suitable for both Firm Ground and Artificial Ground use, offering enhanced versatility. </p>
            </section>
            </div>
        </div>
    );
}