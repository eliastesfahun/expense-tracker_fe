"use client";

import { useState } from "react";
import styles from "./IncomeForm.module.css";

interface IncomeFormProps {
    userId: string;
    onAddIncome: (income: any) => void;
}

export default function IncomeForm({ userId, onAddIncome }: IncomeFormProps) {
    const [amount, setAmount] = useState<number | "">("");
    const [source, setSource] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        if (!userId) return alert("Login required");

        const res = await fetch("http://localhost:5002/api/income", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: Number(amount), source, description, userId }),
        });

        const data = await res.json();
        if (res.ok) {
            onAddIncome(data); // update dashboard
            setAmount(""); setSource(""); setDescription("");
        } else {
            alert(data.message || "Failed to add income");
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Add Income</h3>
            <input className={styles.inputField} placeholder="Amount" value={amount} onChange={e => setAmount(Number(e.target.value === "" ? "" : Number(e.target.value)))} />
            <input className={styles.inputField} placeholder="Source" value={source} onChange={e => setSource(e.target.value)} />
            <input className={styles.inputField} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <button className={styles.button} onClick={handleSubmit}>Save Income</button>
        </div>
    );
}
