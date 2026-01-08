export default function SizeGuide() {
    const sizes = [
        {cm: "24", UK: "6", US: "7", EU: "40"},
        {cm: "24", UK: "6.5", US: "7.5", EU: "40.5"},
        {cm: "25", UK: "7", US: "8", EU: "41"},
        {cm: "25", UK: "7.5", US: "8.5", EU: "42"},
        {cm: "26", UK: "8", US: "9", EU: "42.5"},
        {cm: "26", UK: "8.5", US: "9.5", EU: "43"},
        {cm: "27", UK: "9", US: "10", EU: "44"},
        {cm: "27", UK: "9.5", US: "10.5", EU: "44.5"},
        {cm: "28", UK: "10", US: "11", EU: "45"},
    ];

    return (
        <section className="size-guide-page">
            <div className="sizeguide-card">
                <h1 className="size-guide-title">Football Boots Size Guide</h1>
                <p className="size-guide-subtitle">Measure your foot length and find the perfect fit for match day.</p>
                
                <div className="size-guide-table-wrapper">
                    <table className="size-guide-table">
                        <thead>
                            <tr>
                                <th>FООТ (cm)</th>
                                <th>UK</th>
                                <th>US</th>
                                <th>EU</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sizes.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.cm}</td>
                                    <td>{row.UK}</td>
                                    <td>{row.US}</td>
                                    <td>{row.EU}</td>
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