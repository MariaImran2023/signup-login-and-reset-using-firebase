import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebaseConfig"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error

        if (!email) {
            setError("Email is required.");
            return;
        }

        if (!password) {
            setError("Password is required.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setEmail(""); 
            setPassword(""); 

            setTimeout(() => 
            {
                navigate("/");
            }, 1000); 

        } 
        catch (err) 
        {
            switch (err.code) 
            {
                case 'auth/invalid-email':
                    setError("The email address is not valid.");
                    break;
                case 'auth/operation-not-allowed':
                    setError("Email/password accounts are not enabled.");
                    break;
                case 'auth/invalid-credential':
                    setError("Invalid Email or Password");
                    break;
                default:
                    setError("An error occurred. Please try again.");
            }
            console.log(err)
        }
    }

  return (
    <div style={{ backgroundColor: "#205934", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="container mt-5" >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4" style={{color: "#205934", fontWeight: "bold"}}>Login to Your Account</h3>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form className="login-form" onSubmit={handleClick}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" autoComplete="username" onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}  />
                                </div>
                                <button type="submit" className="btn w-100 mb-3" style={{backgroundColor: "#205934", color: "white"}}>
                                    Login
                                </button>
                                <div className="text-center">
                                    <p className="mb-1">
                                    Don't have an account? <Link to="/SignUp" style={{textDecoration: "none",  color: "#205934"}}>Sign Up</Link>
                                    </p>
                                    <p>
                                    <Link to="/Reset" style={{textDecoration: "none", color: "#205934"}}>Forgot password?</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Login
