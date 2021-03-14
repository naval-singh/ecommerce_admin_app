import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signout } from "../../actions";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleSignout = () => {
        dispatch(signout())
    }

    const renderLoggedInMenu = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={handleSignout} style={{ cursor: "pointer" }}>
                        Signout
                    </span>
                </li>
            </Nav>
        );
    };

    const renderNonLoggedInMenu = () => {
        return (
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
        );
    };

    return (
        <Navbar collapseOnSelect fixed='top' expand="lg" bg="dark" variant="dark" style={{zIndex: 1}}>
            <Container fluid>
                <Link to="/" className="navbar-brand">
                    Admin Dashboard
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
