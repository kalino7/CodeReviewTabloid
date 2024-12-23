import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../util/tokenState';
import { requestHeader } from '../util/header';
import { useParams } from 'react-router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

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
            alert(`deleted assignment ID: ${id}`);

            
            window.location.href = "/dashboard";
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

        <Container className="mt-4">

            <Form>
                <fieldset disabled>
                    {(record) && (
                       <>
                        <Row className="justify-content-center align-items-center">
                            <Col md="8" lg="6">
                                <Form.Group className="mb-3" controlId="Username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={record.user.username}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="justify-content-center align-items-center">
                            <Col md="8" lg="6">
                                <Form.Group className="mb-3" controlId="AssingmentID">
                                    <Form.Label>AssignmentID: </Form.Label>
                                    <Form.Control type="text" value={record.id}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="justify-content-center align-items-center">
                            <Col md="8" lg="6">
                                <Form.Group className="mb-3" controlId="status">
                                    <Form.Label>Assignment Status</Form.Label>
                                    <Form.Control type="text" value={record.status}/>
                                </Form.Group>
                            </Col>
                        </Row>
                       </>
                    )}
                </fieldset>
            </Form>
            
            
            <Row className="justify-content-center align-items-center">
                <Col md="8" lg="6">
                    <Form.Group className="mb-3" controlId="formGithuburk">
                        <Form.Label>GithubURL</Form.Label>
                        <Form.Control type="url" placeholder="GithubURL eingeben"
                        onChange={(e)=>updateRecord("githuburl", e.target.value)}
                        value={( record && record.githuburl)?record.githuburl:""}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-center align-items-center">
                <Col md="8" lg="6">
                    <Form.Group className="mb-3" controlId="formBranch">
                        <Form.Label>Branch</Form.Label>
                        <Form.Control type="text" placeholder='github branch'
                        onChange={(e)=>updateRecord("branch", e.target.value)}
                        value={(record && record.branch)?record.branch:""}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-center align-items-center">
                <Col md="8" lg="6" className="d-flex flex-column flex-md-row gap-5 justify-content-md-between">           
                    <Button variant="primary" onClick={handleUpdate}> Update </Button>
                    <Button variant="danger" onClick={handleRemove}> Remove </Button>        
                </Col>
            </Row>
        </Container>
    );
};

export default GetAssingmentByID;