import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

/**
 * @author
 * @function UpdateCategoryModal
 **/

const UpdateCategoryModal = (props) => {
    const {
        size,
        show,
        onHide,
        title,
        onClick,
        checkedArray,
        expandedArray,
        handleUpdateCategoryInput,
        categoryList,
    } = props;
    return (
        <Modal size={size} show={show} onHide={onHide} title={title} onClick={onClick}>
            <Row className="mb-3">
                <Col>
                    <h6 className="font-italic">Expanded Categories &gt;&gt;</h6>
                </Col>
            </Row>
            {expandedArray.length > 0 &&
                expandedArray.map((item, index) => (
                    <Row key={index}>
                        <Col style={{ paddingRight: 7 }}>
                            <Input
                                type={"text"}
                                value={item.name}
                                placeholder={"Category name"}
                                onChange={(e) => handleUpdateCategoryInput("name", e.target.value, index, "expanded")}
                            />
                        </Col>
                        <Col style={{ paddingRight: 7, paddingLeft: 7 }}>
                            <select
                                className="form-control mb-3"
                                value={item.parentId}
                                onChange={(e) =>
                                    handleUpdateCategoryInput("parentId", e.target.value, index, "expanded")
                                }
                            >
                                <option value={""}>Select parent category</option>
                                {categoryList.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col style={{ paddingLeft: 7 }}>
                            <select className="form-control" value={""} onChange={() => {}}>
                                <option value={""}>Select type</option>
                                <option value={"store"}>Store</option>
                                <option value={"product"}>Product</option>
                                <option value={"page"}>Page</option>
                            </select>
                        </Col>
                    </Row>
                ))}
            <Row className="mb-3">
                <Col>
                    <h6 className="font-italic">Checked Categories &gt;&gt;</h6>
                </Col>
            </Row>
            {checkedArray.length > 0 &&
                checkedArray.map((item, index) => (
                    <Row key={index}>
                        <Col style={{ paddingRight: 7 }}>
                            <Input
                                type={"text"}
                                value={item.name}
                                placeholder={"Category name"}
                                onChange={(e) => handleUpdateCategoryInput("name", e.target.value, index, "checked")}
                            />
                        </Col>
                        <Col style={{ paddingRight: 7, paddingLeft: 7 }}>
                            <select
                                className="form-control mb-3"
                                value={item.parentId}
                                onChange={(e) =>
                                    handleUpdateCategoryInput("parentId", e.target.value, index, "checked")
                                }
                            >
                                <option value={""}>Select parent category</option>
                                {categoryList.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col style={{ paddingLeft: 7 }}>
                            <select className="form-control" value={""} onChange={() => {}}>
                                <option value={""}>Select type</option>
                                <option value={"store"}>Store</option>
                                <option value={"product"}>Product</option>
                                <option value={"page"}>Page</option>
                            </select>
                        </Col>
                    </Row>
                ))}
        </Modal>
    );
};

export default UpdateCategoryModal;
