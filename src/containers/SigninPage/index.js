import Layout from "../../components/Layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions";
import { Redirect } from "react-router";
import "../style.css";

/**
 * @author
 * @function SigninPage
 **/

const SigninPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const color = {
        color: "red",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        dispatch(signin(user));
    };

    if (auth.authenticate) {
        return <Redirect to="/" />;
    }

    return (
        <Layout>
            <Container>
                <Row className="mt-4 pt-5">
                    <Col md={{ span: 6, offset: 3 }}>
                        {auth.message && (
                            <h6 className="text-center mb-3" style={color}>
                                {auth.message}
                            </h6>
                        )}
                        <div
                            style={{
                                borderRadius: 5,
                                padding: "15px 25px",
                                boxShadow: "0 0 5px 1px #ddd",
                            }}
                        >
                            <h2
                                style={{
                                    borderBottom: "3px solid #007bff",
                                    paddingBottom: 3,
                                    marginBottom: 20,
                                }}
                            >
                                Sign In
                            </h2>
                            <Form onSubmit={handleSubmit}>
                                <Input
                                    type="text"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant="primary" type="submit" className="btn btn-block">
                                    Signin
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default SigninPage;
