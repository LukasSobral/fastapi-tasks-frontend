import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

export default function Profile() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadProfile() {
    try {
      const { data } = await api.get("/users/me");
      setForm({
        full_name: data.full_name,
        email: data.email,
      });
    } catch {
      toast.error("Erro ao carregar perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await api.put("/users/me", form);
      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <div className="p-10 text-gray-500">Carregando perfil...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Meu Perfil
          </CardTitle>
          <p className="text-sm text-gray-500">
            Atualize suas informações pessoais
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <Label>Nome Completo</Label>
            <Input
              type="text"
              value={form.full_name}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <Button
            className="w-full mt-4"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
