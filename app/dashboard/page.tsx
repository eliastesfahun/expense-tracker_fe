"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ExpenseForm from "@/components/expense/ExpenseForm";
import IncomeForm from "@/components/income/IncomeForm";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [incomes, setIncomes] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return router.push("/login");
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // fetch both expenses and incomes
    const fetchData = async () => {
      const [expRes, incRes] = await Promise.all([
        fetch(`http://localhost:5002/api/expenses/user/${parsedUser.id}`),
        fetch(`http://localhost:5002/api/incomes/user/${parsedUser.id}`)
      ]);
      if (expRes.ok) setExpenses(await expRes.json());
      if (incRes.ok) setIncomes(await incRes.json());
    };
    fetchData();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className={styles.container}>
      <h1>Welcome, {user.username}</h1>

      <div className={styles.forms}>
        <ExpenseForm userId={user.id} onAddExpense={e => setExpenses(prev => [...prev, e])} />
        <IncomeForm userId={user.id} onAddIncome={i => setIncomes(prev => [...prev, i])} />
      </div>

      <div className={styles.tables}>
        <h2>Expenses</h2>
        <table> ... </table>

        <h2>Incomes</h2>
        <table> ... </table>

        <h2>Balance: ${totalIncome - totalExpenses}</h2>
      </div>
    </div>
  );
}
