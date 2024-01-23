import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserDocument } from "../firebase/firebase";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        createUserDocument(userCredential)
        toast.success("Your account has been created", {
          position: "top-center"
        });
        setEmail("");
        setPassword("");
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error("Email already in use", {
              position: "top-center"
            });
            break;
          case 'auth/invalid-email':
            toast.error("Invalid email address", {
              position: "top-center"
            });
            break;
          case 'auth/weak-password':
            toast.error("Password should be at least 6 characters", {
              position: "top-center"
            });
            break;
          default:
            toast.error("An error occurred during registration", {
              position: "top-center"
            });
        }
      });
  };

  return (
    <div className="register">
      <form onSubmit={register} className="register-form">
        <h1>Create an account</h1>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;