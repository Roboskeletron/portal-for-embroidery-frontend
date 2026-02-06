import {useAuthStore} from "../store/AuthStore.ts";
import keycloak from "../lib/keycloak.ts";

export const useAuth = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const login = () => {
        keycloak.login();
    }

    const logout = () => {
        keycloak.logout({ redirectUri: window.location.origin });
    }

    const register = () => {
        keycloak.register();
    }

    return {
        isAuthenticated,
        login,
        register,
        logout,
    }
}