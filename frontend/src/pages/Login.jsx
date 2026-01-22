import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/authContext";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-slate-500 text-center mb-6">
          Sign in to your TaskFlow account
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
              placeholder="••••••••"
              className="w-full px-3 py-2 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Sign In
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-slate-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
