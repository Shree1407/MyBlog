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
} from "reactstrap";
import React, { useState } from "react";
import axios from "axios";
import { POSTAPIURL } from "../components/ConfigFile";
import Base from "../components/Base";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [image, setImage] = useState(null);
    const token = sessionStorage.getItem('MyToken');
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handledescriptionChange = (e) => {
        setdescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const AuthorId =
            sessionStorage.getItem("Userid") == null
                ? 1
                : sessionStorage.getItem("Userid");
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("AuthorId", AuthorId);
            formData.append("image", image);
            const response = await axios.post(POSTAPIURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });
            if (!response.status === 200) {
                throw new Error("Failed to create blog post.");
            } else {
                toast.success("Post submitted successfully!", {
                    onClose: () => {
                        setTitle("");
                        setdescription("");
                        setImage(null);
                        navigate("/MyBlog");
                    },
                    autoClose: 2000 // Toast notification will close after 3 seconds
                });

            }
        } catch (error) {
            console.error(error);
            toast.success("Somthing went wrong try after some time", {
                autoClose: 2000 // Toast notification will close after 3 seconds
            });
            // Handle error, show error message, etc.
        }
    };
    return (
        <Base>
            <Container>
                <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                        <Card className="mt-4">
                            <CardHeader
                                style={{ backgroundColor: "#97D0E1", color: "black" }}
                            >
                                <h5>
                                    <i className="bi bi-file-post"></i>New Post
                                </h5>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitForm}>
                                    {/* Email filed*/}
                                    <FormGroup>
                                        <Label htmlFor="title">Title:</Label>
                                        <Input
                                            type="text"
                                            id="title"
                                            value={title}
                                            onChange={handleTitleChange}
                                        />
                                    </FormGroup>
                                    {/* Password filed*/}
                                    <FormGroup>
                                        <Label htmlFor="description">description:</Label>
                                        <Input
                                            id="description"
                                            type="textarea"
                                            rows="5"
                                            value={description}
                                            onChange={handledescriptionChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="image">Image:</Label>
                                        <Input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </FormGroup>
                                    <Container className="text-center d-flex justify-content-between">
                                        <Button className="mb-4 w-50 gradient-custom-2 me-2">
                                            Post
                                        </Button>
                                        <Button className="mb-4 w-50 gradient-custom-2">
                                            Reset
                                        </Button>
                                        <ToastContainer />
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default CreateBlog;
