    import { useState } from "react";
    import { useAuth } from "../context/AuthContext";

    export default function LoginPage() {
    const { login, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        try {
        setLoading(true);
        await login(email, password);
        alert("Login bem-sucedido!");
        } catch (err: any) {
        console.error(err);
        setError("Erro no login. Verifique suas credenciais.");
        } finally {
        setLoading(false);
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
        <h1>Login</h1>
        {user && <p>Usuário logado: {user.email}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Senha:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
            </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
    }
