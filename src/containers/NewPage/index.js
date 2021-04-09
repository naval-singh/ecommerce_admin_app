import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Input from '../../components/UI/Input';
import Modal from "../../components/UI/Modal";
import { Container, Row, Col,Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { linearCategories } from "../../helpers/linearCategories";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import { createPage, getAllPages } from "../../actions";

/**
 * @author
 * @function Page
 **/

const Page = (props) => {
    const [showCreatePage, setShowCreatePage] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const category = useSelector((state) => state.category);
    const page = useSelector(state => state.page);
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(getAllPages())
    // },[])

    useEffect(() => {
        const list = linearCategories(category.categories);
        const filteredList = list.filter((item) => item.type === "page");
        setCategoryList(filteredList);
    }, [category]);

    const handleOpenCreatePage = () => setShowCreatePage(true);
    const handleCloseCreatePage = () => setShowCreatePage(false);

    const handleBannerImages = (e) => {
        setBanners([
            ...banners,
            e.target.files[0]
        ])
    }

    const handleProductImages = (e) => {
        setProducts([
            ...products,
            e.target.files[0]
        ])
    }

    const handleSubmitCreatePage = () => {
        if(title !== ''){
            const form = new FormData()
            form.append('title', title)
            form.append('description', description)
            form.append('category', categoryId)
            form.append('type', 'page')
            banners.length > 0 && banners.map(banner => {
                form.append('banners', banner)
            })
            products.length > 0 && products.map(product => {
                form.append('products', product)
            })
            dispatch(createPage(form)).then(()=>{
                setTitle('');
                setDescription('');
                setCategoryId('')
                setBanners([])
                setProducts([])
            })
        }
        handleCloseCreatePage()
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={showCreatePage}
                onHide={handleCloseCreatePage}
                title={"Create New Page"}
                onClick={handleSubmitCreatePage}
            >
                <Container>
                    <Row>
                        <Col>
                            <select
                                className="form-control form-group"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">Choose category</option>
                                {categoryList.map((cat) => {
                                    return (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                type="text"
                                placeholder="Page Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Col>
                    </Row>
                    {banners.length > 0 ? (
                        <Row>
                            <Col>
                                <textarea
                                    readOnly
                                    className="form-control form-group"
                                    value={banners.map((pic) => {
                                        return ` ${pic.name}`;
                                    })}
                                ></textarea>
                            </Col>
                        </Row>
                    ) : (
                        <span></span>
                    )}
                    <Row>
                        <Col style={{ paddingBottom: 16 }}>
                            <Col className="custom-file">
                                <input
                                    className="custom-file-input"
                                    type="file"
                                    id="banners"
                                    onChange={handleBannerImages}
                                />
                                <label className="custom-file-label" htmlFor="banners">
                                    Choose banner images
                                </label>
                            </Col>
                        </Col>
                    </Row>
                    {products.length > 0 ? (
                        <Row>
                            <Col>
                                <textarea
                                    readOnly
                                    className="form-control form-group"
                                    value={products.map((pic) => {
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
                            <Col className="custom-file">
                                <input
                                    className="custom-file-input"
                                    type="file"
                                    id="products"
                                    onChange={handleProductImages}
                                />
                                <label className="custom-file-label" htmlFor="products">
                                    Choose product images
                                </label>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        );
    };

    const renderAllPages = () => {
        return (
            <Table hover responsive="sm" className="mt-3">
                <thead style={{ background: "#343a40", color: "#fff", fontSize: 16 }}>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {page.pages.length > 0
                        ? page.pages.map((page, index) => (
                              <tr
                                //   onClick={() => handleOpenDisplayProduct(page)}
                                  key={page._id}
                                  style={{ cursor: "pointer" }}
                              >
                                  <td>{index + 1}</td>
                                  <td>{page.title}</td>
                                  <td>{page.description}</td>
                                  <td>{page.category.name}</td>
                                  <td>{`${page.createdBy.firstName} ${page.createdBy.lastName}`}</td>
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
                            <h3>Pages</h3>
                            <button onClick={handleOpenCreatePage}>
                                <FaPlus />
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderAllPages()}
                    </Col>
                </Row>
            </Container>
            {renderCreatePageModal()}
        </Layout>
    );
};

export default Page;
