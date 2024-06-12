import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:7047/api",
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
        return { data: res?.data, status: res.status };
    },
    async (err) => {
        //có thể thêm case 403 ("Không có quyền truy cập")
        if (err.response.status === 401) {
            window.location.href = "/login";
            return Promise.reject(err.response.data);
        }
        return Promise.reject(err)
    }
);

export const httpClient = instance

