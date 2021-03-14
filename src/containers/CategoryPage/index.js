import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { FaPlus } from "react-icons/fa";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from "../../actions";
import Modal from "../../components/UI/Modal";

/**
 * @author
 * @function CategoryPage
 **/

const CategoryPage = (props) => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryParentId, setCategoryParentId] = useState("");
    const [categoryPicture, setCategoryPicture] = useState("");
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const renderAddCategoryModal = () => {
        return (
            <Modal
                show={show}
                onHide={handleClose}
                title={"Add New Category"}
                onClick={handleSubmit}
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
                    {linearCategoryList(category.categories).map((item) => (
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

    const handleSubmit = () => {
        if (categoryName !== "") {
            const form = new FormData();
            form.append("name", categoryName);
            form.append("parentId", categoryParentId);
            form.append("categoryPicture", categoryPicture);
            dispatch(addNewCategory(form)).then(() => {
                setCategoryName("");
                setCategoryParentId("");
                setCategoryPicture("");
            });
        }
        handleClose();
    };

    const renderCategories = (categories) => {
        const myCategories = [];
        for (let cate of categories) {
            myCategories.push(
                <li key={cate.name}>
                    {cate.name}
                    {cate.children.length > 0 ? <ul>{renderCategories(cate.children)}</ul> : null}
                </li>
            );
        }
        return myCategories;
    };

    const linearCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            category.children.length > 0 && linearCategoryList(category.children, options);
        }
        return options;
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="pageHeading">
                            <h3>Category</h3>
                            <button onClick={handleShow}>
                                <FaPlus />
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>{renderCategories(category.categories)}</ul>
                    </Col>
                </Row>
            </Container>
            {renderAddCategoryModal()}
        </Layout>
    );
};

export default CategoryPage;
