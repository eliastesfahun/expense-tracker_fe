"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  [key: string]: any;
}

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5002/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save user in localStorage
        const user: User = {
          id: data.id,
          username: data.username,
        };
        localStorage.setItem("user", JSON.stringify(user));

        alert("User logged in successfully!");
        setEmail("");
        setPassword("");

        // ✅ Redirect to dashboard
        router.push("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

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

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Submit"}
      </button>
    </div>
  );
};
