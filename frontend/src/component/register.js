import { useState } from "react";
import CustomizeButton from "./button";
import { requestHeader } from "../util/header";
import {Container, Row, Col, Form} from 'react-bootstrap';

function RegisterForm(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () =>{
        const populateErr = {};

        if(password.length < 8){
            populateErr.password = "Das Passwort muss länger als acht Zeichen sein";
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
           populateErr.password = 'Das Passwort muss mindestens ein Sonderzeichen enthalten';
        }

        if(password !== confirmPassword){
            populateErr.confirmPassword = 'Die von Ihnen eingegebenen Passwörter sind nicht identisch';
        }

        if(!/^[^\s@]+@+[^\s@]+\.+[^\s@]+$/.test(email)){
            populateErr.email = "Invalide Email Addresse";
        }

        return populateErr;
    }

    const regReq = async (e) => {
        e.preventDefault();
        const checkForm = validateForm();

        if(Object.keys(checkForm).length === 0){
            const logDetail = { firstName, lastName, email, username, password };
            const requestOptions = requestHeader("POST", null, logDetail);
        
            try {
                const response = await fetch("http://localhost:8081/api/connect/register", requestOptions);
        
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Request failed with status ${response.status}`);
                }
        
                const data = await response.json();
                if(data)
                {
                    alert(`${username}: registered successfully!`);
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Error during registration:", error);
                alert(`Error: ${error.message}`);
            }
        }
        else{
            setErrors(checkForm);
        }
    };
    

    return(

        <Container className="mt-4">
            <Row className="justify-content-center align-items-center">
                <Col md="8" lg="6">
                    <h3>Bitte registrieren Sie sich mit Ihren Daten</h3>
                </Col>
            </Row>

            <Form onSubmit={regReq}>
                
                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="formFirstname">
                            <Form.Label>Vorname</Form.Label>
                            <Form.Control type="text" placeholder="Vorname eingeben"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="formLastname">
                            <Form.Label>Nachname</Form.Label>
                            <Form.Control type="text" placeholder="Vorname eingeben"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email eingeben"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                
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
                            isInvalid={!!errors.password}
                            />
                            <Form.Text className="text-muted">
                                Ihre Daten sind sicher!
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Passwort Bestätigung</Form.Label>
                            <Form.Control type="password" placeholder="Bitte Passwort erneut eingeben" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Text className="text-muted">
                                Ihre Daten sind sicher!
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
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

export default RegisterForm;