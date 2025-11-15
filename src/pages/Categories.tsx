import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Button } from "../components/ui/button";
import { Trash2, Edit } from "lucide-react";

import CategoryModal from "../components/categories/CategoryModal";
import CategoryBadge from "../components/categories/CategoryBadge";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function load() {
    const { data } = await api.get("/categories/");
    setCategories(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: number) {
    await api.delete(`/categories/${id}`);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Categorias</h1>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          Nova categoria
        </Button>
      </div>

      <div className="grid gap-3">
        {categories.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl border shadow-sm flex justify-between">
            <CategoryBadge name={c.name} />

            <div className="flex gap-3">
              <Edit className="text-blue-500 cursor-pointer" onClick={() => { setEditing(c); setModalOpen(true); }} />
              <Trash2 className="text-red-500 cursor-pointer" onClick={() => remove(c.id)} />
            </div>
          </div>
        ))}
      </div>

      <CategoryModal
        open={modalOpen}
        setOpen={setModalOpen}
        category={editing}
        reload={load}
      />
    </div>
  );
}
