import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../api";
import Layout from "../components/Layout";

export default function RecordDetail() {
    const { id } = useParams();
    const [record, setRecord] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        apiFetch(`/record/${id}/`).then(res => res.json()).then(data => setRecord(data));
    }, [id]);

    const handleDelete = async () => {
        await apiFetch(`/record/${id}/`, { method: "DELETE" });
        navigate("/records");
    };

    if (!record) return <p>Loading...</p>;

    return (
        <Layout title="Record Detail">
            <p><strong>Date:</strong> {record.date}</p>
            <p><strong>Amount:</strong> {record.amount_oz} oz</p>
            <button onClick={() => navigate("/records")}>Back</button>
            <button onClick={() => navigate(`/record/${id}/update`)}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </Layout>
    );
}