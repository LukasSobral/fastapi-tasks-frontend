    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    export default function ProductivityHeatmap({ data }: { data: number[] }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border mt-6">
        <h2 className="text-lg font-semibold mb-4">Heatmap de Produtividade</h2>

        <div className="grid grid-cols-7 gap-3">
            {days.map((day, idx) => {
            const level = data[idx] ?? 0;
            const intensity = Math.min(4, Math.floor(level / 2));

            const colors = [
                "bg-gray-200",
                "bg-blue-200",
                "bg-blue-300",
                "bg-blue-400",
                "bg-blue-600",
            ];

            return (
                <div
                key={day}
                className={`h-14 rounded-lg flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${colors[intensity]}`}
                >
                <span className="text-xs text-gray-700">{day}</span>
                <span className="text-sm font-semibold">{level}</span>
                </div>
            );
            })}
        </div>
        </div>
    );
    }
