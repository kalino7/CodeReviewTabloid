import { Navigate } from "react-router";
import { useLocalStorage } from "../util/tokenState";

const ProtectedRoute = ({children}) =>{
    const [token, setToken] = useLocalStorage("", "jwtToken");
    return (token && token != null) ? children : <Navigate to="/login" />

}

export default ProtectedRoute;