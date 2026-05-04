import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../api";
import Layout from "../components/Layout";

export default function UpdateRecord() {
    const { id } = useParams();
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        apiFetch(`/record/${id}/`).then(res => res.json()).then(data => setAmount(data.amount_oz));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await apiFetch(`/record/${id}/`, {
            method: "PATCH",
            body: JSON.stringify({ amount_oz: amount }),
        });
        navigate(`/record/${id}`);
    };

    return (
        <Layout title="Update Record">
            <form onSubmit={handleUpdate}>
                <label>Amount (oz): </label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                <br /><br />
                <button type="submit">Update</button>
                <button type="button" onClick={() => navigate(`/record/${id}`)}>Cancel</button>
            </form>
        </Layout>
    );
}