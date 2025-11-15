import { useEffect, useState } from "react";
import { api } from "../api/api";
import TaskItem from "../components/tasks/TaskItem";
import TaskModal from "../components/tasks/TaskModal";
import { Button } from "../components/ui/button";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  async function loadTasks() {
    const { data } = await api.get("/tasks/");
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function openCreateModal() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEditModal(task: any) {
    setEditingTask(task);
    setModalOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tarefas</h1>
        <Button onClick={openCreateModal}>Nova tarefa</Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            reload={loadTasks}
            onEdit={openEditModal}
          />
        ))}
      </div>

      {/* Modal */}
      <TaskModal
        open={modalOpen}
        setOpen={setModalOpen}
        reload={loadTasks}
        task={editingTask}
      />
    </div>
  );
}
