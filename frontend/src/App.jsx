import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Records from "./pages/Records";
import RecordDetail from "./pages/RecordDetail";
import UpdateRecord from "./pages/UpdateRecord";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
                <Route path="/record/:id" element={<ProtectedRoute><RecordDetail /></ProtectedRoute>} />
                <Route path="/record/:id/update" element={<ProtectedRoute><UpdateRecord /></ProtectedRoute>} />
                <Route path="/" element={<Navigate to="/records" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;