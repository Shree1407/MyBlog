
import React, { useState, useEffect } from 'react';
import { FETCHBLOGSAPIURL } from '../../ConfigFile';
import BlogCard from '../Card/BlogCard';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(FETCHBLOGSAPIURL);
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
                    <BlogCard
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

export default BlogPage;