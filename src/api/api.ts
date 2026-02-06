import axios from "axios";
import {config} from "../config.ts";
import keycloak from "../lib/keycloak.ts";

const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
})

axiosInstance.interceptors.request.use(function (config) {
    if (keycloak.authenticated){
        config.headers.Authorization = `Bearer ${keycloak.token}`
    }
    return config;
})

export default axiosInstance;
