import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

/**
 * @author
 * @function AddCategoryModal
 **/

const AddCategoryModal = (props) => {
    const {
        show,
        onHide,
        title,
        onClick,
        categoryName,
        setCategoryName,
        categoryParentId,
        setCategoryParentId,
        categoryList,
        setCategoryPicture
    } = props;
    return (
        <Modal
            show={show}
            onHide={onHide}
            title={title}
            onClick={onClick}
        >
            <Input
                type={"text"}
                value={categoryName}
                placeholder={"Category name"}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <select
                className="form-control mb-3"
                value={categoryParentId}
                onChange={(e) => setCategoryParentId(e.target.value)}
            >
                <option value={""}>Select parent category</option>
                {categoryList.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.name}
                    </option>
                ))}
            </select>
            <Row>
                <Col>
                    <Col clasName="custom-file">
                        <input
                            className="custom-file-input"
                            type="file"
                            id="product"
                            onChange={(e) => setCategoryPicture(e.target.files[0])}
                        />
                        <label className="custom-file-label" for="product">
                            Choose category picture
                        </label>
                    </Col>
                </Col>
            </Row>
        </Modal>
    );
};

export default AddCategoryModal;
