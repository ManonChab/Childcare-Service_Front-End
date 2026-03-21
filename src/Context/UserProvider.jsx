import { useState, useEffect } from "react"
import { UserContext } from "./UserContext"
import UserPath from "../Service/UserPath"
import api from "../Service/api"
import AuthModal from "../Components/molecules/authModal/AuthModal"

const UserProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("userData");
        // const savedToken = localStorage.getItem("token");
        // if (!savedToken || !savedUser) {
        //     logout();
        // } else {
        //     setUser(JSON.parse(savedUser));
        //     setIsLogged(true);
        // }
    }, []);

    const openAuthModal = () => setIsModalOpen(true);
    const closeAuthModal = () => setIsModalOpen(false);

    const login = async (credentials) => {
        try {
            console.log("Trying to login...");

            const response = await api.post("/api/v1/users/login", credentials);

            const authHeader = response.headers['authorization'];
            // const token = authHeader ? authHeader.replace("Bearer ", "") : null;
            const userData = response.data;

            // if (!token) throw new Error("No token received from server");

            const loggedUser = {
                id: userData.id,
                username: userData.userName,
                location: userData.location,
            };

            // localStorage.setItem("token", token);
            localStorage.setItem("userData", JSON.stringify(loggedUser));

            setUser(loggedUser);
            setIsLogged(true);
            console.log("LogIn successfull");
            return userData;

        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setIsLogged(false);
    };

    // ✅ Component return must be here, at the top level of UserProvider
    return (
        <UserContext.Provider
            value={{
                isLogged,
                setIsLogged,
                login,
                logout,
                user,
                isModalOpen,
                openAuthModal,
                closeAuthModal,
            }}
        >
            {children}
            <AuthModal isOpen={isModalOpen} onClose={closeAuthModal} />
        </UserContext.Provider>
    );
};

export default UserProvider;
