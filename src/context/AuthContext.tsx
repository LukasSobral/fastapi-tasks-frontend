    import React, { createContext, useContext, useState } from "react";
    import { api } from "../api/api";

    type User = {
    id: number;
    email: string;
    full_name: string;
    };

    type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    };

    const AuthContext = createContext<AuthContextType>({} as AuthContextType);

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    async function login(email: string, password: string) {
        const form = new FormData();
        form.append("username", email);
        form.append("password", password);

        const { data } = await api.post("/auth/login", form, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);


        const profile = await api.get("/users/me", {
            headers: {
            Authorization: `Bearer ${data.access_token}`,
            },
        });

    setUser(profile.data);
        }


    function logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
        {children}
        </AuthContext.Provider>
    );
    };

    export function useAuth() {
    return useContext(AuthContext);
    }
