export default function SizeGuide() {
    const sizes = [
        {cm: "", UK: "", US: "", EU: ""},
        {cm: "", UK: "", US: "", EU: ""},
        {cm: "", UK: "", US: "", EU: ""},
        {cm: "", UK: "", US: "", EU: ""},
        {cm: "", UK: "", US: "", EU: ""},
        {cm: "", UK: "", US: "", EU: ""},
        {cm: "", UK: "", US: "", EU: ""},
        {cm: "", UK: "", US: "", EU: ""},
        {cm: "", UK: "", US: "", EU: ""},
        
    ]
    return (
        <section className="size-guide-page">
            <div className="sizeguide-card">
                <h1 className="size-guide-title">Football Boots Size Guide</h1>
                <p className="size-guide-subtitle">Measure your foot length and find the perfect fit for match day.</p>
                <div className="size-guide-table-wrapper">
                    <table className="size-guide-table">
                        <thead>
                            <tr>
                                <th>Foot (cm)</th>
                                <th>UK</th>
                                <th>US</th>
                                <th>EU</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </section>
    );
}