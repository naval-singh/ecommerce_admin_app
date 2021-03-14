import React from "react";
import { Form } from "react-bootstrap";

/**
 * @author
 * @function Input
 **/

const Input = (props) => {
    const { label, type, placeholder, errorMessage, value, onChange, isInvalid, messageType } = props;
    return (
        <Form.Group>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control required isInvalid={isInvalid} min={0} type={type} value={value} onChange={onChange} placeholder={placeholder} />
            {errorMessage && <Form.Control.Feedback type={messageType}>
                {errorMessage}
            </Form.Control.Feedback>}
        </Form.Group>
    );
};

export default Input;
