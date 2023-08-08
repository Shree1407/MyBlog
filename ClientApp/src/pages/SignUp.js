import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    NavLink,
    FormGroup,
    Input,
    Form,
    Row,
} from "reactstrap";
import { validateField } from "../components/validationUtils";
import { useNavigate, NavLink as ReactLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import { REGISTRATIONAPIURL } from "../components/ConfigFile";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const resetHandle = () => {
        setName("");
        setAge("");
        setGender("");
        setMobile("");
        setEmail("");
        setPassword("");
        setErrors({});
    };
    const submitForm = async (event) => {
        event.preventDefault();
        const nameError = validateField("name", name);
        const ageError = validateField("age", age);
        const genderError = validateField("gender", gender);
        const mobileError = validateField("mobile", mobile);
        const emailError = validateField("email", email);
        const passwordError = validateField("password", password);

        setErrors({
            name: nameError,
            age: ageError,
            gender: genderError,
            mobile: mobileError,
            email: emailError,
            password: passwordError,
        });

        if (
            !nameError &&
            !ageError &&
            !genderError &&
            !mobileError &&
            !emailError &&
            !passwordError
        ) {
            try {
                const response = await fetch(REGISTRATIONAPIURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        age,
                        gender,
                        mobile,
                        email,
                        password,
                    }),
                });

                if (response.ok) {
                    //alert("Successful registration");
                    
                    toast.success("Successful registration!", {
                        onClose: () => {
                            navigate("/");
                        },
                        autoClose: 1000 // Toast notification will close after 1 seconds
                    });
                    // Successful registration
                } else if (response.status === 400) {
                    setErrors({
                        password: "With Email '" + email + "' user alreday available.",
                    });
                    // Successful registration
                } else {
                    setErrors({
                        password: "Bad request kindly try after some time",
                    });
                    console.error("Registration failed");
                }
            } catch (error) {
                console.error("Registration error:", error);
            }
        } else {
            return;
        }
    };

    return (
        <Container>
            <Row>
                <Col sm={{ size: 6, offset: 3 }}>
                    <Card className="mt-4">
                        <CardHeader style={{ backgroundColor: "#2f8eff", color: "black" }}>
                            <h4>
                                <i className="bi bi-list-columns"></i>Registration
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={submitForm}>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                    />
                                    {errors.name && (
                                        <span style={{ color: "Red" }}>{errors.name}</span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        placeholder="Age"
                                    />
                                    {errors.age && (
                                        <span style={{ color: "Red" }}>{errors.age}</span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        placeholder="Gender"
                                    />
                                    {errors.gender && (
                                        <span style={{ color: "Red" }}>{errors.gender}</span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        placeholder="Mobile"
                                    />
                                    {errors.mobile && (
                                        <span style={{ color: "Red" }}>{errors.mobile}</span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <span style={{ color: "Red" }}>{errors.email}</span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <span style={{ color: "Red" }}>{errors.password}</span>
                                    )}
                                </FormGroup>

                                <Container className="text-center d-flex justify-content-between">
                                    <Button className="mb-4 w-50 gradient-custom-2 me-2">
                                        Add
                                    </Button>
                                    <Button
                                        type="reset"
                                        className="mb-4 w-50 gradient-custom-2"
                                        onClick={resetHandle}
                                    >
                                        Reset
                                    </Button>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                    <Container className="text-center">
                        <p>
                            Are you existing user?
                            <NavLink tag={ReactLink} to="/">
                                <strong style={{ color: "blue" }}>Login</strong>
                            </NavLink>
                        </p>
                    </Container>
                </Col>
            </Row>
            <ToastContainer />
        </Container >
    );
};

export default SignUp;
