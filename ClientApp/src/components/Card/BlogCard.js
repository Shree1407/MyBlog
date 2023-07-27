import React, { useState, memo } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ID, LIKESAPIURL } from '../../ConfigFile';
function BlogCard(props) {
    const [likeCount, setLikeCount] = useState(props.numLikes);

    const handleLikeClick = async (PostID) => {
        try {
            const AuthorId = ID;// sessionStorage.getItem("ID") == null ? 1 : sessionStorage.getItem("ID");
            const response = await fetch(LIKESAPIURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        PostID,
                        AuthorId
                    }
                ),
            });

            if (!response.ok) {
                throw new Error('Failed to update like count.');
            }

            setLikeCount(likeCount + 1);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="card" style={{
            padding: '20px',
            backgroundColor: 'rgb(246,246,246)',
            border: 'none',
            margin: '15px',
        }}>
            <div className="card-header">
                Featured
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-sm-6">
                        <i className="bi bi-chat-dots"></i> <span className="comment-count">{props.numComments} Comments</span>
                    </div>
                    <div className="col-sm-6 text-end">
                        <i className="bi bi-heart" onClick={() => handleLikeClick(props.postId)}></i> <span className="like-count">{props.numLikes} Likes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(BlogCard);