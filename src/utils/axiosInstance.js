import axios from 'axios';

// axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // so cookies (access/refresh token) are sent
});

// Flag to avoid infinite loop
let isRefreshing = false;
let failedQueue = [];

// Function to handle queue (in case multiple 401s happen together)
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Interceptor to refresh token on 401
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and retry flag not set (to avoid infinite loops)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                // Calling our refresh token endpoint
                const res = await axiosInstance.post('/api/v1/users/refresh-token', {}, {
                    withCredentials: true
                });

                console.log(res)

                processQueue(null);
                return axiosInstance(originalRequest); // Retry the original request
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
