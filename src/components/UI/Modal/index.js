import { Modal, Button } from "react-bootstrap";
import React from "react";

/**
 * @author
 * @function MyModal
 **/

const MyModal = (props) => {
    const { children, size, show, onHide, title, onClick } = props;
    return (
        <Modal size={size ? size : "md"} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            {onClick && (
                <Modal.Footer>
                    <Button variant="danger" size="block" onClick={onClick}>
                        Save
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default MyModal;
