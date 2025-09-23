"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ExpenseForm from "@/components/expense/ExpenseForm";

export default function ExpensePage() {
    const router = useRouter();
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/login");
        } else {
            const user = JSON.parse(storedUser);
            setUserId(user.id);
        }
    }, [router]);

    if (!userId) return <p>Loading...</p>;

    return (
        <div>
            <h1>Expense Page</h1>
            <ExpenseForm userId={userId} onAddExpense={(expense) => console.log(expense)} />
        </div>
    );
}
