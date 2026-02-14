interface ImportMetaEnv {
    readonly VITE_CLIENT_ID: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_KEYCLOAK_BASE_URL: string;
    readonly VITE_KEYCLOAK_REALM: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
