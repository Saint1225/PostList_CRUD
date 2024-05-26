import axios from "axios";

// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = process.env.LOCAL_APP_BASE_URL;

const customAxios = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
})

customAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") ?? "";
    if (token) config.headers.Authorization = token;
    return config;
}, (error) => Promise.reject(error));

export default customAxios;