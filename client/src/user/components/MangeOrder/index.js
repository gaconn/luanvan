import { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import { useSearchParams } from "react-router-dom"
import orderAPI from "../../services/API/orderAPI"
import { StatusOrder, toTimeString } from "../../services/utils/GenerateUtil"
import { Button } from "react-bootstrap"
import Loading from "../Loading"
import orderExchangeAPI from "../../services/API/orderExchangeAPI"
import { Modal, ToastContainer, Toast } from "react-bootstrap"
const ManageOrder = () => {
    const [order, setOrder] = useState([])
    const [orderDetail, setOrderDetail] = useState([])
    const [loading, setLoading] = useState(false)
    const [Show, setShow] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [notify, setNotify] = useState({ show: false, message: "", success: false })
    const [modal, setModal] = useState({ show: false })

    const fetchdataOrder = async () => {
        const id = searchParams.get("id")
        const objCondition = {}
        objCondition.IDTaiKhoan = id
        const response = await orderAPI.getAll(objCondition)
        setNotify((noti) => {
            if (!response || !response.success) {
                return { show: true, message: response.message, success: response.success }
            }
            return noti
        })
        setOrder((order) => {
            if (response && response.success && response.data) {
                return response.data[0]
            }
            return order
        })
    }
    const onControlClick = (e, status) => {
        setModal({ ...modal, show: true, TrangThai: status })
    }
    const handleChangeAlertClose = () => {
        setModal({ ...modal, show: false })
    }
    const handleChangeAccept = async () => {
        setModal({ ...modal, show: false }) //ẩn dialog

        if (modal.TrangThai < orderDetail.TrangThai) {
            console.log("fail")
            return
        }

        const response = await orderAPI.changeStatus({
            id: orderDetail.IDDonhang,
            TrangThai: modal.TrangThai,
        })
        console.log(response)
        setNotify((notify) => {
            if (response) {
                return { show: true, message: response.message, success: response.success }
            }
            return notify
        })
        fetchdataOrder()
    }
    const handleShow = async (id) => {
        setLoading(true)
        setShow(true)
        const responseDetail = await orderAPI.getDetail({ IDDonHang: id })
        setOrderDetail((orderDetail) => {
            if (responseDetail && responseDetail.success) {
                return responseDetail.data
            }
            return orderDetail
        })
        setLoading(false)
    }
    useEffect(() => {
        fetchdataOrder()
    }, [])
    if (loading) {
        return <Loading />
    }
    return (
        <>
            {!Show ? (
                <section className="w-2/3 mx-auto">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <div className="font-semibold text-gray-800">Quản lý đơn hàng</div>
                    </header>
                    <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>Mã Đơn Hàng</th>
                                <th>Thời gian đặt hàng</th>
                                <th>Giá trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order &&
                                order.map &&
                                order.map((item, k) => (
                                    <tr key={k}>
                                        <td>{item.id}</td>
                                        <td>{toTimeString(item.ThoiGianTao * 1000)}</td>
                                        <td colSpan={2}>
                                            {item.TongGiaTriDonHang.toLocaleString("en-US")}
                                            VND
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <i
                                                className="fa fa-eye"
                                                aria-hidden="true"
                                                onClick={() => {
                                                    handleShow(item.id)
                                                }}
                                                style={{ color: "blue" }}
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </section>
            ) : (
                <section className="w-2/3 mx-auto">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <div className="font-semibold text-gray-800">Quản lý đơn hàng</div>
                    </header>

                    <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá </th>
                                <th>Phí vận chuyển</th>
                                <th>Tổng cộng</th>
                                <th>Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetail &&
                                orderDetail.List.map &&
                                orderDetail.List.map((item, k) => (
                                    <tr key={k}>
                                        <td>{k + 1}</td>
                                        <td>{item.id}</td>
                                        <td>
                                            {" "}
                                            <img
                                                src={
                                                    item.SanPham_HinhAnh &&
                                                    JSON.parse(item.SanPham_HinhAnh) &&
                                                    `${
                                                        process.env.REACT_APP_API_HOST_URL
                                                    }/public/images/${
                                                        JSON.parse(item.SanPham_HinhAnh)[0]
                                                    }`
                                                }
                                                alt="hình ảnh"
                                            />
                                        </td>
                                        <td>{item.SanPham_Ten}</td>
                                        <td>{item.SoLuong}</td>
                                        <td>
                                            {" "}
                                            {item.SanPham_GiaGoc &&
                                                item.SanPham_GiaGoc.toLocaleString("en-US")}{" "}
                                            VND
                                        </td>
                                        <td>
                                            {" "}
                                            {item.PhiVanChuyen &&
                                                item.PhiVanChuyen.toLocaleString("en-US")}{" "}
                                            VND
                                        </td>
                                        <td>
                                            {item.ThanhTien &&
                                                item.ThanhTien.toLocaleString("en-US")}{" "}
                                            VND
                                        </td>
                                        <td>{StatusOrder[orderDetail.TrangThai]}</td>
                                        {!modal && 
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={(e) => onControlClick(e, 6)}
                                            >
                                                Hủy đơn hàng
                                            </Button>
                                        </td>}
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
               
                        <Button variant="primary" onClick={() => setShow(false)}>
                            Trở lại quản lý đơn hàng
                        </Button>
            
                </section>
            )}
            <Modal
                show={modal.show}
                onHide={handleChangeAlertClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sau khi thay đổi trạng thái bạn sẽ không thể quay lại trạng thái trước. Bạn có
                    chắc chắn muốn thay đổi không ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleChangeAlertClose}>
                        Quay lại
                    </Button>
                    <Button variant="danger" onClick={handleChangeAccept}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ManageOrder
