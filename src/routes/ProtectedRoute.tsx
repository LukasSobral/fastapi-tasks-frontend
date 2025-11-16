    import { Navigate } from "react-router-dom";
    import { useAuth } from "../context/AuthContext";

    export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, loading } = useAuth();

    // ⏳ Enquanto o AuthProvider está carregando o token
    if (loading) {
        return (
        <div className="w-full h-screen flex items-center justify-center text-gray-700">
            Carregando...
        </div>
        );
    }

    // ❌ Se não tiver auth, manda pro login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // ✔️ Tudo pronto — renderiza a página protegida
    return children;
    }
