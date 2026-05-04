import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../api";
import Layout from "../components/Layout";

export default function Records() {
    const [records, setRecords] = useState([]);
    const [amount, setAmount] = useState("");

    const fetchRecords = async () => {
        const res = await apiFetch("/record/");
        const data = await res.json();
        setRecords(data);
    };

    useEffect(() => { fetchRecords(); }, []);

    const addRecord = async (e) => {
        e.preventDefault();
        await apiFetch("/record/", {
            method: "POST",
            body: JSON.stringify({ amount_oz: amount }),
        });
        setAmount("");
        fetchRecords();
    };

    const deleteRecord = async (id) => {
        await apiFetch(`/record/${id}/`, { method: "DELETE" });
        fetchRecords();
    };

    return (
        <Layout title="Your Water Records">
            <form onSubmit={addRecord}>
                <input 
                    type="number" 
                    className="form-input"
                    value={amount} 
                    placeholder="How many ounces?" 
                    onChange={e => setAmount(e.target.value)} 
                    required 
                />
                <button type="submit" className="btn-primary">Add Entry</button>
            </form>

            <ul>
                {records.map(r => (
                    <li key={r.id}>
                        <Link to={`/record/${r.id}`}>
                            📅 {r.date} — <strong>{r.amount_oz}oz</strong>
                        </Link>
                        <button 
                            className="btn-danger" 
                            onClick={() => deleteRecord(r.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}