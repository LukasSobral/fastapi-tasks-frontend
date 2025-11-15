    import { NavLink } from "react-router-dom";
    import { LayoutDashboard, ListTodo, Tag, User } from "lucide-react";

    export default function Sidebar() {
    const menu = [
        { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/tasks", label: "Tarefas", icon: <ListTodo size={18} /> },
        { to: "/categories", label: "Categorias", icon: <Tag size={18} /> },
        { to: "/profile", label: "Perfil", icon: <User size={18} /> },
    ];

    return (
        <aside className="w-64 h-screen bg-white border-r px-4 py-6 fixed left-0 top-0">
        <h1 className="text-2xl font-semibold tracking-tight mb-8">FastTasks</h1>

        <nav className="flex flex-col gap-2">
            {menu.map(item => (
            <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100"}`
                }
            >
                {item.icon}
                {item.label}
            </NavLink>
            ))}
        </nav>
        </aside>
    );
    }
