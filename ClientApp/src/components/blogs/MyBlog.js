
import React, { useState, useEffect } from 'react';
import { FETCHMYBLOGSAPIURL } from '../../ConfigFile';
import MyBlogCard from '../Card/MyBlogCard';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MyBlog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const id = sessionStorage.getItem("Userid");
            const response = await fetch(FETCHMYBLOGSAPIURL + "/" + id);
            const data = await response.json();
            console.log(data);

            setBlogs(data);

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1>Blog Page</h1>
            {blogs.map(blog => (
                <div key={blog.id}>
                    <MyBlogCard
                        title={blog.title}
                        description={blog.description}
                        numComments={blog.numComments}
                        numLikes={blog.numLikes}
                        id={blog.id}
                    />
                </div>
            ))}
        </div>
    );
};

export default MyBlog;