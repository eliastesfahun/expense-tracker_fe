"use client";

import { useState, useEffect } from "react";

interface Income {
    _id: string;
    amount: number;
    source: string;
    description?: string;
    date: string;
    userId: string;
}

interface User {
    id: string;
    username: string;
    [key: string]: any;
}

export default function IncomeForm() {
    const [amount, setAmount] = useState<number | "">("");
    const [source, setSource] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [incomes, setIncomes] = useState<Income[]>([]);

    useEffect(() => {
        const fetchIncomes = async () => {
            const userJSON = localStorage.getItem("user");
            if (!userJSON) return;

            const user: User = JSON.parse(userJSON);

            try {
                const res = await fetch(
                    `http://localhost:5002/api/incomes/user/${user.id}`
                );
                const data: Income[] = await res.json();
                if (res.ok) setIncomes(data);
            } catch (err) {
                console.error("Failed to fetch incomes:", err);
            }
        };

        fetchIncomes();
    }, []);

    const handleSubmit = async () => {
        const userJSON = localStorage.getItem("user");
        if (!userJSON) {
            alert("Please login first!");
            return;
        }

        const user: User = JSON.parse(userJSON);

        try {
            const res = await fetch("http://localhost:5002/api/incomes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: Number(amount),
                    source,
                    description,
                    userId: user.id,
                }),
            });

            const data: Income | { message: string } = await res.json();

            if (res.ok && "amount" in data) {
                alert("Income added!");
                setAmount("");
                setSource("");
                setDescription("");
                setIncomes((prev) => [...prev, data]);
            } else {
                alert((data as { message: string }).message || "Failed to add income");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <div>
            <h2>Add Income</h2>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <input
                type="text"
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSubmit}>Save Income</button>

            <h2>My Incomes</h2>
            <ul>
                {incomes.map((income) => (
                    <li key={income._id}>
                        {income.source} - ${income.amount} ({income.description || "No description"})
                    </li>
                ))}
            </ul>
        </div>
    );
}
