import { useState } from "react";
import Button from "./button";
import { useLocalStorage } from "../util/tokenState";

const LoginForm = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const key = "jwtToken";
    const [token, setToken] = useLocalStorage("",key);

    const loginReq = async (event) => {
        event.preventDefault();
        const logDetail = {username, password};
        const contentHeader = {
            headers: {
                "Content-Type": "application/json",
            },
            method : "POST",
            body : JSON.stringify(logDetail)
        }
        try {

            if(!token){
                const request = await fetch("http://localhost:8081/api/connect/authenticate", contentHeader);
                if(request.ok)
                {
                    const response = await request.json();
                    setToken(response.token);
                    console.log(token);
                    alert(`${username}: successfully signed in`);                
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