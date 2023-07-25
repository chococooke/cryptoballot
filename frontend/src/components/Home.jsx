import "../Home.css"
import { Link } from "react-router-dom"
import image1 from "../images/undraw_ether_re_y7ft.svg";
import image2 from "../images/undraw_secure_files_re_6vdh.svg";
import image3 from "../images/undraw_designer_life_re_6ywf.svg";

const Home = () => {
    return (
        <>
            <header class="header">
                <div class="header__logo">
                    <h1 className="header__logo-text"><Link to="/">CryptoBallot</Link></h1>
                </div>
                <nav class="header__nav">
                    <ul className="header__nav-list">
                        <li className="header__nav-list-item"><a href="#home">Home</a></li>
                        <li className="header__nav-list-item"><a href="#features">Features</a></li>
                        <li className="header__nav-list-item"><a href="#about">About</a></li>
                    </ul>
                </nav>
            </header>

            <section id="home" class="hero">
                <div class="hero__content">
                    <h1>Cast your Vote with Confidence using CryptoBallot

                    </h1>
                    <p>The Transparent Voting System built on Blockchain</p>
                    <a href="/app" class="hero__cta btn">Vote</a>
                </div>
            </section>

            <section id="features" class="features">
                <div class="features__container">
                    <div class="feature">
                        <img className="feature-icon" src={image1} alt="Feature Icon" />
                        <div className="feature-text">
                            <h3>Transparent &amp; Immutable</h3>
                            <p>Every vote is recorded on the blockchain, ensuring transparency and immutability.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div className="feature-text">
                            <h3>Secure &amp; Tamper-proof</h3>
                            <p>Decentralized encryption techniques protect the integrity of the voting process.</p>
                        </div>
                        <img className="feature-icon" src={image2} alt="Feature Icon" />
                    </div>
                    <div class="feature">
                        <img className="feature-icon" src={image3} alt="Feature Icon" />
                        <div className="feature-text">
                            <h3>User-Friendly Interface</h3>
                            <p>Intuitive and easy-to-use interface designed for both voters and administrators.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" class="about">
                <div class="about__container">
                    <h2>About CryptoBallot</h2>
                    <p>CryptoBallot is a cutting-edge voting platform that leverages the power of blockchain technology to ensure secure and transparent elections. Our platform enables voters to cast their votes with confidence while maintaining the privacy and integrity of the voting process.</p>
                </div>
            </section>

            <footer class="home-footer">
                <p>&copy; 2023 CryptoBallot. All rights reserved.</p>
            </footer>
        </>
    )
}

export default Home;