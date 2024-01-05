import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserDocument } from "../firebase/firebase";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            createUserDocument(userCredential)
            setSuccess('Your account has been created');
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            console.log(error);
            switch (error.code) {
                case 'auth/email-already-in-use':
                  setError('Email already in use');
                  break;
                case 'auth/invalid-email':
                  setError('Invalid email address');
                  break;
                case 'auth/weak-password':
                  setError('Password should be at least 6 characters');
                  break;
                default:
                  setError('An error occurred during registration');
              }
          });
      };

    return ( 
        <div className="register">
            <form onSubmit={register} className="register-form">
                <h1>Create an account</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
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