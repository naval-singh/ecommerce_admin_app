import React from "react";
import Layout from "../../components/Layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";

/**
 * @author
 * @function SignupPage
 **/

const SignupPage = (props) => {
    return (
        <Layout>
            <Container>
                <Row className="mt-4">
                    <Col md={{ span: 6, offset: 3 }}>
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
                                Sign Up
                            </h2>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Input type="text" placeholder="first name" />
                                    </Col>
                                    <Col md={6}>
                                        <Input type="text" placeholder="last name" />
                                    </Col>
                                </Row>
                                <Input type="email" placeholder="email" />
                                <Input type="password" placeholder="password" />
                                <Button variant="primary" type="submit" className="btn btn-block">
                                    Signup
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default SignupPage;
