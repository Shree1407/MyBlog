import React, { useState } from 'react';
import { ID, POSTAPIURL } from '../../ConfigFile';
function PostForm() {
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [image, setImage] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handledescriptionChange = (e) => {
        setdescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const AuthorId = ID; // sessionStorage.getItem("ID") == null ? 1 : sessionStorage.getItem("ID");
        try {
            //const formData = new FormData();
            //formData.append('title', title);
            //formData.append('description', description);
            //formData.append('image', image);
            //formData.append('authorId', AuthorId);

            const response = await fetch(POSTAPIURL, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description,
                    AuthorId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create blog post.');
            }

            // Clear the form
            setTitle('');
            setdescription('');
            setImage(null);
        } catch (error) {
            console.error(error);
            alert("Somthing went wrong try after some time")
            // Handle error, show error message, etc.
        }
    };

    return (
        <div className="container">
            <h2>Create a Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        rows="5"
                        value={description}
                        onChange={handledescriptionChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input
                        type="file"
                        id="image"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
            </form>
        </div>
    );
}

export default PostForm;