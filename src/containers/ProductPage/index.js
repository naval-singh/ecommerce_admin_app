import React, { useState } from "react";
import Layout from "../../components/Layout";
import Modal from "../../components/UI/Modal";
import { FaPlus } from "react-icons/fa";
import { Col, Container, Row, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../actions";
import "./style.css";
import { generatePublicURL } from "../../urlConfig";
import { linearCategories } from "../../helpers/linearCategories";

/**
 * @author
 * @function ProductPage
 **/

const ProductPage = (props) => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showDisplayProduct, setShowDisplayProduct] = useState(false);
    const [productDetails, setProductDetails] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [listPrice, setListPrice] = useState('');
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
    };

    const handleOpenAddProduct = () => setShowAddProduct(true);
    const handleCloseAddProduct = () => setShowAddProduct(false);
    const handleOpenDisplayProduct = (product) => (setProductDetails(product), setShowDisplayProduct(true));
    const handleCloseDisplayProduct = () => setShowDisplayProduct(false);

    const renderDisplayProductModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <Modal size={"lg"} show={showDisplayProduct} onHide={handleCloseDisplayProduct} title={"Product Details"}>
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">&#8377;{productDetails.price} (&#8377;{productDetails.listPrice})</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Images</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map((pic) => (
                                <div className="imageContainer">
                                    <img src={generatePublicURL(pic)} />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    };

    const renderAddProductModal = () => {
        return (
            <Modal
                size={"lg"}
                show={showAddProduct}
                onHide={handleCloseAddProduct}
                title={"Add New Product"}
                onClick={handleSubmitAddProduct}
            >
                <Row>
                    <Col>
                        <Input
                            type={"text"}
                            value={productName}
                            placeholder={"Product name"}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} style={{ paddingRight: 7 }}>
                        <Input
                            type={"number"}
                            value={price}
                            placeholder={"Price"}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                    <Col md={6} style={{ paddingLeft: 7 }}>
                        <Input
                            type={"number"}
                            value={listPrice}
                            placeholder={"Cost Price"}
                            onChange={(e) => setListPrice(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} style={{ paddingRight: 7 }}>
                        <Input
                            type={"number"}
                            value={quantity}
                            placeholder={"Quantity"}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Col>
                    <Col md={6} style={{ paddingLeft: 7 }}>
                        <select
                            className="form-control"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value={""}>Select category</option>
                            {linearCategories(category.categories).map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type={"text"}
                            value={description}
                            placeholder={"Description"}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Row>
                {productPictures.length > 0 ? (
                    <Row>
                        <Col>
                            <textarea
                                readOnly
                                className="form-control mb-3"
                                value={productPictures.map((pic) => {
                                    return ` ${pic.name}`;
                                })}
                            ></textarea>
                        </Col>
                    </Row>
                ) : (
                    <span></span>
                )}
                <Row>
                    <Col>
                        <Col clasName="custom-file">
                            <input
                                className="custom-file-input"
                                type="file"
                                id="product"
                                onChange={handleProductPictures}
                            />
                            <label className="custom-file-label" for="product">
                                Choose product pictures
                            </label>
                        </Col>
                    </Col>
                </Row>
            </Modal>
        );
    };

    const handleSubmitAddProduct = () => {
        if (productName !== "") {
            const form = new FormData();
            form.append("name", productName);
            form.append("price", price);
            form.append('listPrice', parseInt(price+100))
            form.append("quantity", quantity);
            form.append("description", description);
            form.append("category", categoryId);
            productPictures.map((pic) => form.append("productPicture", pic));
            dispatch(addNewProduct(form)).then(() => {
                setProductName("");
                setPrice("");
                setQuantity("");
                setDescription("");
                setCategoryId("");
                setProductPictures([]);
            });
        }
        handleCloseAddProduct();
    };

    const renderAllProducts = () => {
        return (
            <Table hover responsive="sm" className="mt-3">
                <thead style={{ background: "#343a40", color: "#fff", fontSize: 16 }}>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Sell Price</th>
                        <th>List Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0
                        ? product.products.map((product, index) => (
                              <tr
                                  onClick={() => handleOpenDisplayProduct(product)}
                                  key={product._id}
                                  style={{ cursor: "pointer" }}
                              >
                                  <td>{index + 1}</td>
                                  <td>{product.name}</td>
                                  <td>&#8377;&nbsp;{product.price}</td>
                                  <td>&#8377;&nbsp;{product.listPrice}</td>
                                  <td>{product.quantity}</td>
                                  <td>{product.category.name}</td>
                                  <td>{`${product.createdBy.firstName} ${product.createdBy.lastName}`}</td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </Table>
        );
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="pageHeading">
                            <h3>Products</h3>
                            <button onClick={handleOpenAddProduct}>
                                <FaPlus />
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>{renderAllProducts()}</Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderDisplayProductModal()}
        </Layout>
    );
};

export default ProductPage;
