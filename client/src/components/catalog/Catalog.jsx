import { useEffect, useState } from "react";
import BootsCard from "../bootsCard/BootsCard.jsx";
import request from "../../utils/request.js";

export default function Catalog() {

    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        (async () => {
            try {
                const result = request('/boots', 'get')
                setArticles(result)
            } catch (error) {
                alert(error.message)
            }
        })
    })
    return (
        <section className="catalog-page">
            <h1>Catalog</h1>
            <div className="catalog-container">
                {articles.map(article => <BootsCard key={article._id} {...article}/>)}
            </div>
        </section>
    );
}