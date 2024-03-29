import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success("Logged in !", {
                    position: "top-center"
                  });
                navigate("/")
            })
            .catch((error) => {
                toast.error("Couldn't log you in", {
                    position: "top-center"
                  });
                console.log(error);
            });
    };

    return (
        <div className="login">
            <form onSubmit={login} className="login-form">
                <p>Log in to your account</p>
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
                <button className="button1" type="submit">Log in</button>
            </form>
        </div>
    );
}

export default Login;