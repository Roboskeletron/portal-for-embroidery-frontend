import {NavLink} from "react-router-dom";
import postageHeart from "../../assets/postage-heart.svg"

function Footer() {
    return (
        <div id="footer" className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted">&copy; 2023 Embroidery, Inc</p>

                <NavLink to="/"
                         className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img className="align-content-center" src={postageHeart} height="25" width="25" alt=""/>
                </NavLink>

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><a href="https://github.com/katseliv" className="nav-link px-2 text-muted">GitHub</a></li>
                    <li className="nav-item"><a href="https://vk.com/im_confident" className="nav-link px-2 text-muted">VKontakte</a></li>
                    <li className="nav-item"><a href="https://www.instagram.com/katsleep" className="nav-link px-2 text-muted">Instagram</a></li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;