import tftLogo from "../assets/tft_logo.png"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
                <h1><Link to="/" className="home-link">Home</Link></h1>
                {authState && <h1><Link to="/compositions" className="compositions-link">Compositions</Link></h1>}
            </div>
            <img src={tftLogo} alt="" />
            <div className="header-right">
            {authState ? (
                <>
                    <h2>Welcome {authState.email}</h2>
                    <button onClick={userSignOut}>Log out</button>
                </>
            ) : (
            <h1>
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
            
        </div>
    );
}

export default Header;