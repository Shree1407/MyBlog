import React, { memo, useState, useEffect } from "react";
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
import BlogCardHeader from "./BlogCardHeader";
import CommentCard from "./CommentCard";
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
        props.onLike(props.blog);
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
            if (comment === "") {
                return;
            }
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
                console.log(123);
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

    //Blog Card JSX
    return (
        <Container className="mt-4 g-0">
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
                            {/*<p className="card-text">{props.description}</p>*/}
                        </CardBody>
                        <CardFooter style={{ backgroundColor: "#97D0E1", color: "black" }}>
                            <Row>
                                <Col sm="6" onClick={handleToggleCommentInput}>
                                    <i className="bi bi-chat-dots"></i>{" "}
                                    <span className="comment-count">{numcomment} Comments</span>
                                </Col>
                                <Col sm="6" className="text-end">
                                    <i className="bi bi-heart" onClick={handleLike}></i>{" "}
                                    <span className="like-count">{props.numLikes} Likes</span>
                                </Col>
                            </Row>
                            {showCommentInput && (
                                <>
                                    <Row className="border mb-1" >
                                        <Col sm="10">
                                            <Input
                                                type="text"
                                                value={comment}
                                                onChange={handleCommentChange}
                                                placeholder="Write a comment..."
                                            />
                                        </Col>
                                        <Col sm="2">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={handleAddComment}
                                            >
                                                Add
                                            </button>
                                        </Col>
                                    </Row>

                                    <Row className="border mt-1">
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
        </Container>
    );
}

export default memo(BlogCard);
