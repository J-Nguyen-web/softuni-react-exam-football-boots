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
                        <tbody>
                            {sizes.map((row, i) => (
                                <tr key={i}>
                                    <td>row.cm</td>
                                    <td>row.uk</td>
                                    <td>row.us</td>
                                    <td>row.eu</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="size-guide-tips">
                    <h3>Pro Fit Tips</h3>
                    <ul>
                        <li>Always measure feet in the evening.</li>
                        <li>Boots should feel snug, not painful.</li>
                        <li>If between sizes, consider foot width & position.</li>
                    </ul>
                </div>
            </div>
        </section>  
    );
}