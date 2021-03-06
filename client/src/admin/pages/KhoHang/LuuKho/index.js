import React, { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row, Table, Toast, ToastContainer } from "react-bootstrap"
import { BsPencil } from "react-icons/bs"
import { MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import FilterContainer from "../../../components/FilterContainer"
import Loading from "../../../components/Loading"
import Page from "../../../components/Page"
import { LinkProductAction } from "../../../configs/define"
import productAPI from "../../../services/API/productAPI"
import { Container, Content } from "./LuuKho.style"
const LuuKho = () => {
    const [product, setProduct] = useState([])
    const [notify, setNotify] = useState({ show: false, message: "", success: false })
    const [page, setPage] = useState({ rowCount: 0, now: 1, next: null, prev: null })
    const [del, setDel] = useState({ show: false, id: null })
    const [loading, setLoading] = useState(false)
    const [productAdd, setProductAdd] = useState()
    const [productInfoAdd, setProductInfoAdd] = useState({})
    let navigate = useNavigate()
    const fetchProduct = async () => {
        setLoading(true)
        const productResponse = await productAPI.getAll(page.now)
        setProduct(productResponse.data)
        setNotify((notify) => {
            if (!productResponse.success) {
                return {
                    show: true,
                    message: productResponse.message,
                    success: productResponse.success,
                }
            }
            return notify
        })
        setPage((page) => {
            if (productResponse.success) {
                if (productResponse.data.rowCount) {
                    let next = page.now * 10 < productResponse.data.rowCount ? page.now + 1 : null
                    let prev = page.now > 1 ? page.now - 1 : null
                    return { ...page, rowCount: productResponse.data.rowCount, next, prev }
                }
            }
            return { ...page }
        })
        setLoading(false)
    }
    useEffect(() => {
        fetchProduct()
    }, [page.now])
    const onClickPageHandler = (e) => {
        const pageValue = e.target.innerText * 1
        const nextPage = pageValue * 10 < page.rowCount ? pageValue + 1 : null
        const prevPage = pageValue > 1 ? pageValue - 1 : null
        setPage({ ...page, now: pageValue, prev: prevPage, next: nextPage })
    }
    const handleDeleteAlertClose = () => {
        setDel({ ...del, show: false })
    }
    const handleDeleteAccept = async () => {
        const deleteProductResponse = await productAPI.delete(del.id)
        setDel({ ...del, show: false }) //???n dialog
        setNotify(() => {
            if (!deleteProductResponse || !deleteProductResponse.success) {
                return {
                    ...notify,
                    show: true,
                    message: "C?? l???i x???y ra. Vui l??ng th??? l???i",
                    success: false,
                }
            }
            return {
                ...notify,
                show: true,
                message: deleteProductResponse.message,
                success: deleteProductResponse.success,
                errors: deleteProductResponse.errors,
            }
        })

        setProduct(() => {
            if (deleteProductResponse && deleteProductResponse.success) {
                var tmpProduct = [...product.data]
                tmpProduct = tmpProduct.filter((item) => item.id !== del.id)
                return { data: tmpProduct, rowCount: product.rowCount - 1 }
            }
            return { ...product }
        })
    }
    const onControlClick = (e, id, action) => {
        if (action === "update") {
            navigate(LinkProductAction.product_update + `?id=${id}`, { replace: true })
            return
        }

        setDel({ ...del, show: true, id: id })
    }

    // x??? l?? th??m
    const findProductHandler = async (e) => {
        setProductInfoAdd({ ...productInfoAdd, [e.target.name]: e.target.value })
        const response = await productAPI.detail(e.target.value)
        setProductAdd(() => {
            if (response && response.success && response.data) {
                return response.data
            }
            return null
        })

        setNotify((notify) => {
            if (!response || !response.success) {
                return { show: false, message: response.message, success: response.success }
            }
            return notify
        })
    }
    const productAddSubmitHandler = async (e) => {
        e.preventDefault()
        setNotify((notify) => {
            if (!productInfoAdd || !productInfoAdd.id || !productInfoAdd.SoLuong || !productAdd) {
                return { show: true, message: "Th??ng tin kh??ng h???p l???", success: false }
            }
            return notify
        })
        if (!productInfoAdd || !productInfoAdd.id || !productInfoAdd.SoLuong || !productAdd) {
            return
        }
        console.log(productInfoAdd)
        const response = await productAPI.update({
            id: productInfoAdd.id,
            SoLuong: productInfoAdd.SoLuong / 1 + productAdd.SoLuong / 1,
        })
        setNotify((notify) => {
            if (!response || !response.success) {
                return { show: true, message: response.message, success: response.success }
            }
            return { ...notify, show: true, message: response.message, success: response.success }
        })
        setProductAdd({})
        setProductInfoAdd({})
        fetchProduct()
    }
    const onProductInfoAddChange = (e) => {
        setProductInfoAdd({ ...productInfoAdd, [e.target.name]: e.target.value })
    }
    if (loading) {
        return <Loading />
    }
    return (
        <Container>
            <ToastContainer position="top-end" className="p-3 position-fixed">
                <Toast
                    bg={notify.success ? "success" : "danger"}
                    onClose={() => setNotify({ ...notify, show: false })}
                    show={notify.show}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Th??ng b??o</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{notify.message ? notify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>
            <FilterContainer>
                <Form className="filter-form">
                    <Row className="mb-3">
                        <Col>
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    ID S???n ph???m
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Large text"
                                        className="fs-6"
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    T??n s???n ph???m
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Large text"
                                        className="fs-6"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    Tr???ng th??i
                                </Form.Label>
                                <Col>
                                    <Form.Select aria-label="Default select example">
                                        <option>Ch???n tr???ng th??i</option>
                                        <option value="0">Ho???t ?????ng</option>
                                        <option value="1">Ng??ng ho???t ?????ng</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </FilterContainer>
            <Content>
                <Form className="filter-form" onSubmit={productAddSubmitHandler}>
                    <Row className="mb-3" style={{ width: "100%" }}>
                        <Col>
                            <Row>
                                <Form.Label column="lg" lg={2} className="fs-6">
                                    ID S???n ph???m
                                </Form.Label>
                                <Col lg={4}>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        name="id"
                                        value={productInfoAdd.id ? productInfoAdd.id : ""}
                                        placeholder="ID s???n ph???m"
                                        className="fs-6"
                                        onChange={findProductHandler}
                                    />
                                </Col>
                                <Col
                                    className={
                                        productAdd && productAdd.SoLuong
                                            ? "text-success"
                                            : "text-danger"
                                    }
                                >
                                    {productAdd && Object.keys(productAdd).length > 0
                                        ? `T??n s???n ph???m: ${productAdd.Ten} - T???n kho: ${productAdd.SoLuong}`
                                        : "Kh??ng t??m th???y "}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ width: "100%" }}>
                        <Col>
                            <Row>
                                <Form.Label column="lg" lg={2} className="fs-6">
                                    S??? l?????ng
                                </Form.Label>
                                <Col lg={4}>
                                    <Form.Control
                                        size="lg"
                                        type="number"
                                        name="SoLuong"
                                        value={productInfoAdd.SoLuong ? productInfoAdd.SoLuong : ""}
                                        placeholder="S??? l?????ng s???n ph???m"
                                        className="fs-6"
                                        min={1}
                                        onChange={onProductInfoAddChange}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ width: "100%" }}>
                        <Col className="text-center m-4">
                            <Button type="submit">Th??m</Button>
                        </Col>
                    </Row>
                </Form>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>T??n</th>
                            <th>H??nh</th>
                            <th>Tr???ng th??i</th>
                            <th>S??? l?????ng s???n ph???m</th>
                            <th>Nh?? cung c???p</th>
                            <th>Th??? lo???i</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product &&
                            product.data &&
                            product.data.map &&
                            product.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.Ten}</td>
                                        <td>
                                            {item.HinhAnh && JSON.parse(item.HinhAnh) && (
                                                <img
                                                    key={index}
                                                    width="100"
                                                    height={40}
                                                    alt="product_image"
                                                    src={`${
                                                        process.env.REACT_APP_API_HOST_URL
                                                    }/public/images/${JSON.parse(item.HinhAnh)[0]}`}
                                                />
                                            )}
                                        </td>
                                        <td
                                            className={
                                                item.TrangThai === 1
                                                    ? "text-primary"
                                                    : "text-danger"
                                            }
                                        >
                                            {item.TrangThai === 1 ? "Ho???t ?????ng" : "Ng??ng ho???t ?????ng"}
                                        </td>
                                        <td>{item.SoLuong}</td>
                                        <td>{item.NhaCungCap_Ten}</td>
                                        <td>{item.TheLoai_Ten}</td>
                                        <td className="d-flex">
                                            <span
                                                className="product-item-icon"
                                                onClick={(e) =>
                                                    onControlClick(e, item.id, "update")
                                                }
                                            >
                                                <BsPencil />
                                            </span>
                                            <span
                                                className="product-item-icon"
                                                onClick={(e) =>
                                                    onControlClick(e, item.id, "delete")
                                                }
                                            >
                                                <MdDelete />
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </Content>
            {page && <Page page={page} onClickPage={onClickPageHandler} />}
            <Modal
                show={del.show}
                onHide={handleDeleteAlertClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>C???nh b??o</Modal.Title>
                </Modal.Header>
                <Modal.Body>B???n c?? ch???c ch???n mu???n x??a ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteAlertClose}>
                        Quay l???i
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccept}>
                        X??a
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default LuuKho
