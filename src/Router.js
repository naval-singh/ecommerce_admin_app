import React from "react";
import { Route } from "react-router";
import { PrivateRoute } from "./components/HOC/PrivateRoute";
import CategoryPage from "./containers/CategoryPage";
import HomePage from "./containers/HomePage";
import Page from "./containers/NewPage";
import OrderPage from "./containers/OrderPage";
import ProductPage from "./containers/ProductPage";
import SigninPage from "./containers/SigninPage";
import SignupPage from "./containers/SignupPage";


/**
 * @author
 * @function Router
 **/

const Router = (props) => {
    return (
        <>
            <PrivateRoute path="/" exact component={HomePage} />
            <PrivateRoute path="/page" component={Page} />
            <PrivateRoute path="/order" component={OrderPage} />
            <PrivateRoute path="/product" component={ProductPage} />
            <PrivateRoute path="/category" component={CategoryPage} />

            <Route path="/signin" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
        </>
    );
};

export default Router;
