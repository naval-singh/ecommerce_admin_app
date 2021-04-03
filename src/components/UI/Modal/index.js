import { Modal, Button, Row, Col } from "react-bootstrap";
import React from "react";
import './style.css';

/**
 * @author
 * @function MyModal
 **/

const MyModal = (props) => {
    const { children, size, show, onHide, title, onClick, buttons } = props;
    return (
        <Modal size={size ? size : "md"} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            {onClick || buttons ? (
                <Modal.Footer style={{ display: "" }}>
                        {buttons && buttons.length > 0 ? (
                            buttons.map((item, index) => (
                                    <Button variant={item.variant} style={{padding: '3px 15px'}} size="sm" onClick={item.onClick}>
                                        {item.label}
                                    </Button>
                            ))
                        ) : (
                                <Button style={{background: '#343a40', padding: '3px 15px'}} size="sm" onClick={onClick}>
                                    Save
                                </Button>
                        )}
                </Modal.Footer>
            ) : null}
        </Modal>
    );
};

export default MyModal;
