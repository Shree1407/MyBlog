import React, { useState, useEffect } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from "reactstrap";

function CustomeNavbar(args) {
    const [isOpen, setIsOpen] = useState(false);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsNavbarFixed(scrollTop > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const toggle = () => setIsOpen(!isOpen);
    const uName = sessionStorage.getItem("name");
    return (
        <div>
            <Navbar
                style={{
                    backgroundColor: "#66858A",
                    color: "Black",
                    position: isNavbarFixed ? "fixed" : "relative",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 999,
                    boxShadow: isNavbarFixed ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                }}
                expand="md"
            >
                <NavbarBrand tag={ReactLink} to="/Blog">
                    <strong style={{ color: "black" }}>MyBlog</strong>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/Blog">
                                <strong style={{ color: "black" }}>Blog</strong>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/MyBlog">
                                <strong style={{ color: "black" }}>Myblog</strong>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/CreateBlog">
                                <strong style={{ color: "black" }}>Create</strong>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/Logout">
                                <strong style={{ color: "black" }}>Logout</strong>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <strong style={{ color: "black" }}>
                            <i className="bi bi-person-circle"> </i>
                            Welcome {uName}
                        </strong>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomeNavbar;
