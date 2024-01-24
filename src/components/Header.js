import tftLogo from "../assets/tft_logo.png"
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
    const { authState } = useContext(AuthContext);
    const auth = getAuth();
    const navigate = useNavigate();

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Signed out successfully");
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="header">
            <div className="header-left">
                <Link to="/" className="home-link">Home</Link>
                {authState && <Link to="/compositions" className="compositions-link">Compositions</Link>}
            </div>
            <img src={tftLogo} alt="" />
            <div className="header-right">
                {authState ? (
                    <>
                        <p>Welcome {authState.email}</p>
                        <button className="button3" onClick={userSignOut}>Log out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="login-link">Log in</Link>
                        or
                        <Link to="/register" className="register-link">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;