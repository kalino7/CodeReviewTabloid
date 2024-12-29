import React, { useEffect, useState } from 'react';
import Assignment from './assingment';
import { requestHeader } from '../util/header';
import { useLocalStorage } from '../util/tokenState';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';

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
                    <div className='mycustom-grid my-3'>
                        { (assingments) && (
                            assingments.map((result)=>
                                <Card key={result.id} style={{ width: '18rem' }}>
                                    <Card.Body className='d-flex flex-column justify-content-around'>
                                        <Card.Title>Assignment: {result.id}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{result.status}</Card.Subtitle>
                                        <Card.Text>Github URL: {result.githuburl}</Card.Text>
                                        <Card.Text>Branch: {result.branch}</Card.Text>
                                        <Card.Link as={Button} variant="secondary" href={`/assignment/${result.id}`} className='stretched-link'>Edit</Card.Link>
                                    </Card.Body>
                                </Card>
                            ) 
                            )
                        }
                    </div>
                </Col>
            </Row>

        </Container>
        
    );
};

export default Dashboard;