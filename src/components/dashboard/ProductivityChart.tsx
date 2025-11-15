import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type Props = {
  data: { date: string; completed: number }[];
};

export function ProductivityChart({ data }: Props) {
  return (
    <Card className="p-4 shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Produtividade (últimos 7 dias)
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#6b7280" }}
                stroke="#9ca3af"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#6b7280" }}
                stroke="#9ca3af"
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
