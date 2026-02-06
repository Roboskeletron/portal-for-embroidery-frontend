import {create} from "zustand/react";

interface AuthState{
    isAuthenticated: boolean;
    role: string | null;
    setAuth: (isAuthenticated: boolean) => void;
    setRole: (role: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) =>({
    isAuthenticated: false,
    role: null,
    setAuth: (isAuthenticated) => set({isAuthenticated}),
    setRole: (role) => set( {role }),
    logout: () => set({isAuthenticated: false, role: null}),
}))