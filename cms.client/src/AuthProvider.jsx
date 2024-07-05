import { useContext, createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [screen, setScreen] = useState("auth");

    const loginAuth = async (data) => {
        try {
            const res = await axios.post("./api/Authentication/authenticate", data);
            if (res.data.screen !== undefined) {
                readCookie();
                return;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const readCookie = async () => {
        try {
            const res = await axios.get("/read-cookie");
            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
                navigate("/view");
                return;
            }
        } catch (e) {
            setScreen("auth");
            console.log(e);
        }
    };

    const logoutAuth = async () => {
        try {
            await axios.get("/clear-cookie");
            setScreen("auth");
            navigate("/login");
            return;
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <AuthContext.Provider value={{ screen, loginAuth, logoutAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
};