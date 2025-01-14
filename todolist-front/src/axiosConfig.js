import axios from "axios";
import { getAuthCredentials } from "./utils/Auth";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/tasks",
    withCredentials: true, 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const {username, password} = getAuthCredentials();

        console.log(username, password);
        
        if (username && password) {
            config.auth = {
                username,
                password
            };
        } else {
            return Promise.reject("No auth credentials");
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default axiosInstance;