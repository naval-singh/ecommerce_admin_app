import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory, getAllCategory, updateCategories, deleteCategories } from "../../actions";
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
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import "../style.css";

/**
 * @author
 * @function CategoryPage
 **/

const CategoryPage = (props) => {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showUpdateCategory, setShowUpdateCategory] = useState(false);
    const [showDeleteCategory, setShowDeleteCategory] = useState(false);
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
    const handleOpenDeleteCategory = () => (fillCheckedAndExpandedArray(), setShowDeleteCategory(true));
    const handleCloseDeleteCategory = () => setShowDeleteCategory(false);
    const handleOpenUpdateCategory = () => (fillCheckedAndExpandedArray(), setShowUpdateCategory(true));
    const handleCloseUpdateCategory = () => setShowUpdateCategory(false);

    const fillCheckedAndExpandedArray = () => {
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

    const handleSubmitDeleteCategory = () => {
        if (checkedArray.length > 0) {
            const idsArray = checkedArray.map((item) => item.value);
            console.log({ idsArray });
            const payload = { ids: idsArray };
            dispatch(deleteCategories(payload)).then((result) => {
                if (result) {
                    dispatch(getAllCategory());
                }
            });
        }
        handleCloseDeleteCategory();
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
                                <button onClick={handleOpenDeleteCategory}>
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
            <AddCategoryModal
                show={showAddCategory}
                onHide={handleCloseAddCategory}
                title={"Add New Category"}
                onClick={handleSubmitAddCategory}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                categoryParentId={categoryParentId}
                setCategoryParentId={setCategoryParentId}
                categoryList={linearCategoryList(category.categories)}
                setCategoryPicture={setCategoryPicture}
            />
            <UpdateCategoryModal
                size={"lg"}
                show={showUpdateCategory}
                onHide={handleCloseUpdateCategory}
                title={"Update Categories"}
                onClick={handleSubmitUpdateCategory}
                checkedArray={checkedArray}
                expandedArray={expandedArray}
                handleUpdateCategoryInput={handleUpdateCategoryInput}
                categoryList={linearCategoryList(category.categories)}
            />
            <DeleteCategoryModal
                show={showDeleteCategory}
                onHide={handleCloseDeleteCategory}
                title={"Delete categories"}
                checkedArray={checkedArray}
                handleSubmitDeleteCategory={handleSubmitDeleteCategory}
            />
        </Layout>
    );
};

export default CategoryPage;
