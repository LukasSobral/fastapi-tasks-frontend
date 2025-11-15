import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

    export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
        await login(email, password);
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard");  // 👈 AGORA VAI!!!
        } catch (error) {
        toast.error("Email ou senha inválidos.");
        } finally {
        setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-surface-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg border border-gray-200">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-text-900">
                Acesse sua conta
            </CardTitle>
            <p className="text-center text-gray-500 text-sm">
                Gerencie tarefas e produtividade
            </p>
            </CardHeader>

            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>

                <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                <Button className="w-full mt-2" type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
                </Button>
            </form>
            </CardContent>
        </Card>
        </div>
    );
    }
