import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
    return (
        <>
            <Header />
            {props.sidebar ? <Sidebar>{props.children}</Sidebar> : props.children}
        </>
    );
};

export default Layout;
