import { useState } from "react";
import Button from "./button";
import { requestHeader } from "../util/header";

function RegisterForm(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const regReq = async (e) => {
        e.preventDefault();
    
        const logDetail = { firstName, lastName, email, username, password };
        const requestOptions = requestHeader("POST", null, logDetail);
    
        try {
            const response = await fetch("http://localhost:8081/api/connect/register", requestOptions);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Request failed with status ${response.status}`);
            }
    
            const data = await response.json();
            if(data)
            {
                alert(`${username}: registered successfully!`);
                window.location.href = "/login";
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert(`Error: ${error.message}`);
        }
    };
    

    return(
        <div className="form-container">
            <h3>Register User</h3>           
            <form onSubmit={regReq}>
                <div>
                    <label>Firstname:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label>lastname:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label>email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
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
                <Button sticker="Register" />
            </form>
        </div>
    );
}

export default RegisterForm;