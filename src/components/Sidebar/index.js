import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MdLabel, MdHome } from "react-icons/md";
import { VscFiles, VscListFlat } from "react-icons/vsc";
import { BiHome } from "react-icons/bi";
import { IoLayersOutline } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";
import "./style.css";

/**
 * @author
 * @function Sidebar
 **/

const Sidebar = (props) => {
    return (
        <Container fluid>
            <Row>
                <Col md={2} className="sidebar">
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                <BiHome className="sideIcons" />
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/category">
                                <VscListFlat className="sideIcons" />
                                Categories
                            </NavLink>{" "}
                        </li>
                        <li>
                            <NavLink to={"/page"}>
                                <VscFiles className="sideIcons" />
                                Page
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/product">
                                <IoLayersOutline className="sideIcons" />
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/order">
                                <FaOpencart className="sideIcons" />
                                Orders
                            </NavLink>{" "}
                        </li>
                    </ul>
                </Col>
                <Col md={10} style={{ marginLeft: "auto", marginTop: 56 }}>
                    {props.children}
                </Col>
            </Row>
        </Container>
    );
};

export default Sidebar;
