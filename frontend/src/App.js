import './App.css';
import React, { useState } from "react";

function RegForm()
{
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
            }
        } catch (error) {
            console.log(error);
            
        }

    }

    return(
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
            <button type="submit">Login</button>
        </form>
    );
}

function LoginForm()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

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
            const request = await fetch("http://localhost:8081/api/connect/authenticate", contentHeader);
            if(request.ok)
            {
                const response = await request.json();
                setToken(response.token);

                console.log(token);
                
            }
        } catch (error) {
         console.log(error);
            
        }
    }

    return(
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
        <button type="submit">Login</button>
    </form>
    );
}

function App() {

    return (
      <div className="App">

        <RegForm />
        <hr/>
        <LoginForm />
      </div>
    );
  }

export default App;
