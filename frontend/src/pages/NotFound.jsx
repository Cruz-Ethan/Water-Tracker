import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="login-wrapper">
            <div className="container" style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "72px", margin: "0" }}>404</h1>
                <h2>Oops! Page Not Found</h2>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <br />
                <Link to="/records" className="btn-primary" style={{ display: "inline-block", padding: "10px 20px" }}>
                    Back to Records
                </Link>
            </div>
        </div>
    );
}