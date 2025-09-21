"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import IncomeForm from "../components/IncomeForm";

export default function Dashboard() {
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return <p>Please login first!</p>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <ExpenseForm />
      <IncomeForm />
    </div>
  );
}

