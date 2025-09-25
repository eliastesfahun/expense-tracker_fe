"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            // If user already exists in local storage, redirect to login/dashboard
            router.push("/login");
        }
    }, [router]);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handleRegister = async () => {
        if (password !== rePassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:5002/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, rePassword }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Registration successful! Please complete your profile.");
                // Save temporary user info in localStorage
                localStorage.setItem("newUser", JSON.stringify({ username, email }));
                // Redirect to profile page
                router.push("/profile");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <main style={{ textAlign: "center", padding: "2rem" }}>
            <h1>Get Started</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register & Go to Profile</button>
        </main>
    );
}
