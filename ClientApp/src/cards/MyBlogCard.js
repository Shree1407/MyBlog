import React, { useState, memo, useEffect } from "react";
import axios from "axios";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
    CardFooter,
    Input, CardImg,
} from "reactstrap";
import {
    GETCOMMENTSAPIURL,
    POSTCOMMENTSAPIURL,
    BASEPATH,
} from "../components/ConfigFile";
import CommentCard from "./CommentCard";
import BlogCardHeader from "./BlogCardHeader";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LongText from '../components/LongText';
function BlogCard(props) {
    // Variable declaration
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [numcomment, setNumcomments] = useState(props.numComments);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const token = sessionStorage.getItem('MyToken');
    const Authid = sessionStorage.getItem("Userid") == null ? 1 : sessionStorage.getItem("Userid");

    const imagePath = props.imagePath != null && props.imagePath.length > 0 ? BASEPATH + props.imagePath : "";

    // On Like click
    const handleLike = () => {
        //props.onLike(props.blog);
        debounce(props.onLike(props.blog), 2000);
    };
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    //On Delete Click
    const handleDelete = () => {
        //const confirmed = window.confirm(
        //    "Are you sure you want to delete this blog post?"
        //);
        //if (confirmed) {
        //    props.onDelete(props.id);
        //}
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "4px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                            padding: "20px",
                            maxWidth: "400px",
                            margin: "0 auto"
                        }}
                    >
                        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                            Confirm Deletion
                        </h3>
                        <p style={{ marginBottom: "20px" }}>
                            Are you sure you want to delete this blog?
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button
                                style={{
                                    backgroundColor: "#2ecc71",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "8px 16px",
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    // Submit the form data to the server or perform any other actions here
                                    props.onDelete(props.id);
                                    toast.success("Post deleted successfully!", {
                                        autoClose: 3000 // Toast notification will close after 3 seconds
                                    });
                                    onClose();
                                }}
                            >
                                Confirm
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#e74c3c",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "8px 16px",
                                    marginRight: "10px",
                                    cursor: "pointer"
                                }}
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                );
            }
        });
    };

    // Set new comment on typing
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    //useEffect(() => {
    //    fetchComments();
    //}, []);

    //Add Comment
    const handleAddComment = async () => {
        try {
            const formData = new FormData();
            formData.append("PostId", props.id);
            formData.append("AuthorId", Authid);
            formData.append("Text", comment);

            const response = await axios.post(POSTCOMMENTSAPIURL, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            if (response !== null && response !== undefined) {
                const data = await response.data;
                setComments((prevComments) => [data, ...prevComments]);
                setComment("");
                setNumcomments((prevNumComments) => prevNumComments + 1);
            } else {
                console.error("Failed to add comment");
            }
        } catch (error) {
            console.error("Failed to add comment", error);
        }
    };

    // fetchComments on load
    const fetchComments = async () => {
        try {
            const response = await fetch(GETCOMMENTSAPIURL + "/" + props.id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                console.error("Failed to fetch comments");
            }
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    // Added Toggle for on comment click
    const handleToggleCommentInput = () => {
        fetchComments();
        setShowCommentInput(!showCommentInput);
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <Card style={{ border: "1px Solid" }}>
                        <CardHeader style={{ backgroundColor: "#2f8eff", color: "black" }}>
                            <BlogCardHeader props={props} />
                        </CardHeader>
                        {props.imagePath !== null && props.imagePath.length > 0 && (
                            <CardImg alt="Card image cap" style={{ width: "100%", height: 250 }} src={imagePath} />
                            /*<img alt="Card cap" src={imagePath} width="100%" />*/
                        )}
                        <CardBody
                            style={{
                                backgroundColor: "#27C9DF",
                                color: "black",
                                border: "1px Solid",
                            }}
                        >
                            <h6 className="card-title">{props.title}</h6>
                            <LongText content={props.description} limit={100} />
                        </CardBody>
                        <CardFooter style={{ backgroundColor: "#97D0E1", color: "black" }}>
                            <Row>
                                <Col sm="4" onClick={handleToggleCommentInput}>
                                    <i className="bi bi-chat-dots"></i>
                                    <span className="comment-count">{numcomment}</span>
                                    {showCommentInput ? " Comment" : " Comment"}
                                </Col>
                                <Col sm="4" className="text-middle">
                                    <i className="bi bi-heart" onClick={handleLike}></i>
                                    <span className="like-count">{props.numLikes} Likes</span>
                                </Col>
                                <Col sm="4" className="text-middle">
                                    <i className="bi bi-x-circle-fill"></i>{" "}
                                    <span className="comment-count" onClick={handleDelete}>
                                        Delete
                                    </span>
                                </Col>
                            </Row>
                            {showCommentInput && (
                                <>
                                    <Row>
                                        <Col sm="8">
                                            <Input
                                                type="text"
                                                value={comment}
                                                onChange={handleCommentChange}
                                                placeholder="Write a comment..."
                                            />
                                        </Col>
                                        <Col sm="4">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={handleAddComment}
                                            >
                                                Add
                                            </button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {comments.map((comment) => (
                                                <CommentCard key={comment.id} comment={comment} />
                                            ))}
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}

export default memo(BlogCard);
