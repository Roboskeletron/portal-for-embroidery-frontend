import {create} from "zustand/react";

interface AuthState{
    isAuthenticated: boolean;
    role: string | null;
    userId: number | null;
    setAuth: (isAuthenticated: boolean) => void;
    setRole: (role: string) => void;
    setUserId: (userId: number) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) =>({
    isAuthenticated: false,
    role: null,
    userId: null,
    setAuth: (isAuthenticated) => set({isAuthenticated}),
    setRole: (role) => set( {role }),
    setUserId: (userId) => set ({ userId }),
    logout: () => set({isAuthenticated: false, role: null, userId: null}),
}))