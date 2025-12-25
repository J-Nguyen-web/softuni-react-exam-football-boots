export default function Home() {
    return (
        <div className="home-page">
            <div className="home-text">
                <h1>Welcome to </h1>
                <p>Discover the latest football boots with ratings, comments, and more.</p>
                {/* <section className="catalog-page">
                    <h1>Catalog</h1>
                    {articles.length === 0 && <h3>No boots uploaded</h3>}
                    <div className="catalog-container">
                        {articles.map(article => <BootsCard key={article._id} {...article} />)}
                    </div>
                </section> */}
            </div>
        </div>
    );
}