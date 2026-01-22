import { useState } from "react";
import api from "../api/api";
import { Mail, Lock } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await api.post("/auth/register", { email, password });
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-1">
          Create Account
        </h2>
        <p className="text-sm text-slate-500 text-center mb-6">
          Join TaskFlow and manage your tasks efficiently
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-slate-600 mb-1 block">Email</label>
          <div className="flex items-center border rounded-lg px-3">
            <Mail size={18} className="text-slate-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-slate-600 mb-1 block">Password</label>
          <div className="flex items-center border rounded-lg px-3">
            <Lock size={18} className="text-slate-400" />
            <input
              type="password"
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition"
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-slate-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
