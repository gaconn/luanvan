import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button, Col, Form, Modal, Row, Table, Toast, ToastContainer } from "react-bootstrap"
import { AiOutlineFileSearch } from "react-icons/ai"
import { FaShippingFast } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import FilterContainer from "../../../components/FilterContainer"
import Loading from "../../../components/Loading"
import Page from "../../../components/Page"
import { LinkOrderAction, LinkProductAction } from "../../../configs/define"
import orderAPI from "../../../services/API/orderAPI"
import productAPI from "../../../services/API/productAPI"
import { colorTextStatus, StatusOrder, toTimeString } from "../../../services/utils/General"
import { Container, Content } from "./DanhSachSanPhamTrongKho.style"

const DanhSachSanPhamTrongKho = () => {
    const [order, setOrder] = useState([])
    const [notify, setNotify] = useState({ show: false, message: "", success: false })
    const [page, setPage] = useState({ rowCount: 0, now: 1, next: null, prev: null })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ show: false })
    let navigate = useNavigate()
    const fetchOrder = async () => {
        setLoading(true)
        const orderResponse = await orderAPI.getAll({ page: page.now, TrangThai: 1 })
        console.log(orderResponse)
        setOrder(() => {
            if (
                orderResponse &&
                orderResponse.success &&
                orderResponse.data &&
                orderResponse.data[0]
            ) {
                return orderResponse.data[0]
            }
            return []
        })
        setNotify((notify) => {
            if (!orderResponse.success) {
                return {
                    show: true,
                    message: orderResponse.message,
                    success: orderResponse.success,
                }
            }
            return notify
        })
        setPage((page) => {
            if (orderResponse.success && orderResponse.data && orderResponse.data[1]) {
                if (orderResponse.data[1].rowCount) {
                    let next = page.now * 10 < orderResponse.data[1].rowCount ? page.now + 1 : null
                    let prev = page.now > 1 ? page.now - 1 : null
                    return { ...page, rowCount: orderResponse.data[1].rowCount, next, prev }
                }
            }
            return { ...page }
        })
        setLoading(false)
    }
    useEffect(() => {
        fetchOrder()
    }, [page.now])
    const onClickPageHandler = (e) => {
        const pageValue = e.target.innerText * 1
        const nextPage = pageValue * 10 < page.rowCount ? pageValue + 1 : null
        const prevPage = pageValue > 1 ? pageValue - 1 : null
        setPage({ ...page, now: pageValue, prev: prevPage, next: nextPage })
    }

    const handleChangeStatus = async () => {
        const updateResponse = await orderAPI.changeStatus({
            id: message.id,
            TrangThai: message.TrangThai * 1 + 1,
        })
        setNotify(() => {
            if (!updateResponse) {
                return { show: true, message: "k???t n???i server th???t b???i", success: false }
            }
            return { show: true, message: updateResponse.message, success: updateResponse.success }
        })
        setMessage({ show: false })
        fetchOrder()
    }
    const handleMessageClose = () => {
        setMessage({ show: false })
    }

    if (loading) {
        return <Loading />
    }
    return (
        <Container>
            <ToastContainer position="top-end" className="p-3">
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
                                    ID Nh?? cung c???p
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
                                    T??n cung c???p
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
                                <Form.Label column="lg" lg={4} className="fs-6"></Form.Label>
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
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Th??ng tin ?????t h??ng</th>
                            <th>Tr???ng th??i</th>
                            <th>Th???i gian ?????t h??ng</th>
                            <th>Gi?? tr??? ????n h??ng</th>
                            <th>Khuy???n m??i</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {order &&
                            order.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            <span>
                                                {item.ThongTinDatHang && item.ThongTinDatHang.Email
                                                    ? item.ThongTinDatHang.Email
                                                    : item.TaiKhoan_Email}
                                            </span>{" "}
                                            <br />
                                            <span>
                                                {item.ThongTinDatHang &&
                                                item.ThongTinDatHang.SoDienThoai
                                                    ? item.ThongTinDatHang.SoDienThoai
                                                    : item.TaiKhoan_SoDienThoai}
                                            </span>
                                        </td>
                                        <td className={`text-${colorTextStatus[item.TrangThai]}`}>
                                            {StatusOrder[item.TrangThai]}
                                        </td>
                                        <td>{toTimeString(item.ThoiGianTao * 1000)}</td>
                                        <td>{item.TongGiaTriDonHang}</td>
                                        <td style={{ color: "red" }}>
                                            {item.MaChietKhau ? item.MaChietKhau : "Kh??ng"}
                                        </td>
                                        <td className="d-flex" style={{ height: "100%" }}>
                                            <span
                                                className="order-item-icon"
                                                onClick={() =>
                                                    navigate(
                                                        `${LinkOrderAction.order_detail}?id=${item.id}`
                                                    )
                                                }
                                            >
                                                <AiOutlineFileSearch />
                                            </span>
                                            {item.TrangThai === 1 && (
                                                <span
                                                    className="order-item-icon"
                                                    onClick={() =>
                                                        setMessage({
                                                            show: true,
                                                            id: item.id,
                                                            TrangThai: item.TrangThai,
                                                        })
                                                    }
                                                >
                                                    <FaShippingFast />
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </Content>
            {page && <Page page={page} onClickPage={onClickPageHandler} />}
            <Modal
                show={message.show}
                onHide={handleMessageClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Th??ng b??o</Modal.Title>
                </Modal.Header>
                <Modal.Body>X??c nh???n thay ?????i trang th??i ????n h??ng ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleMessageClose}>
                        Quay l???i
                    </Button>
                    <Button variant="danger" onClick={handleChangeStatus}>
                        Ch???p nh???n
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default DanhSachSanPhamTrongKho
