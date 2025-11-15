import { Card, CardContent } from "../ui/card";

type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

export function StatCard({ title, value, icon }: Props) {
  return (
    <Card className="p-5 shadow-sm border border-gray-200">
      <CardContent className="flex items-center justify-between p-0">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-semibold mt-1">{value}</p>
        </div>

        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
