import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { api } from "../../api/api";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export default function TaskModal({ open, setOpen, task, reload }: any) {
  const isEditing = !!task;

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [categoryId, setCategoryId] = useState(task?.category_id ?? "");

  const [categories, setCategories] = useState<any[]>([]);

  // Carrega todas as categorias ao abrir o modal
  useEffect(() => {
    async function fetchCategories() {
      const res = await api.get("/categories/");
      setCategories(res.data);
    }
    fetchCategories();
  }, []);

  // Atualiza ao abrir modal no modo edição
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategoryId(task.category_id ?? "");
    }
  }, [task]);

  async function handleSubmit() {
    const payload = {
      title,
      description,
      category_id: categoryId ? Number(categoryId) : null,
    };

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
      <DialogContent className="max-w-md z-[9999]">
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
            <Label>Categoria</Label>
            <Select value={String(categoryId)} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit}>
            {isEditing ? "Salvar alterações" : "Criar tarefa"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
