import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../util/tokenState';
import { requestHeader } from '../util/header';
import { useParams } from 'react-router';

const GetAssingmentByID = () => {
    const [token, setToken] = useLocalStorage("", "jwtToken");
    const header = requestHeader("GET", token);
    const { id } = useParams();
    const [record, setRecord] = useState(null);

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
        <>
            {(record) ? (
                <>
                    <div>{record.id}</div>
                    <div>{record.status}</div>
                    <div>{record.user.username}</div>
                </>
            )
            : ""}
        </>
    );
};

export default GetAssingmentByID;