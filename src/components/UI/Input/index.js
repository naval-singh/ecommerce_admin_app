import React from "react";
import { Form } from "react-bootstrap";

/**
 * @author
 * @function Input
 **/

const Input = (props) => {
    const { label, type, placeholder, message, value, onChange } = props;
    return (
        <Form.Group>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control type={type} value={value} onChange={onChange} placeholder={placeholder} />
            <Form.Text className="text-muted">{message}</Form.Text>
        </Form.Group>
    );
};

export default Input;
