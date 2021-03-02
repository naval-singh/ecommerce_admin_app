import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to="/" className="navbar-brand">
                Admin Dashboard
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <li className="nav-item">
                        <NavLink to="/signin" className="nav-link">
                            SignIn
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/signup" className="nav-link">
                            SignUp
                        </NavLink>
                    </li>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
