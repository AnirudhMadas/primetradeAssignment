import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/authContext";
import { Plus, Trash2, LogOut } from "lucide-react";

export default function Dashboard() {
  const { logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [profile, setProfile] = useState({});
  const [search, setSearch] = useState("");

  /* ---------- LOAD DATA ---------- */
  const loadData = async () => {
    const [taskRes, profileRes] = await Promise.all([
      api.get("/tasks"),
      api.get("/auth/me"),
    ]);
    setTasks(taskRes.data);
    setProfile(profileRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ---------- ACTIONS ---------- */
  const addTask = async () => {
    if (!title.trim()) return;
    await api.post("/tasks", { title });
    setTitle("");
    loadData();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadData();
  };

  /* ---------- FILTER ---------- */
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* ---------- SIDEBAR ---------- */}
      <aside className="hidden md:flex w-64 bg-white shadow-lg p-6 flex-col">
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">
          TaskFlow
        </h1>

        <nav className="space-y-3 text-slate-700">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-100">
            My Tasks
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-100">
            Settings
          </button>
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ---------- MAIN ---------- */}
      <main className="flex-1 p-6">
        {/* ---------- TOP BAR ---------- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500">
              {profile.email} • {profile.role}
            </p>
          </div>

          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full md:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ---------- STATS ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-slate-500">Total Tasks</p>
            <h3 className="text-2xl font-bold">{tasks.length}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-slate-500">Completed</p>
            <h3 className="text-2xl font-bold text-emerald-600">
              {completedCount}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-slate-500">Pending</p>
            <h3 className="text-2xl font-bold text-rose-500">
              {pendingCount}
            </h3>
          </div>
        </div>

        {/* ---------- ADD TASK ---------- */}
        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={addTask}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add
            </button>
          </div>
        </div>

        {/* ---------- TASK LIST ---------- */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-5 border-b">
            <h3 className="font-semibold text-slate-700">
              Your Tasks
            </h3>
          </div>

          {filteredTasks.length === 0 ? (
            <p className="p-6 text-slate-500 text-center">
              No tasks found
            </p>
          ) : (
            <div className="divide-y">
              {filteredTasks.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center justify-between p-5 hover:bg-slate-50"
                >
                  <span className="text-slate-700">
                    {t.title}
                  </span>

                  <button
                    onClick={() => deleteTask(t._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
