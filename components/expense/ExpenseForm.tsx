"use client";

import { useState } from "react";
import styles from "./ExpenseForm.module.css";

interface ExpenseFormProps {
    userId: string;
    onAddExpense: (expense: any) => void;
}

export default function ExpenseForm({ userId, onAddExpense }: ExpenseFormProps) {
    const [amount, setAmount] = useState<number | "">("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        if (!userId) return alert("Login required");
        

        const res = await fetch("http://localhost:5002/api/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: Number(amount), category, description, userId }),
        });

        const data = await res.json();
        if (res.ok) {
            onAddExpense(data); // update dashboard
            setAmount(""); setCategory(""); setDescription("");
        } else {
            alert(data.message || "Failed to add expense");
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Add Expense</h3>
            <input className={styles.inputField} placeholder="Amount" value={amount} onChange={e => setAmount(Number(e.target.value === "" ? "" : Number(e.target.value)))} />
            <input className={styles.inputField} placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <input className={styles.inputField} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <button className={styles.button} onClick={handleSubmit}>Save Expense</button>
        </div>
    );
}
