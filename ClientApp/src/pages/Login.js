import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    NavLink,
} from "reactstrap";
import React, { useState } from "react";
import { useNavigate, NavLink as ReactLink } from "react-router-dom";
import { LOGINAPIURL } from "../components/ConfigFile";
const Login = () => {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event, property) => {
        setUserData({ ...userData, [property]: event.target.value });
    };

    const resetHandle = () => {
        setUserData({
            email: "",
            password: "",
        });
        setEmailError(null);
        setPasswordError(null);
    };

    const submitForm = (event) => {
        event.preventDefault();
        // data validation
        setEmailError(null);
        setPasswordError(null);
        //Call server API
        if (validateEmail(userData.email) && userData.password !== "") {
            const username = userData.email;
            const password = userData.password;
            // Make the API call for login
            fetch(LOGINAPIURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    sessionStorage.setItem("MyToken", data.token);
                    sessionStorage.setItem("Userid", data.user.id);
                    sessionStorage.setItem("name", data.user.name);
                    sessionStorage.setItem("UserName", username);
                    navigate("/Blog");
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setPasswordError("Invalid UserName or password");
                    // Handle error if the API call fails
                });
        } else {
            if (!validateEmail(userData.email)) {
                setEmailError("Please enter a valid UserName or Email");
            } else {
                setPasswordError("Please enter a password");
            }
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <Container>
            <Row>
                <Col sm={{ size: 6, offset: 3 }}>
                    <Card className="mt-4">
                        <CardHeader style={{ backgroundColor: "#2f8eff", color: "black" }}>
                            <h4><i className="bi bi-person-circle"> </i>Login</h4>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={submitForm}>
                                {/* Email filed*/}
                                <FormGroup>
                                    <Label for="email"><strong>Enter Email</strong></Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Here"
                                        id="email"
                                        onChange={(e) => handleChange(e, "email")}
                                        value={userData.email}
                                    />
                                    {emailError && <Label style={{ color: "Red" }}>{emailError}</Label>}
                                </FormGroup>
                                {/* Password filed*/}
                                <FormGroup>
                                    <Label for="password"><strong>Enter password</strong></Label>
                                    <Input
                                        type="password"
                                        placeholder="Enter Here"
                                        id="password"
                                        onChange={(e) => handleChange(e, "password")}
                                        value={userData.password}
                                    />
                                    {passwordError && <p style={{ color: "Red" }}>{passwordError}</p>}
                                </FormGroup>


                                <Container className="text-center d-flex justify-content-between">
                                    <Button className="mb-4 w-50 gradient-custom-2 me-2">Login</Button>
                                    <Button type="reset" className="mb-4 w-50 gradient-custom-2" onClick={resetHandle}>
                                        Reset
                                    </Button>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                    <Container className="text-center">
                        <p>
                            Are you new user?
                            <NavLink tag={ReactLink} to="/SignUp">
                                <strong style={{ color: "blue" }}>SignUp</strong>
                            </NavLink>
                        </p>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
