import axios from "axios";
import authService from "./auth.service";

const instance = axios.create({
    baseURL: "http://localhost/UTO/hs/API/",
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use(
    (config) => {
        const token  = authService.getToken();
        if (token) {
            config.headers = {"Token":token};
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error)=>{
        const  originalConfig = error.config;
        if (originalConfig.url !== "SignIn/"&&error.response){
            if (error.response.status===401 && !originalConfig._retry){
                originalConfig._retry  = true;
                try {
                    const rs = await instance.post("RenewToken/",{RefreshToken: authService.getRefreshToken()});
                    localStorage.removeItem("Token");
                    localStorage.setItem("Token", JSON.stringify(rs.data.Token));
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default instance;