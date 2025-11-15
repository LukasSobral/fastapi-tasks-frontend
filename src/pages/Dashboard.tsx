import { useEffect, useState } from "react";
import { api } from "../api/api";

import { StatCard } from "../components/dashboard/StatCard";
import ProductivityLineChart from "../components/dashboard/ProductivityLineChart";
import ProductivityBarChart from "../components/dashboard/ProductivityBarChart";
import ProductivityHeatmap from "../components/dashboard/ProductivityHeatmap";

import { ListTodo, CheckCircle, Tag, PercentCircle } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [tasksRes, categoriesRes] = await Promise.all([
        api.get("/tasks/"),
        api.get("/categories/"),
      ]);

      setTasks(tasksRes.data);
      setCategories(categoriesRes.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return <div className="p-10 text-center animate-pulse">Carregando...</div>;

  const completed = tasks.filter((t) => t.is_completed).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  // Últimos 7 dias
  const last7 = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  // Dados para gráficos
  const lineData = last7.map((date) => ({
    date: date.slice(5),
    completed: tasks.filter(
      (t) => t.is_completed && t.completed_at?.startsWith(date)
    ).length,
  }));

  const barData = last7.map((date) => ({
    date: date.slice(5),
    created: tasks.filter((t) => t.created_at?.startsWith(date)).length,
    completed: tasks.filter(
      (t) => t.is_completed && t.completed_at?.startsWith(date)
    ).length,
  }));

  const heatmapWeekly = Array(7).fill(0);
  tasks.forEach((t) => {
    if (t.is_completed && t.completed_at) {
      const day = new Date(t.completed_at).getDay();
      heatmapWeekly[day]++;
    }
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Tarefas" value={tasks.length} icon={<ListTodo />} />
        <StatCard title="Concluídas" value={completed} icon={<CheckCircle />} />
        <StatCard title="Categorias" value={categories.length} icon={<Tag />} />
        <StatCard title="Progresso" value={`${progress}%`} icon={<PercentCircle />} />
      </div>

      {/* GRÁFICOS */}
      <ProductivityLineChart data={lineData} />
      <ProductivityBarChart data={barData} />
      <ProductivityHeatmap data={heatmapWeekly} />
    </div>
  );
}
