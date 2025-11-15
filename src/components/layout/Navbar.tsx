import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b flex items-center justify-end px-6 bg-white">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          Olá, <strong>{user?.full_name}</strong>
        </span>

        <button
          onClick={logout}
          className="text-red-500 text-sm hover:underline"
        >
          Sair
        </button>

        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          {user?.full_name?.[0] || "?"}
        </div>
      </div>
    </header>
  );
}
