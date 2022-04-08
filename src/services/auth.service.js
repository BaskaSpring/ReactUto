import axios from "axios";

const API_URL = "http://localhost/UTO/hs/API/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "SignIn", {username, password})
            .then(response => {
                if (response.data.Token) {
                    localStorage.setItem("user", JSON.stringify(response.data.UserName));
                    localStorage.setItem("Token", JSON.stringify(response.data.Token));
                    localStorage.setItem("RefreshToken", JSON.stringify(response.data.RenewToken));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("Token");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
        ;
    }

    getToken() {
        return JSON.parse(localStorage.getItem('Token'));
    }

    getRefreshToken(){
        const token = JSON.parse(localStorage.getItem('RefreshToken'));
        if (token) {
            return token ;
        } else {
            return {};
        }
    }
}

export default new AuthService();
