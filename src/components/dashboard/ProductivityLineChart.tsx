    import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    } from "recharts";

    export default function ProductivityLineChart({ data }: { data: any[] }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Produtividade - Últimos 7 dias</h2>
        <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="completed"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1200}
            />
            </LineChart>
        </ResponsiveContainer>
        </div>
    );
    }
