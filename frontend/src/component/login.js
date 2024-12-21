import { useState } from "react";
import CustomizeButton from "./button";
import { useLocalStorage } from "../util/tokenState";
import { requestHeader } from "../util/header";
import {Container, Row, Col, Form} from 'react-bootstrap';

const LoginForm = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const key = "jwtToken";
    const [token, setToken] = useLocalStorage(null,key);

    const loginReq = async (event) => {
        event.preventDefault();
        const logDetail = {username, password};
        const contentHeader = requestHeader("POST",token,logDetail);
        
        try {

            if(!token){
                const request = await fetch("http://localhost:8081/api/connect/authenticate", contentHeader);
                if(request.ok)
                {
                    const response = await request.json();
                    setToken(response.token);
                    alert(`${username}: successfully signed in`);    
                    window.location.href="/dashboard";            
                }
            }
            else{
                alert(`Existing user: ${username} is still logged in`);
            }
        } catch (error) {
         console.log(error);
         alert("unexpected error occured!");
            
        }
    }

    return(

        <Container className="mt-4">
            <Row className="justify-content-center align-items-center">
                <Col md="8" lg="6">
                    <h3>Bitte melden Sie sich an</h3>
                </Col>
            </Row>

            <Form onSubmit={loginReq}>
                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Benutzername</Form.Label>
                            <Form.Control type="text" placeholder="Benutzernamen eingeben"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                        Die Benutzername ist immer einzigartig!
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control type="password" placeholder="Passwort eingeben" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6" className="d-flex flex-column flex-md-row gap-5 justify-content-md-between">           
                        <CustomizeButton sticker="Anmelden" />
                    </Col>
                </Row>

            </Form>
            
        </Container>
    );
}

export default LoginForm;