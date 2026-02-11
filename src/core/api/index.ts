import axios from "axios";


export const AuthAPI = axios.create(
    {
        baseURL: "/articulos/api",
        headers: {
            "Content-Type": "application/json",
        },
    }
)