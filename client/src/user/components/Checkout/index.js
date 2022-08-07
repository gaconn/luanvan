import Category from "./CategoryCheckout"
import { FaHandHoldingUsd } from "react-icons/fa"
import { MdOutlinePayments } from "react-icons/md"
import { useEffect, useState } from "react"
import productAPI from "../../services/API/productAPI"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Form, Toast, ToastContainer } from "react-bootstrap"
import orderAPI from "../../services/API/orderAPI"
import cartAPI from "../../services/API/cartAPI"
import CheckoutInformation from "./CheckoutInformation"

const ChechOutComponent = () => {
    const [product, setProduct] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [notify, setNotify] = useState({ show: false, message: "" })
    const [validated, setValidated] = useState(false)
    const [order, setOrder] = useState({ IDPhuongThucThanhToan: 1 })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({ result: false })
    const fetchProductDetail = async () => {
        const productID = searchParams.get("product_id")
        const fromCart = searchParams.get("from_cart")
        const SoLuong = searchParams.get("soluong")
        const IDTaiKhoan = localStorage.getItem("UID")
        const SessionID = localStorage.getItem("SessionID")
        const IDGioHang = searchParams.get("IDGioHang")
        var cartResponse
        if (fromCart) {
            //nếu checkout từ cart
            cartResponse = await cartAPI.getCart({ SessionID, IDTaiKhoan })
        }
        const response = await productAPI.getCheckoutList(fromCart?{
            id: productID,
            IDTaiKhoan,
            SessionID,
            fromCart,
        } : {
            id: productID
        })
        setNotify((noti) => {
            if (response && response.success && response.data) {
                return noti
            }
            return { show: true, message: response.message, success: response.success }
        })

        setProduct(() => {
            if (response && response.success && response.data) {
                return response.data
            }
            return []
        })

        setOrder(() => {
            if (response && response.success && response.data) {
                if(fromCart) {
                    return {
                        IDSanPham: productID,
                        IDTaiKhoan,
                        SessionID,
                        IDPhuongThucThanhToan: 1,
                        SoLuong,
                        IDGioHang,
                    }
                }
                return {
                    IDSanPham: productID,
                    IDTaiKhoan,
                    IDPhuongThucThanhToan: 1,
                    SoLuong
                }
            }
            return {}
        })
    }
    useEffect(() => {
        fetchProductDetail()
        CheckoutInfo(order)
    }, [searchParams])

    const checkoutButtonClickHandler = async (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() === false) {
            setValidated(true)
            return
        }
        setLoading(true)
        setInfo((info) => {
            if (
                order.SoDienThoai &&
                order.TinhThanh &&
                order.QuanHuyen &&
                order.PhuongXa &&
                order.SoNha
            ) {
                return { result: true }
            }
            return info
        })
        
        if (info.result) {
            const response = await orderAPI.checkout(order)
            if (response.success) {
                navigate("../checkout-success")
            }
        } 
        setLoading(false)
        setNotify((noti)=>{
            if(!info.result){
                return {show:true,message:"Vui lòng xác nhận thông tin đơn hàng",success:false }
            }
            return noti
        })
        return 
    }
    //lấy thông tin bên Checkoutinformation
    const handleInfo = (kq) => {
        setInfo({ ...info, result: kq })
    }
    //Không có tài khoản kiểm tra đơn hàng gồm các thông tin cần thiết
    const CheckoutInfo = (order) => {
      //Trường hợp không có tài khoản
        setInfo((info) => {
            if (
                !localStorage.getItem('UID')&&
                order.SoDienThoai !== null &&
                order.TinhThanh !== null &&
                order.QuanHuyen !== null &&
                order.PhuongXa !== null &&
                order.SoNha !== null
            ) {
                return { result: true }
            }
            return info
        })
    }
    const inputHandler = (e) => {
        setOrder((order) => {
            return { ...order, [e.target.name]: e.target.value }
        })
    }

    return (
        <>
            <ToastContainer
                position="bottom-end"
                className="p-3 position-fixed"
                style={{ zIndex: "10" }}
            >
                <Toast
                    bg={notify.success ? "success" : "danger"}
                    onClose={() => setNotify({ ...notify, show: false })}
                    show={notify.show}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Thông báo</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{notify.message ? notify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* Checkout Section Begin */}
            <section className="checkout spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h6>
                                <span className="icon_tag_alt" /> Thông tin đặt hàng
                            </h6>
                        </div>
                    </div>
                    <div className="checkout__form">
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={checkoutButtonClickHandler}
                        >
                            <div className="row">
                                {!localStorage.getItem("UID") ? (
                                    <div className="col-lg-8 col-md-6">
                                        <div className="checkout__input">
                                            <p>
                                                Email<span>*</span>
                                            </p>
                                            <input
                                                type="email"
                                                name="Email"
                                                value={order.Email ? order.Email : ""}
                                                onChange={inputHandler}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng nhập email chính xác.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="checkout__input">
                                            <p>
                                                Số điện thoại<span>*</span>
                                            </p>
                                            <input
                                                type="tel"
                                                placeholder="số điện thoại"
                                                className="checkout__input__add"
                                                name="SoDienThoai"
                                                required
                                                onChange={inputHandler}
                                                value={order.SoDienThoai ? order.SoDienThoai : ""}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng nhập số điện thoại. Số điện thoại được sử
                                                dụng để liên lạc khi hàng được giao tới.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="checkout__input">
                                            <p>
                                                Tỉnh thành<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="TinhThanh"
                                                required
                                                onChange={inputHandler}
                                                value={order.TinhThanh ? order.TinhThanh : ""}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng nhập địa chỉ tỉnh thành nhận hàng
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="checkout__input">
                                            <p>
                                                Quận huyện<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="QuanHuyen"
                                                required
                                                onChange={inputHandler}
                                                value={order.QuanHuyen ? order.QuanHuyen : ""}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng nhập quận/huyện nhận hàng
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="checkout__input">
                                            <p>
                                                Phường xã<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="PhuongXa"
                                                required
                                                onChange={inputHandler}
                                                value={order.PhuongXa ? order.PhuongXa : ""}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng nhập phường/xã nhận hàng
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="checkout__input">
                                            <p>
                                                Số nhà<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="SoNha"
                                                required
                                                onChange={inputHandler}
                                                value={order.SoNha ? order.SoNha : ""}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng nhập số nhà nhận hàng
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-lg-8 col-md-6">
                                        <CheckoutInformation
                                            OrderCheckout={order}
                                            InfoCheckout={handleInfo}
                                        />
                                        <h4>Phương thức thanh toán</h4>
                                        <div
                                            className="d-flex checkout-payment"
                                            style={{
                                                fontSize: "1.2rem",
                                                width: "300px",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="IDPhuongThucThanhToan"
                                                id="directly"
                                                checked={
                                                    order.IDPhuongThucThanhToan / 1 === 1
                                                        ? true
                                                        : ""
                                                }
                                                required
                                                onChange={inputHandler}
                                                value={1}
                                            />
                                            <label htmlFor="directly">
                                                <FaHandHoldingUsd />
                                            </label>
                                            <label htmlFor="directly">
                                                Thanh toán khi nhận hàng
                                            </label>
                                        </div>
                                        <div
                                            className="d-flex checkout-payment"
                                            style={{
                                                fontSize: "1.2rem",
                                                width: "300px",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="IDPhuongThucThanhToan"
                                                id="online"
                                                checked={
                                                    order.IDPhuongThucThanhToan / 1 === 2
                                                        ? true
                                                        : ""
                                                }
                                                required
                                                onChange={inputHandler}
                                                value={2}
                                            />
                                            <label htmlFor="online">
                                                <MdOutlinePayments />
                                            </label>
                                            <label htmlFor="online">Thanh toán qua ví Momo</label>
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            Chọn phương thức thanh toán
                                        </Form.Control.Feedback>
                                    </div>
                                )}
                                <div className="col-lg-4 col-md-6">
                                    <Category
                                        data={product}
                                        SoLuong={searchParams.get("soluong")}
                                        loading= {loading}
                                    />
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
            {/* Checkout Section End */}
        </>
    )
}

export default ChechOutComponent
