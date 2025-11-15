import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { api } from "../../api/api";
import { useState } from "react";

export default function CategoryModal({ open, setOpen, category, reload }: any) {
  const [name, setName] = useState(category?.name ?? "");
  const isEditing = !!category;

  async function handleSubmit() {
    if (isEditing) {
      await api.put(`/categories/${category.id}`, { name });
    } else {
      await api.post(`/categories/`, { name });
    }
    reload();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogTitle>{isEditing ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>

        <div className="space-y-4 mt-4">
          <Label>Nome da categoria</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Button className="w-full mt-2" onClick={handleSubmit}>
            {isEditing ? "Salvar" : "Criar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
