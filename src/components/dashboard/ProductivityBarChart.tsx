    import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
    } from "recharts";

    export default function ProductivityBarChart({ data }: { data: any[] }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border mt-6">
        <h2 className="text-lg font-semibold mb-4">Criadas x Concluídas</h2>

        <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="created" fill="#6366f1" />
            <Bar dataKey="completed" fill="#22c55e" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
    }
