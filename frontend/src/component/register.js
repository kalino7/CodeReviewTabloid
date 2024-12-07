import { useState } from "react";
import Button from "./button";

function RegisterForm(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const regReq = async (e) => {
        e.preventDefault();

        const logDetail = {firstName, lastName, email, username, password};
        const contentHeader = {
            headers: {
                "Content-Type": "application/json",
            },
            method : "POST",
            body : JSON.stringify(logDetail)
        }

        try {
            const send = await fetch("http://localhost:8081/api/connect/register", contentHeader);
            if(send.ok)
            {
                const resp = await send.json();
                console.log(resp.token);
                alert(`${username}: registered`);
            }
        } catch (error) {
            console.log(error);
            alert("Unexpected Error Occured!");
        }

    }

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