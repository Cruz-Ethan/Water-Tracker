import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://127.0.0.1:8000/api/user/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert("Registration successful! Please log in.");
            navigate("/login");
        } else {
            const data = await res.json();
            alert(`Registration failed: ${JSON.stringify(data)}`);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="container" style={{ textAlign: "center" }}>
                <h2>Create Account</h2>
                <p>Join the Water Tracker community</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        onChange={e => setFormData({...formData, username: e.target.value})} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={e => setFormData({...formData, password: e.target.value})} 
                        required 
                    />
                    <button type="submit" className="btn-primary">Register</button>
                </form>
                <p style={{ marginTop: "15px" }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}