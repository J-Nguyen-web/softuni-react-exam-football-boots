import { useEffect, useState } from "react";
import BootsCard from "../bootsCard/BootsCard.jsx";
import useReq from "../../hooks/useReq.js";
import Roulette from "../Roulette.jsx";
import { useSearchParams } from "react-router-dom";
import { useModal } from "../../context/ModalContext.jsx";
import { arrayWords } from "../../util/arrayWords.js";

export default function Catalog() {

    const {showModal} = useModal
    const { request } = useReq();
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
            //`/data/boots?where=${encodeURIComponent(`title LIKE "%${search}%"`)}` нужен encode заради символите
            // ако има search url да е равен на този string (тук се задава специфичния за API server link за достъпване)
            // LIKE % % - за частично съвпадение при търсене (зависи от server-а дали поддържа това свойство)
            
            const allBoots = await request('/data/boots', 'get')

            const filteredResult = search
            //? allBoots.filter( boots =>  ако има стойност на search,  
            //    boots.title.toLowerCase().includes(search.toLowerCase()) || да се извърши проверка дали се съдържа в title
            //    boots.type.toLowerCase().includes(search.toLowerCase()) и type (проверява за цялостно съответствие)
            
            //? allBoots.filter( boots => matchingSearch(boots, search)  подаване на array от boots и search от ключови думи

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
            
                setArticles(filteredResult)
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
                {articles.map(article => <BootsCard key={article._id} {...article}/>)}
            </div>
        </section>
    );
}