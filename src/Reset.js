import React, { useState } from 'react'
import { auth } from "./firebaseConfig"
import { sendPasswordResetEmail } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

const Reset = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        setError("")

        if (!email) {
            setError("Email is required.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setError("Password reset email sent! Check your inbox.");
            setEmail(""); 

            // Redirect to login page after successful password reset
            setTimeout(() => {
                navigate("/login");
            }, 6000); // Redirect after 6 seconds
        } catch (err) {
            switch (err.code) {
                case 'auth/invalid-email':
                    setError("The email address is not valid.");
                    break;
                case 'auth/user-not-found':
                    setError("No user found with this email address.");
                    break;
                default:
                    setError("An error occurred. Please try again.");
            }
            console.log(err);
        }
    }

    return (
        <div style={{ backgroundColor: "#205934", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <h3 className="card-title text-center mb-4" style={{ color: "#205934", fontWeight: "bold" }}>Reset Your Password</h3>
                                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                                <form className='reset-form' onSubmit={handleClick}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" autoComplete="username" onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <button type="submit" className="btn w-100 mb-3" style={{ backgroundColor: "#205934", color: "white" }}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reset
