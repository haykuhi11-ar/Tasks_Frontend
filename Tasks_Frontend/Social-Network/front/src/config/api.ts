import axios from "axios";

export const BASE = "http://localhost:4002/"

export const http = axios.create({
    baseURL: BASE,

});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});