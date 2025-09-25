"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/profile/Profile";

export const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [user, setUser] = useState<any>(null); // store registered user

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, rePassword }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user locally to show profile
        setUser(data.user || { username, email });
        alert("User registered successfully!");

        // Clear input fields
        setUsername("");
        setEmail("");
        setPassword("");
        setRePassword("");

        // Auto redirect to login after 3 seconds
        setTimeout(() => router.push("/login"), 3000);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (user) {
    return (
      <div>
        <h2>Registration Successful!</h2>
        <Profile user={user} />
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div>
      <label>Username:</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Email:</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label>Re-enter Password:</label>
      <input
        type="password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
      />

      <button onClick={handleRegister}>Submit</button>
    </div>
  );
};
