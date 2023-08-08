import React, { useState, useEffect } from "react";
import { Row, Col, Pagination, PaginationItem, PaginationLink, CardGroup } from "reactstrap";
import axios from "axios";
import { FETCHBLOGSAPIURL, LIKESAPIURL } from "../components/ConfigFile";
import BlogCard from "../cards/BlogCard";
import Base from "../components/Base";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BlogPage = () => {
    // Valriable declaration
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 6; // Example value
    const token = sessionStorage.getItem('MyToken');
    //fetch All Blogs
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(FETCHBLOGSAPIURL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error(error);
        }
    };
    // Pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const startIndex = currentPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const displayedPosts = blogs.slice(startIndex, endIndex);
    const pageCount = Math.ceil(blogs.length / postsPerPage);
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    //Like Click
    const handleLike = async (blog) => {
        const updatedBlogs = blogs.map(async (item) => {
            if (item.id === blog.id) {
                try {
                    const AuthorId =
                        sessionStorage.getItem("Userid") == null
                            ? 1
                            : sessionStorage.getItem("Userid");
                    const PostID = item.id;
                    const formData = new FormData();
                    formData.append("PostID", PostID);
                    formData.append("AuthorId", AuthorId);
                    const response = await axios.post(LIKESAPIURL, formData, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                    });
                    if (response.status === 200) {
                        return { ...item, numLikes: item.numLikes + 1 };
                    } else {
                        return item;
                    }
                } catch (error) {
                    console.error(error);
                    return item;
                }
            }
            return item;
        });
        const updatedBlogsData = await Promise.all(updatedBlogs);
        setBlogs(updatedBlogsData);
    };

    //Blog JSX
    return (
        <Base>
            <Row>
                {displayedPosts.map((blog) => (
                    <Col sm="4" key={blog.id}>
                        <BlogCard
                            title={blog.title}
                            description={blog.description}
                            numComments={blog.numComments}
                            numLikes={blog.numLikes}
                            id={blog.id}
                            imagePath={blog.imagePath}
                            authorName={blog.authorName}
                            datePublished={blog.datePublished}
                            blog={blog}
                            onLike={handleLike}
                        />
                    </Col>
                ))}

            </Row>
            <div style={paginationContainerStyle}>
                <Pagination>
                    {/* Previous page arrow */}
                    <PaginationItem disabled={currentPage === 0}>
                        <PaginationLink previous onClick={handlePrevPage} />
                    </PaginationItem>

                    {/* Page numbers */}
                    {Array.from({ length: pageCount }, (_, index) => (
                        <PaginationItem key={index} active={index === currentPage}>
                            <PaginationLink
                                onClick={() => handlePageChange(index)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Next page arrow */}
                    <PaginationItem disabled={currentPage === pageCount - 1}>
                        <PaginationLink next onClick={handleNextPage} />
                    </PaginationItem>
                </Pagination>
            </div>
        </Base>
    );
};

export default BlogPage;

const paginationContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
};