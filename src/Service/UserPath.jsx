import axios from "axios";
import api from "./api";


const UserPath =() =>{
    const url = "/api/v1/users";

    const getUserById = async(id) =>{
        try{
            const response = await api.get(`${url}/${id}`);
            return response.data;
        } catch (error) {
            console.error ("Error to obtains user details", error);
            throw error;
        }
    };
    
    const deleteUser = async (id) => {
        try {
            const response = await api.delete(`/api/v1/users/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting user", error);
            throw error;
        }
    };

    const createUser = async(userData) => {
        try{
            const response = await api.post(url, userData);
            return response.data;
        }catch (error) {
            console.error ("Error creating user", error);
            throw error;
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const response = await api.put(`/api/v1/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
};

    const login = async (credentials) => {
        try {
        const response = await axios.post("http://localhost:8080/login", credentials);
        return response;
        } catch (error) {
        console.error("Login error", error);
        throw error;
        }
    };

return{ getUserById, createUser, updateUser, deleteUser, login}

}

export default UserPath;