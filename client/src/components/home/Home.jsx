import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext.jsx";
import { parseServerError } from "../../util/errorHandler.js";
import Roulette from "../Roulette.jsx";
import BootsCard from "../bootsCard/BootsCard.jsx";
// import useReq from "../../hooks/useReq.js";
import { attachLikes } from "../../util/attachLikes.js";
import { supabase } from '../../supabaseClient.js'

export default function Home() {

    const { showModal } = useModal();
    // const { request } = useReq();
    const [likedBoots, setLikedBoots] = useState([]);
    const [newestBoots, setnewesetBoots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // TODO USER ABLE TO CHANGE THE LIMIT OF SHOWN ARTICLES
        async function sortingBoots(likeLimit = 3, newestLimit = 3) {
            try {
                const [bootsResult, likesResult] = await Promise.all([
                    // request(`/data/boots`),
                    // request(`/data/likes`),
                    supabase
                        .from('boots')
                        .select('id, title, type, price, image, description, created_at'),
                    supabase
                        .from('likes')
                        .select('boots_id'),                    
                ]);

                if(bootsResult.error) throw bootsResult.error
                if(likesResult.error) throw likesResult.error

                const bootsData = bootsResult.data
                const likesData = likesResult.data

                const sortByLikes = attachLikes(bootsData, likesData, 'id', 'boots_id') // attachLikes merge Boots with Likes
                    .sort((a, b) => b.likes - a.likes) // then sort it by Likes
                    .slice(0, likeLimit); // then slice it by the limit we put
                const sortByCreationOn = attachLikes(bootsData, likesData, 'id', 'boots_id') 
                    .sort((a, b) => new Date(b.created_at)  - new Date(a.created_at)) // then sort it by Likes
                    .slice(0, newestLimit); // then slice it by the limit we put    

                if (isMounted) setLikedBoots(sortByLikes);
                if (isMounted) setnewesetBoots(sortByCreationOn);

            } catch (err) {
                showModal(parseServerError(err), "error");
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        sortingBoots();

        return () => {
            isMounted = false;
        }
    }, []);

    if (loading) {
        return <Roulette />
    }

    return (
        <div className="home-page">
            <div className="home-banner"></div>
            <div className="home-text">
                <h1>Welcome to Jogo Bonita Store</h1>
                <p>Discover the latest football boots with ratings, comments, and more.</p>
            </div>
            <section className="home-top3boots">
                <h1>Top 3 liked boots</h1>
                {likedBoots.length === 0 && <h3 className="top3boots">No boots uploaded</h3>}
                <div className="top3boots">
                    {likedBoots.map(bootsResult => (<BootsCard key={bootsResult._id} {...bootsResult} />))}
                </div>
            </section>
            <section className="home-newestBoots">
                <h1>Newest Boots</h1>
                {newestBoots.length === 0 && <h3 className="top3boots">No boots uploaded</h3>}
                <div className="top3boots">
                    {newestBoots.map(bootsResult => (<BootsCard key={bootsResult._id} {...bootsResult} />))}
                </div>
            </section>
        </div>
    );
}