import { useNavigate } from "react-router-dom";

const Layout = ({ children, title }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="container">
            <header>
                <h1>{title}</h1>
                <button className="btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;