import React from "react";
import Modal from "../../../components/UI/Modal";

/**
 * @author
 * @function DeleteCategoryModal
 **/

const DeleteCategoryModal = (props) => {
    const { show, onHide, title, handleSubmitDeleteCategory, checkedArray } = props;
    return (
        <Modal
            show={show}
            onHide={onHide}
            title={title}
            buttons={[
                {
                    label: "No",
                    variant: "info",
                    onClick: onHide,
                },
                {
                    label: "Yes",
                    variant: "danger",
                    onClick: handleSubmitDeleteCategory,
                },
            ]}
        >
            <h5>Categories going to delete....</h5>
            <ul>{checkedArray.length > 0 && checkedArray.map((item, index) => <li key={index}>{item.name}</li>)}</ul>
            <h5>Are you sure ?</h5>
        </Modal>
    );
};

export default DeleteCategoryModal;
