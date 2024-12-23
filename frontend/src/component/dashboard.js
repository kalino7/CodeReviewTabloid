import React, { useEffect, useState } from 'react';
import Assignment from './assingment';
import { requestHeader } from '../util/header';
import { useLocalStorage } from '../util/tokenState';
import { Link } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';

const Dashboard = () => {

    const[token, setToken] = useLocalStorage(null, "jwtToken"); 
    const[assingments, setAssingments] = useState([]);
    const contentHeader = requestHeader("GET", token);

    const fetchAssingments = async () => {
        try {
            const request = await fetch("http://localhost:8081/api/assignments", contentHeader);

            if(request.ok){
                const response = await request.json();
                if(!response){
                    throw new Error("could not return json");
                }
                setAssingments(response);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            
        }
    }

    useEffect(()=>{
        fetchAssingments();
    },[]);

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <Assignment />
            
                    { (assingments) && (
                        assingments.map((result)=><div key={result.id} className='assingmentList'>
                            <Link to={`/assignment/${result.id}`}>
                                `Assignment: {result.id} _{result.status}`
                            </Link>
                        </div>) 
                        )
                    }
                </Col>
            </Row>

        </Container>
        
    );
};

export default Dashboard;