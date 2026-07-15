import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});


// Ajouter automatiquement le token JWT
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// Gestion expiration token
api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;


        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            const refresh = localStorage.getItem("refresh");


            if (refresh) {

                try {

                    const response = await axios.post(
                        "http://127.0.0.1:8000/api/users/refresh/",
                        {
                            refresh: refresh
                        }
                    );


                    const newAccess = response.data.access;


                    localStorage.setItem(
                        "access",
                        newAccess
                    );


                    originalRequest.headers.Authorization =
                        `Bearer ${newAccess}`;


                    return api(originalRequest);


                } catch (error) {

                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");

                    window.location.href="/login";
                }
            }
        }


        return Promise.reject(error);
    }
);


export default api;