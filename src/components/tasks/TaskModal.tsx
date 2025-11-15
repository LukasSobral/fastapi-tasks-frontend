import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { api } from "../../api/api";
import { useState } from "react";

export default function TaskModal({ open, setOpen, task, reload }: any) {
  const isEditing = !!task;

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [categoryId, setCategoryId] = useState(task?.category_id ?? "");

  async function handleSubmit() {
    const payload = { title, description, category_id: Number(categoryId) };

    if (isEditing) {
      await api.put(`/tasks/${task.id}`, payload);
    } else {
      await api.post("/tasks/", payload);
    }

    reload();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Tarefa" : "Nova Tarefa"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label>Título</Label>
            <Input
              placeholder="Título da tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label>Descrição</Label>
            <Input
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Categoria (ID)</Label>
            <Input
              placeholder="Ex: 3"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit}>
            {isEditing ? "Salvar alterações" : "Criar tarefa"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
