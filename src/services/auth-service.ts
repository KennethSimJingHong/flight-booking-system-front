import axios from "axios";
import User from "../models/user";

const baseUrl: string = "http://localhost:8080/api/auth";

class AuthService {
    async login(username: string, password: string){
        let data: {} = {username, password};
        const response = await axios.post(baseUrl + "/signin", data);
        if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data));
        }

        return response.data;
    }

    logout(){
        localStorage.removeItem("token");
    }

    register(newUser: User, password: string){
        let data: {} = {
            ...newUser,
            password
        };
        return axios.post(baseUrl + "/signup", data);
    }

    getCurrentUser(){
        if(localStorage.getItem('token') == null){
            return null;
        }
        
        return JSON.parse(localStorage.getItem('token')!);
    }
}

export default new AuthService();
