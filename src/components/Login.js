import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            navigate("/")
        })
        .catch((error) => {
            console.log(error);
            setError("Couldn't log you in");
        });
      };

    return ( 
        <div className="login">
            <form onSubmit={login} className="login-form">
                <h1>Log in to your account</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></input>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                <button type="submit">Log in</button>
            </form>
        </div>
     );
}
 
export default Login;