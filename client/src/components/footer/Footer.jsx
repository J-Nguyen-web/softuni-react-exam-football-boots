export default function Footer() {
    return (
        < footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h4>Shop</h4>
                        <ul>
                            <li><a>All boots</a></li>
                            <li><a>Firm Ground</a></li>
                            <li><a>Artificial Grass</a></li>
                            <li><a>Turf</a></li>
                        </ul>
                    
                </div>
                <div className="footer-column">
                    <h4>Support</h4>
                        <ul>
                            <li><a>Contact Us</a></li>
                            <li><a>Shipping & Returns</a></li>
                            <li><a>Size Guide</a></li>
                            <li><a>FAQ</a></li>
                        </ul>
                    
                </div>
                <div className="footer-column">
                    <h4>Follow Us</h4>
                        <ul>
                            <li><a>Instagram</a></li>
                            <li><a>Facebook</a></li>
                            <li><a>Youtube</a></li>
                            <li><a>Tiktok</a></li>
                        </ul>
                    
                </div>
            </div>
            <div className="footer-bottom">{new Date().getFullYear()} Football Boots. All rights reserved.</div>
        </footer>
    );
}