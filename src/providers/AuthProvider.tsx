import {type ReactNode, useEffect, useState} from "react";
import keycloak from "../lib/keycloak.ts";
import {useAuthStore} from "../store/AuthStore.ts";

export const AuthProvider = ({ children } : {children: ReactNode}) => {
    const [isReady, setIsReady] = useState(false);
    const setAuth = useAuthStore((state) => state.setAuth);
    const logoutStore = useAuthStore((state) => state.logout);

    useEffect(() => {
        keycloak.onAuthSuccess = () => {
            setAuth(true);
        }

        keycloak.onAuthLogout = () => {
            logoutStore();
        };

        keycloak.onTokenExpired = () => {
            keycloak.updateToken(30).catch(() => {
                console.error("Failed to refresh token");
                keycloak.logout();
            });
        };

        keycloak.onReady = () => {
            console.debug('Keycloak ready');
            setIsReady(true);
        }

        if (!keycloak.didInitialize) {
            console.debug('Initializing keycloak');
            keycloak.init({
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
                pkceMethod: 'S256'
            }).catch((err) => {
                console.error("Keycloak init failed", err);
                setIsReady(true);
            });
        }

    }, [setAuth, logoutStore]);

    if (!isReady) {
        return <div>Loading App...</div>;
    }

    return <>{children}</>;
}