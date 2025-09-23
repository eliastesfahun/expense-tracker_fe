"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import IncomeForm from "@/components/income/IncomeForm";

export default function IncomePage() {
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
            <h1>Income Page</h1>
            <IncomeForm userId={userId} onAddIncome={(income) => console.log(income)} />
        </div>
    );
}
