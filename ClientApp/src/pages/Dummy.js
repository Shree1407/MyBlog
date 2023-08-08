import React, { useState, useEffect } from 'react';
import FormattedDate from "../components/FormattedDate";
import Base from '../components/Base'
import axios from "axios";
import {
    GETCOMMENTSAPIURL,
    POSTCOMMENTSAPIURL,
    BASEPATH,
} from "../components/ConfigFile";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    CardTitle,
    Row,
    CardText,
    Input, CardImg,
} from "reactstrap";
import BlogCardHeader from "../cards/BlogCardHeader";
import LongText from '../components/LongText';
const Dummy = (props) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [numcomment, setNumcomments] = useState(props.numComments);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const token = sessionStorage.getItem('MyToken');
    const Authid = sessionStorage.getItem("Userid") == null ? 1 : sessionStorage.getItem("Userid");
    const imagePath = props.imagePath != null && props.imagePath.length > 0 ? BASEPATH + props.imagePath : "";

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
    const handleLike = () => {
        props.onLike(props.blog);
    };

    useEffect(() => {
        fetchComments();
    }, []);
    // fetchComments on load
    const fetchComments = async () => {
        try {
            const response = await fetch(GETCOMMENTSAPIURL + "/" + 1, {
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
    return (
        <Base>
            <Row className="mt-3">
                <Col sm="7">
                    <Card>
                        <CardHeader style={{ width: "100%", backgroundColor: "#2f8eff", color: "black" }}>
                            <BlogCardHeader props={props} />
                        </CardHeader>

                        <CardImg alt="Card image cap" style={{ width: "100%", height: 250 }} src="https://picsum.photos/318/180" />
                        <CardBody
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                border: "1px Solid",
                                height: 250,
                            }}
                        >
                            <h6 className="card-title">Test Entry</h6>
                            {/*<LongText content="Test Entry" limit={100} />*/}
                            <p className="card-text">Test Entry</p>
                            {/*<p className="card-text">{props.description}</p>*/}
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="5" >
                    <Row className="mt-2" >
                        <Card body>
                            <CardTitle>
                                <Row>
                                    <Col>
                                        <i className="bi bi-chat-dots"></i>{" "}
                                        <span className="comment-count">{numcomment} Comments</span>
                                    </Col>
                                    <Col>
                                        <i className="bi bi-heart" onClick={handleLike}></i>{" "}
                                        <span className="like-count">{props.numLikes} Likes</span>
                                    </Col>
                                </Row>
                            </CardTitle>
                        </Card>
                    </Row>
                    <Row className="mt-2">
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
                    <Row className="mt-2">
                        <Col>
                            {comments.map((comment) => (
                                <Row key={comment.id }>
                                    <Col>
                                        <Card body>
                                            <CardTitle tag="h6">
                                                <Row>
                                                    <Col>
                                                        <i className="bi bi-person-circle" /><span style={{ color: 'black', fontWeight: 'bold' }}>{comment.authorName}   </span>
                                                    </Col>
                                                    <Col>
                                                        <i className="bi bi-clock-history">
                                                            <FormattedDate date={comment.datePublished} />
                                                        </i>
                                                    </Col>
                                                </Row>
                                            </CardTitle>
                                            <CardText>
                                                {comment.text}
                                            </CardText>
                                        </Card>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Base>
    );

}

export default Dummy;
