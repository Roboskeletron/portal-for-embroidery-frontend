import {NavLink} from "react-router-dom"
import {useAuth} from "../hooks/useAuth.ts";
import {useAuthStore} from "../store/AuthStore.ts";
import postageHeart from "../assets/postage-heart.svg"

function Header() {
    const {isAuthenticated, login, logout, register} = useAuth();
    const role = useAuthStore((state) => state.role);

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
                            aria-expanded="false">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink className="navbar-brand" to="/">Portal for Embroidery</NavLink>
                    <NavLink className="navbar-brand" to="/">
                        <img className="align-content-center" src={postageHeart} height="25" width="25" alt=""/>
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            {isAuthenticated &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                </li>}
                            {isAuthenticated && role === "ADMIN" &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/users">Users</NavLink>
                                </li>}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/designs">Designs</NavLink>
                            </li>
                            {isAuthenticated && role === "DESIGNER" &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/my-designs">My Designs</NavLink>
                                </li>}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about-us">About Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contacts">Contacts</NavLink>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center gap-2">
                            {isAuthenticated ? (
                                <button className="btn btn-outline-danger" onClick={logout}>
                                    Sign Out
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-link link-secondary text-decoration-none"
                                        onClick={register}
                                    >
                                        Sign Up
                                    </button>

                                    <button className="btn btn-outline-success" onClick={login}>
                                        Sign In
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header