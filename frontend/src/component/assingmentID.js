import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../util/tokenState';
import { requestHeader } from '../util/header';
import { useParams } from 'react-router';

const GetAssingmentByID = () => {
    const [token, setToken] = useLocalStorage("", "jwtToken");
    const header = requestHeader("GET", token);
    const { id } = useParams();
    const [record, setRecord] = useState(null);

    const updateRecord = (prop, value) =>{
        let newRecords = {...record};
        newRecords[prop] = value;
        setRecord(newRecords);
    }

    const handleUpdate = async () => {
        const updateHeader = requestHeader("PUT", token, record);
        try {
            const  request = await fetch(`http://localhost:8081/api/assignments/${id}`, updateHeader);
            const response = await request.json();
            if(request.status !== 200){
                throw new Error(response.message);
            }
            alert(`Updated assingment ID: ${id}`);
            setRecord(response);
        } catch (error) {
            console.error("Error: ", error);
            alert(`Error: ${error.message}`);
        }
    }

    const handleRemove =  async () => {
        const updateHeader = requestHeader("DELETE", token);
        try {
            const  request = await fetch(`http://localhost:8081/api/assignments/${id}`, updateHeader);
            const response = await request.json();
            if(!request.ok){
                throw new Error(response.message);
            }
            alert(`deleted assingment ID: ${id}`);
            window.location.href("/assignments");
        } catch (error) {
            console.error("Error: ", error);
            alert(`Error: ${error.message}`);
        }
    }

    useEffect(() => {

        fetch(`http://localhost:8081/api/assignments/${id}`, header)
            .then(response => {
                if (!response.ok) {
                    throw new Error("could not process data");
                }
                return response.json();
            })
            .then(data => setRecord(data))
            .catch(error => console.log(error));

    }, []);

    return (
        <div className="form-container">
            {(record) ? (
                <>
                    <div> <label>Username: </label> {record.user.username}</div>
                    <div> <label>Assignment: </label> {record.id}</div>
                    <div> <label>Status: </label> {record.status}</div>
                </>
            )
            : ""}

            <div>
                <label>GithubURL:</label>
                <input 
                    type="url" 
                    name="githuburl" 
                    placeholder='github url'
                    onChange={(e)=>updateRecord("githuburl", e.target.value)}
                    value={( record && record.githuburl)?record.githuburl:""}
                />
            </div>

            <div>
                <label>Branch:</label>
                <input 
                    type="text" 
                    name="branch" 
                    placeholder='github branch'
                    onChange={(e)=>updateRecord("branch", e.target.value)}
                    value={(record && record.branch)?record.branch:""}
                />
            </div>
            
            <button className='btn btn-update' onClick={handleUpdate}> Update </button>
            <button className='btn btn-remove' onClick={handleRemove}> Remove </button>
        </div>
    );
};

export default GetAssingmentByID;