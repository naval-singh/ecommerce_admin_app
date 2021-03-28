import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory, getAllCategory, updateCategories } from "../../actions";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
    FaPen,
    FaPlus,
    FaTrashAlt,
    FaRegSquare,
    FaFolder,
    FaChevronDown,
    FaChevronRight,
    FaFolderOpen,
    FaRegCheckSquare,
} from "react-icons/fa";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

/**
 * @author
 * @function CategoryPage
 **/

const CategoryPage = (props) => {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showUpdateCategory, setShowUpdateCategory] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryParentId, setCategoryParentId] = useState("");
    const [categoryPicture, setCategoryPicture] = useState("");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArrary] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);

    const handleOpenAddCategory = () => setShowAddCategory(true);
    const handleCloseAddCategory = () => setShowAddCategory(false);
    const handleCloseUpdateCategory = () => setShowUpdateCategory(false);

    const handleOpenUpdateCategory = () => {
        const categories = linearCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 &&
            checked.map((categoryId) => {
                const category = categories.find((category) => categoryId === category.value);
                category && checkedArray.push(category);
            });
        expanded.length > 0 &&
            expanded.map((categoryId) => {
                const category = categories.find((category) => categoryId === category.value);
                category && expandedArray.push(category);
            });
        setCheckedArrary(checkedArray);
        setExpandedArray(expandedArray);
        console.log({ expanded, checked, categories, checkedArray, expandedArray });
        setShowUpdateCategory(true);
    };

    const handleUpdateCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item
            );
            setCheckedArrary(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item
            );
            setExpandedArray(updatedExpandedArray);
        }
    };

    const renderUpdateCategoryModal = () => {
        return (
            <Modal
                size={"lg"}
                show={showUpdateCategory}
                onHide={handleCloseUpdateCategory}
                title={"Update Categories"}
                onClick={handleSubmitUpdateCategory}
            >
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
                                    onChange={(e) =>
                                        handleUpdateCategoryInput("name", e.target.value, index, "expanded")
                                    }
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
                                    {linearCategoryList(category.categories).map((item) => (
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
                                    onChange={(e) =>
                                        handleUpdateCategoryInput("name", e.target.value, index, "checked")
                                    }
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
                                    {linearCategoryList(category.categories).map((item) => (
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

    const handleSubmitUpdateCategory = () => {
        if (checkedArray.length > 0 || expandedArray.length > 0) {
            const form = new FormData();
            expandedArray.map((item, index) => {
                form.append("_id", item.value);
                form.append("name", item.name);
                form.append("type", item.type ? item.type : "");
                form.append("parentId", item.parentId ? item.parentId : "");
            });
            checkedArray.map((item, index) => {
                form.append("_id", item.value);
                form.append("name", item.name);
                form.append("type", item.type ? item.type : "");
                form.append("parentId", item.parentId ? item.parentId : "");
            });
            dispatch(updateCategories(form)).then((result) => {
                if (result) {
                    dispatch(getAllCategory());
                }
            });
        }
        handleCloseUpdateCategory();
    };

    const renderAddCategoryModal = () => {
        return (
            <Modal
                show={showAddCategory}
                onHide={handleCloseAddCategory}
                title={"Add New Category"}
                onClick={handleSubmitAddCategory}
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

    const handleSubmitAddCategory = () => {
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
        handleCloseAddCategory();
    };

    const renderCategories = (categories) => {
        const myCategories = [];
        for (let cate of categories) {
            myCategories.push({
                label: cate.name,
                value: cate._id,
                children: cate.children.length > 0 && renderCategories(cate.children),
            });
        }
        return myCategories;
    };

    const linearCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId });
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
                            <div>
                                <button onClick={handleOpenAddCategory}>
                                    <FaPlus />
                                </button>
                                <button onClick={handleOpenUpdateCategory}>
                                    <FaPen />
                                </button>
                                <button onClick={() => {}}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => setChecked(checked)}
                            onExpand={(expanded) => setExpanded(expanded)}
                            icons={{
                                check: <FaRegCheckSquare />,
                                uncheck: <FaRegSquare />,
                                halfCheck: <FaRegSquare />,
                                expandClose: <FaChevronRight />,
                                expandOpen: <FaChevronDown />,
                                parentClose: <FaFolder />,
                                parentOpen: <FaFolderOpen />,
                                leaf: <FaFolder />,
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            {renderAddCategoryModal()}
            {renderUpdateCategoryModal()}
        </Layout>
    );
};

export default CategoryPage;
