import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext.jsx";
import { parseServerError } from "../../util/errorHandler.js";
import Roulette from "../Roulette.jsx";
import BootsCard from "../bootsCard/BootsCard.jsx";
import useReq from "../../hooks/useReq.js";

export default function Home() {

    const { showModal } = useModal();
    const { request } = useReq();
    const [boots, setBoots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function mostLikedBoots(limit = 3) {
            try {
                const [boots, likes] = await Promise.all([
                    request(`/data/boots`),
                    request(`/data/likes`),
                ]);

                const likesCount = likes.reduce((boots, likes) => {
                    boots[likes.bootsId] = (boots[likes.bootsId] || 0) + 1;
                    return boots
                }, {});

                const sortedBoots = boots
                    .map(boots => ({ ...boots, likes: likesCount[boots._id] || 0 }))
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, limit);


                if (isMounted) setBoots(sortedBoots);

            } catch (err) {
                showModal(parseServerError(err), "error");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        mostLikedBoots();

        return () => {
            isMounted = false;
        }
    }, []);

    if (loading) {
        return <Roulette />
    }

    return (
        <div className="home-page">
            <div className="home-text">
                <h1>Welcome to </h1>
                <p>Discover the latest football boots with ratings, comments, and more.</p>
            </div>
            <section className="home-top3boots">
                <h1>Top 3</h1>
                {boots.length === 0 && <h3>No boots uploaded</h3>}
                <div className="top3boots">
                    {boots.map(bootsResult => (<BootsCard key={bootsResult._id} {...bootsResult} />))}
                </div>
            </section>
        </div>
    );
}