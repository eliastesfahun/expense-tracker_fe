"use client";

import { useState, useEffect } from "react";

interface Expense {
    _id: string;
    amount: number;
    category: string;
    description?: string;
    date: string;
    userId: string;
}

interface User {
    id: string;
    username: string;
    [key: string]: any;
}

export default function ExpenseForm() {
    const [amount, setAmount] = useState<number | "">("");
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const userJSON = localStorage.getItem("user");
            if (!userJSON) return;

            const user: User = JSON.parse(userJSON);
            try {
                const res = await fetch(
                    `http://localhost:5002/api/expenses/user/${user.id}`
                );
                const data: Expense[] = await res.json();
                if (res.ok) setExpenses(data);
            } catch (err) {
                console.error("Failed to fetch expenses:", err);
            }
        };

        fetchExpenses();
    }, []);

    const handleSubmit = async () => {
        const userJSON = localStorage.getItem("user");
        if (!userJSON) {
            alert("Please login first!");
            return;
        }

        const user: User = JSON.parse(userJSON);

        try {
            const res = await fetch("http://localhost:5002/api/expenses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: Number(amount),
                    category,
                    description,
                    userId: user.id,
                }),
            });

            const data: Expense | { message: string } = await res.json();

            if (res.ok && "amount" in data) {
                alert("Expense added!");
                setAmount("");
                setCategory("");
                setDescription("");
                setExpenses((prev) => [...prev, data]);
            } else {
                alert((data as { message: string }).message || "Failed to add expense");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <div>
            <h2>Add Expense</h2>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSubmit}>Save Expense</button>

            <h2>My Expenses</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        {expense.category} - ${expense.amount} ({expense.description || "No description"})
                    </li>
                ))}
            </ul>
        </div>
    );
}
