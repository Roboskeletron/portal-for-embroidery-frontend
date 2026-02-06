export const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    clientId: import.meta.env.VITE_CLIENT_ID || 'portal-for-embroidery-web',
    keycloakRealm: import.meta.env.VITE_KEYCLOAK_REALM || 'portal-for-embroidery-local',
    keycloakBaseURL: import.meta.env.VITE_KEYCLOAK_BASE_URL || 'http://localhost',
}