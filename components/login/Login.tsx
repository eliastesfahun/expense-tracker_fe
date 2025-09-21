"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  [key: string]: any;
}

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user data in localStorage
        const user: User = {
          id: data.id,
          username: data.username,
        };
        localStorage.setItem("user", JSON.stringify(user));

        alert("User logged in successfully!");

        // Clear input fields
        setEmail("");
        setPassword("");

        // Redirect to dashboard or home page
        router.push("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <label>Email :</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password :</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Submit</button>
      <Link href="/register">Open account</Link>
    </div>
  );
};

