"use client";

import { useRouter } from "next/navigation";

export const LogoutForm = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user"); // clear logged-in user
        alert("Logged out successfully!");
        router.push("/login"); // redirect to login page
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
