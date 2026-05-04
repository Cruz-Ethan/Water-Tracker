import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            navigate("/records");
        } else {
            alert("Login failed - check your credentials");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="container" style={{ textAlign: "center" }}>
                <h2>Water Tracker</h2>
                <p>Please log in to track your hydration</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary">Login</button>
                </form>
                <p style={{ marginTop: "15px" }}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}