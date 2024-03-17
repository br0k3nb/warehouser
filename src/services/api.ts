import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3002/' });

// api.interceptors.request.use(async config => {
//     const rawUserData = localStorage.getItem('@WAREHOUSER:SYSTEM') || "{}";
//     const { token } = JSON.parse(rawUserData);

//     if (token) config.headers.Authorization = `Bearer ${token}`;

//     return config;
// });

api.interceptors.response.use(
    response => response,
    error => {
        const errorStatus = error?.response?.status;
        const errorMessage = error?.response?.data?.message as string

        if ((errorStatus >= 500 && errorStatus <= 599)){
            //(500 - 599) = Server error responses
            return Promise.reject({ message: "Server error, please try again or later" });
        } 

        if(error?.code === "ERR_NETWORK") {
            return Promise.reject({ message: "Connection to server failed, please verify your internet connection" });
        }

        if((typeof errorMessage === "string" && error.code !== "ECONNABORTED") && 
            (errorMessage.startsWith("Authentication") ||
            errorMessage.startsWith("Access") ||
            errorMessage.startsWith("Session"))
        ) {
            //sign out logic here...
        }

        return Promise.reject(error.response.data);
    },
);

export default api;