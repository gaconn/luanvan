import { useEffect, useState } from "react"
import { Button, Form, Row, Toast, ToastContainer } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import orderAPI from "../../../services/API/orderAPI"
import orderExchangeAPI from "../../../services/API/orderExchangeAPI"
import { StatusOrder } from "../../../services/utils/General"
import { Container, Content } from "./ThemDanhSachDoiTra.style"

const ThemDanhSachDoiTra = () => {
    const [validated, setValidated] = useState(false)
    const [orderExchange, setOrderExchange] = useState({ Ten: "" })
    const [notify, setNotify] = useState({ show: false, message: "" })
    const [orderDetail, setOrderDetail] = useState()
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        var isValid = true
        if (form.checkValidity() === false) {
            isValid = false
        }
        setValidated(true)

        if (!isValid) return

        const response = await orderExchangeAPI.insert(orderExchange)

        setNotify(() => {
            if (!response) {
                return { ...notify }
            }
            return { ...notify, show: true, message: response.message, success: response.success }
        })
        fetchDetail()
    }

    const onChangeInput = (e) => {
        setOrderExchange((orderExchange) => {
            return { ...orderExchange, [e.target.name]: e.target.value }
        })
    }

    const onChangeIDInput = async (e) => {
        setSearchParams({ IDDonHang: e.target.value })
        setOrderExchange((orderExchange) => {
            return { ...orderExchange, [e.target.name]: e.target.value }
        })
    }
    //detail order
    const fetchDetail = async () => {
        var response
        if (searchParams.get("IDDonHang")) {
            response = await orderAPI.getDetail({ IDDonHang: searchParams.get("IDDonHang") })
        }

        setOrderDetail((od) => {
            if (response && response.success && response.data) {
                return response.data
            }
            return { IDDonHang: 0 }
        })
    }
    useEffect(() => {
        fetchDetail()
    }, [searchParams])
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

            <Content>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group controlId="orderExchange-order-id">
                            <Form.Label>ID ????n h??ng</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="ID ????n h??ng"
                                name="IDDonHang"
                                value={orderExchange.IDDonHang}
                                onChange={onChangeIDInput}
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p ID ????n h??ng
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="orderExchange-reason">
                            <Form.Label>L?? do</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="L?? do ?????i tr???"
                                name="LyDo"
                                value={orderExchange.LyDo}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p l?? do ?????i h??ng
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="orderExchange-phuphi">
                            <Form.Label>Ph??? ph??</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="S??? ti???n ph??? ph??"
                                name="PhuPhi"
                                value={orderExchange.PhuPhi}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </Row>
                    <Button type="submit">Th??m m???i</Button>
                </Form>
                {orderDetail && orderDetail.IDDonhang ? (
                    <div className="p-4">
                        <div className="d-flex order-info order-section p-2">
                            <div className="pr-3">
                                <h3>Th??ng tin ?????t h??ng</h3>
                                <div>
                                    <span>H??? t??n: </span>{" "}
                                    {orderDetail.HoTen ? orderDetail.HoTen : ""}
                                </div>
                                <div>
                                    <span>Email: </span>{" "}
                                    {orderDetail.Email
                                        ? orderDetail.Email
                                        : orderDetail.ThongTinDatHang &&
                                          orderDetail.ThongTinDatHang.Email}
                                </div>
                                <div>
                                    <span>S??? ??i???n tho???i: </span>{" "}
                                    {orderDetail.SoDienThoai
                                        ? orderDetail.SoDienThoai
                                        : orderDetail.ThongTinDatHang &&
                                          orderDetail.ThongTinDatHang.SoDienThoai}
                                </div>
                                <div>
                                    <span>?????a ch??? giao h??ng: </span>{" "}
                                    {orderDetail.TinhThanh
                                        ? `${orderDetail.SoNha}, ${orderDetail.PhuongXa}, ${orderDetail.QuanHuyen}, ${orderDetail.TinhThanh}`
                                        : orderDetail.ThongTinDatHang &&
                                          `${orderDetail.ThongTinDatHang.SoNha}, ${orderDetail.ThongTinDatHang.PhuongXa}, ${orderDetail.ThongTinDatHang.QuanHuyen}, ${orderDetail.ThongTinDatHang.TinhThanh}`}
                                </div>
                            </div>
                            <div>
                                <h3>Th??ng tin ????n h??ng</h3>
                                <div>
                                    <span>M?? ????n h??ng: </span> {orderDetail.MaDonHang}
                                </div>
                                <div>
                                    <span>Ng??y ?????t h??ng: </span>{" "}
                                    {new Date(orderDetail.ThoiGianTao * 1000).toLocaleDateString()}
                                </div>
                                <div>
                                    <span>Tr???ng th??i: </span> {StatusOrder[orderDetail.TrangThai]}
                                </div>
                                <div>
                                    <span>H??nh th???c thanh to??n: </span>{" "}
                                    {orderDetail.IDPhuongThucThanhToan === 1
                                        ? "Thanh to??n khi nh???n h??ng"
                                        : "Thanh to??n qua momo"}
                                </div>
                            </div>
                        </div>
                        <div className="order-section p-2 order-bill-list">
                            <div>
                                <h3>Chi ph?? ????n h??ng</h3>
                                <div className="order-bill">
                                    <span>S??? s???n ph???m</span>
                                    <span>
                                        {orderDetail && orderDetail.List && orderDetail.List.length
                                            ? orderDetail.List.length
                                            : 0}
                                    </span>
                                </div>
                                <div className="order-bill">
                                    <span>T???ng ph?? v???n chuy???n</span>
                                    <span>
                                        +{" "}
                                        {orderDetail.TongPhiVanChuyen
                                            ? orderDetail.TongPhiVanChuyen.toLocaleString("en-US")
                                            : 0}{" "}
                                        VND
                                    </span>
                                </div>
                                <div className="order-bill">
                                    <span>Ph??? ph??</span>
                                    <span>
                                        +{" "}
                                        {orderDetail.PhuPhi
                                            ? orderDetail.PhuPhi.toLocaleString("en-US")
                                            : 0}{" "}
                                        VND
                                    </span>
                                </div>
                                <div className="order-bill">
                                    <span>T???ng gi?? tr??? chi???t kh???u</span>
                                    <span>
                                        -{" "}
                                        {orderDetail.TongGiaTriChietKhau
                                            ? orderDetail.TongGiaTriChietKhau.toLocaleString(
                                                  "en-US"
                                              )
                                            : 0}{" "}
                                        VND
                                    </span>
                                </div>

                                <div className="order-bill order-total">
                                    <span>T???ng th??nh ti???n</span>
                                    <span>
                                        {orderDetail.TongThanhTien
                                            ? orderDetail.TongThanhTien.toLocaleString("en-US")
                                            : 0}{" "}
                                        VND
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-danger">
                        {orderExchange && orderExchange.IDDonHang ? "Kh??ng t??m th???y ????n h??ng" : ""}
                    </div>
                )}
            </Content>
        </Container>
    )
}

export default ThemDanhSachDoiTra
