import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signup } from "../../actions";

/**
 * @author
 * @function SignupPage
 **/

const SignupPage = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);

    const color = {
        color: user.message === "Admin registered successfully.." ? "green" : "red",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password,
        };
        !isInvalid &&
            dispatch(signup(user)).then((res) => {
                console.log({ res });
            });
    };

    if (auth.authenticate) {
        return <Redirect to="/" />;
    }

    return (
        <Layout>
            <Container>
                <Row className="mt-4 pt-5">
                    <Col md={{ span: 6, offset: 3 }}>
                        {user.message && (
                            <h6 className="text-center mb-3" style={color}>
                                {user.message}
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
                                Sign Up
                            </h2>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                            type="text"
                                            placeholder="first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            type="text"
                                            placeholder="last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Input
                                    type="email"
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
                                <Input
                                    type="password"
                                    placeholder="confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        e.target.value === password
                                            ? setIsInvalid(false)
                                            : setIsInvalid(true);
                                    }}
                                    isInvalid={isInvalid}
                                    messageType="invalid"
                                    errroMessage="password mismatch"
                                />
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
