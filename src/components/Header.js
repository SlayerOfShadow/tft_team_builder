import tftLogo from "../assets/tft_logo.png"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
    const { authState } = useContext(AuthContext);
    const auth = getAuth();

    const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("Signed out successfully");
          })
          .catch((error) => console.log(error));
      };

    return (
        <div className="header">
            <h1><Link to="/" className="home-link">Home</Link></h1>
            <img src={tftLogo} alt="" />
            {authState ? (
            <>
                <div>
                    <h2>Welcome {authState.email}</h2>
                    <button onClick={userSignOut}>Log out</button>
                </div>
            </>
            ) : (
            <h1 className="login-register">
                <Link to="/login" className="login-link">
                Log in
                </Link>
                or
                <Link to="/register" className="register-link">
                Register
                </Link>
            </h1>
            )}
        </div>
    );
}

export default Header;