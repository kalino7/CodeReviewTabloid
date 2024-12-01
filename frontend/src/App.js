import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginReq = async (event) => {
        event.preventDefault();
        const logDetail = {username, password};
        const contentHeader = {
            "content-Type" : "Application/json",
            "method": "POST",
            "Body": JSON.stringify(logDetail)
        }
        try {
            const request = await fetch("http://localhost:8081/api/connect/login", contentHeader);
            if(request.ok)
            {
                const response = await request.json();
                console.log(response);
                
            }
        } catch (error) {
         console.log(error);
            
        }
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section>
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
      </section>
    </div>
  );
}

export default App;
