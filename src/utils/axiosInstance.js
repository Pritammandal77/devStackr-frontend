import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// Auto-refresh interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await axiosInstance.get("/api/v1/users/refresh-token", {
                    withCredentials: true,
                });

                // retry the original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token expired or invalid");
                window.location.href = "/login"; // or navigate programmatically
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
