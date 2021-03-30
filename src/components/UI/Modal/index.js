import { Modal, Button, Row, Col } from "react-bootstrap";
import React from "react";

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
                <Modal.Footer style={{ display: "block" }}>
                    <Row>
                        {buttons && buttons.length > 0 ? (
                            buttons.map((item, index) => (
                                <Col style={{margin: '0 -10px'}}>
                                    <Button variant={item.variant} size="block" onClick={item.onClick}>
                                        {item.label}
                                    </Button>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <Button variant="danger" size="block" onClick={onClick}>
                                    Save
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Modal.Footer>
            ) : null}
        </Modal>
    );
};

export default MyModal;
