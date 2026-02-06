import Keycloak from "keycloak-js";
import {config} from "../config.ts";

const keycloak = new Keycloak({
    url: config.keycloakBaseURL,
    realm: config.keycloakRealm,
    clientId: config.clientId,
})

export default keycloak;