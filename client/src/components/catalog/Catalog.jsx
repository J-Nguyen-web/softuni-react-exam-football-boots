import { useEffect, useState } from "react";
import BootsCard from "../bootsCard/BootsCard.jsx";
import Roulette from "../Roulette.jsx";
import { useSearchParams } from "react-router-dom";
import { useModal } from "../../context/ModalContext.jsx";
import { arrayWords } from "../../util/arrayWords.js";
import { attachLikes } from "../../util/attachLikes.js";
import { supabase } from "../../supabaseClient.js";

export default function Catalog() {

    const {showModal} = useModal();
    const [articles, setArticles] = useState(null);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search'); // Ще провери стойността в URL-a search=..

    function matchingSearch (boots, search) {
    const searchToken = search.toLowerCase().split(/\s+/);
    
        const haystack = [
            boots.title,
            boots.type,
            // boots.description,
        ]
        .join(" ")
        .toLowerCase();

        return searchToken.every(word => haystack.includes(word));
        // за всяка дума от searchToken-a се проверява в haystack-a от който всичките букви са извадени и разделени със " "
    }
    
    useEffect(() => {
        (async () => {
            try {
            const [likesResult, bootsResult] = await Promise.all([
                supabase
                    .from('likes')
                    .select('boots_id'),

                supabase
                    .from('boots')
                    .select('id, title, type, price, image, description, created_at'),
            ])
            if(likesResult.error) throw likesResult.error;
            if(bootsResult.error) throw bootsResult.error;
            
            const likes = likesResult.data;
            const allBoots = bootsResult.data;

            const filteredResult = search

            ? allBoots.filter( boots => {
                const searchText = arrayWords(search); // всички думи се слагат в array

                const titleWords = arrayWords(boots.title); // цялото заглавие се слага в array
                const terrainWords = boots.type?.toUpperCase(); // terrain type се прави на главни букви

                return searchText.some( words => // за всяка дума от написаните в търсенето а
                    titleWords.includes(words) || // се проверяват в масива от думите на title-a на boots
                     terrainWords === words.toUpperCase() // и за абсолютно еднакво съвпадение за типа на терана
                )
            }
            )
            : allBoots // ако няма search, да се върне result без промени (всичките налични boots)
            
            // merge likes with the filtered boots using attachLikes
            setArticles(attachLikes(filteredResult, likes, 'id', 'boots_id'));
            } catch (error) {
                showModal(error.message)
            }
        })();
    },[search]) // re-mount при промянва в стойността на search

    if(articles === null) return <Roulette />;

    return (
        <section className="catalog-page">
            <h1>Catalog</h1>
            {articles.length === 0 && <h3>No boots uploaded</h3>}
            <div className="catalog-container">
                {articles.map(article => (<BootsCard key={article.id} {...article}/>))}
            </div>
        </section>
    );
}