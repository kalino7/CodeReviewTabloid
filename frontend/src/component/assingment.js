import React from 'react';
import { useLocalStorage } from '../util/tokenState';

const Assignment = () => {

    const [token, setToken] = useLocalStorage("", "jwtToken");

    const createAssingment = async () => {
        const headInfo = {
            headers: {
                "Content-Type": "Application/json",
                Authorization:  `Bearer ${token}`
            },
            method: "POST"
        }
        
        try {
            const response = await fetch("http://localhost:8081/api/assignments", headInfo);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);           
        }
    }

    return (
        <button className="btn" onClick={()=>createAssingment()}> Create Assingment</button>
    );
};

export default Assignment;