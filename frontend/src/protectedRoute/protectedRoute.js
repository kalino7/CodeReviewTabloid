import { Navigate } from "react-router";
import { useLocalStorage } from "../util/tokenState";
import { requestHeader } from "../util/header";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({children}) =>{
    const [token, setToken] = useLocalStorage("", "jwtToken");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if(token){
        const header = requestHeader("GET",token);
        fetch(`http://localhost:8081/api/connect/validate?token=${token}`, header)
        .then( request => request.json())
        .then( data => {
            if(data){
                setIsValid(data);
                setIsLoading(false);
            }
        })
        .catch( error => {
            console.log(error);
            
            if(isValid){
                setIsValid(false);
            }
            setIsLoading(false);
        });
    }

    return(
        <>
            { 
                (isLoading) ? 
                    <div className="m-5">
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="secondary" />
                    </div> 
                : 
                    (isValid) ? children : <Navigate to="/login" /> 
            }
        </>
    )

}

export default ProtectedRoute;