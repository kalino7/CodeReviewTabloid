import { useState } from "react";
import Button from "./button";
import { useLocalStorage } from "../util/tokenState";
import { requestHeader } from "../util/header";

const LoginForm = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const key = "jwtToken";
    const [token, setToken] = useLocalStorage(null,key);

    const loginReq = async (event) => {
        event.preventDefault();
        const logDetail = {username, password};
        const contentHeader = requestHeader("POST",token,logDetail);
        
        try {

            if(!token){
                const request = await fetch("http://localhost:8081/api/connect/authenticate", contentHeader);
                if(request.ok)
                {
                    const response = await request.json();
                    setToken(response.token);
                    alert(`${username}: successfully signed in`);    
                    window.location.href="/dashboard";            
                }
            }
            else{
                alert(`Existing user: ${username} is still logged in`);
            }
        } catch (error) {
         console.log(error);
         alert("unexpected error occured!");
            
        }
    }

    return(
        <div className="form-container">
            <h3>Login User</h3>
            <form onSubmit={loginReq}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button sticker="Login" />
            </form>
        </div>
    );
}

export default LoginForm;