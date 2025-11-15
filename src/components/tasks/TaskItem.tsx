import { CheckCircle, Trash2, Edit } from "lucide-react";
import { api } from "../../api/api";

    export default function TaskItem({ task, reload, onEdit }: any) {
    async function toggleCompleted() {
        await api.put(`/tasks/${task.id}`, {
        ...task,
        is_completed: !task.is_completed,
        });
        reload();
    }

    async function remove() {
        await api.delete(`/tasks/${task.id}`);
        reload();
    }

    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
        <div>
            <h3
            className={`font-medium ${
                task.is_completed ? "line-through text-gray-400" : ""
            }`}
            >
            {task.title}
            </h3>
            <p className="text-sm text-gray-500">{task.description}</p>
        </div>

        <div className="flex items-center gap-3">
            <button onClick={toggleCompleted}>
            <CheckCircle
                className={`${
                task.is_completed ? "text-green-500" : "text-gray-400"
                }`}
                size={22}
            />
            </button>

            <button onClick={() => onEdit(task)}>
            <Edit className="text-blue-500" size={20} />
            </button>

            <button onClick={remove}>
            <Trash2 className="text-red-500" size={20} />
            </button>
        </div>
        </div>
    );
    }
