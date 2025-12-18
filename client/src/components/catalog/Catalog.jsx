import { useEffect, useState } from "react";
import BootsCard from "../bootsCard/BootsCard.jsx";
import useReq from "../../hooks/useReq.js";
export default function Catalog() {

    const [articles, setArticles] = useState([]);
    const { request } = useReq();
    
    useEffect(() => {
        (async () => {
            try {
                const result = await request('/data/boots', 'get')
                console.log('BOOTS    ',result)
                setArticles(result)
            } catch (error) {
                alert(error.message)
            }
        })();
    },[])
    return (
        <section className="catalog-page">
            <h1>Catalog</h1>
            {articles.length === 0 && <h3>No boots uploaded</h3>}
            <div className="catalog-container">
                {articles.map(article => <BootsCard key={article._id} {...article}/>)}
            </div>
        </section>
    );
}