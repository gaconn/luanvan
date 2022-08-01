import { useEffect, useState } from "react"
import CartAPI from "../../services/API/Cart"
import { Toast, ToastContainer } from "react-bootstrap"
import { useNavigate, useSearchParams } from "react-router-dom"
import productAPI from "../../services/API/productAPI"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import CartRong from "./CartRong"
import Loading from "../Loading"
const CartComponent = () => {
    const [cart, setCart] = useState([])
    const [cartEmty, setcartEmty] = useState(false)
    const [choose, setChoose] = useState({})
    const [notify, setNotify] = useState({ show: false, message: "", success: false })
    const [cartInfo, setCartInfo] = useState({})
    const [product, setProduct] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [Delete, setDelete] = useState({ show: false, idGH: null, idSP: null })
    const navigate = useNavigate()
    let Session = localStorage.getItem("SessionID")
    let UID = localStorage.getItem("UID")
    const handleClose = () => {
        setNotify({ ...notify, show: false })
    }
    const handleCloseAlert = () => {
        setDelete({ ...Delete, show: false })
    }

    const fethDataCart = async () => {
        var response
        if (UID) {
            response = await CartAPI.GetCart({ IDTaiKhoan: UID })
        } else if (Session) {
            response = await CartAPI.GetCart({ SessionID: Session })
        }
        // const response = await CartAPI.GetCart({ SessionID: Session, IDTaiKhoan: UID })
        setCartInfo((cartInfo) => {
            if (!response || !response.success || response.data.length === 0) {
                return cartInfo
            }
            return response.data[0]
        })
        if (response) {
            const data = response.data
            if (data.length !== 0) {
                const cartResponse = await CartAPI.getItemCart(data[0].id)
                const cartData = cartResponse.data
                console.log(cartData.length === 0)
                if (cartData.length === 0) {
                    setcartEmty(true)
                } else {
                    setcartEmty(false)
                    fetchProduct(cartData)
                    setCart(cartData)
                }
            }
        }
    }
    const RemoveProduct = async (Delete) => {
        const removeCart = await CartAPI.getRemoveCart(Delete.idGH, Delete.idSP)
        setDelete({ ...Delete, show: false })
        const params = new URLSearchParams({ updateCart: new Date().getTime() }).toString()
        setSearchParams(params)
    }
    const ChangInput = async (e, item) => {
        product.forEach((pro) => {
            setNotify((notify) => {
                if (pro.id === item.IDSanPham && e.target.value >= pro.SoLuong) {
                    return {
                        show: true,
                        message:
                            "Sản phẩm " +
                            pro.Ten +
                            " không đủ số lượng đáp ứng, quý khách vui lòng liên hệ 0334596482 để đặt hàng ",
                        success: true,
                    }
                }
                return notify
            })
        })

        const dataUpdate = {
            SoLuong: e.target.value,
            IDGioHang: item.IDGioHang,
            IDSanPham: item.IDSanPham,
        }

        const response = await CartAPI.updateSL(dataUpdate)
        const params = new URLSearchParams({ updateCart: new Date().getTime() }).toString()
        setSearchParams(params)

        setNotify((notify) => {
            if (!response || !response.success) {
                return { show: true, message: response.message, success: response.success }
            }
            return notify
        })

        setDelete((Delete) => {
            if (parseInt(dataUpdate.SoLuong) === 0) {
                return { show: true, idGH: item.IDGioHang, idSP: item.IDSanPham }
            }
            return Delete
        })
    }
    const chooseHandler = (e, product) => {
        setChoose((choose) => {
            if (e.target.name === "all") {
                if (Object.keys(choose).length === cart.length) {
                    return {}
                } else {
                    var tmpObj = {}
                    for (let index = 0; index < cart.length; index++) {
                        tmpObj[cart[index].IDSanPham] = cart[index].IDSanPham
                    }
                    return tmpObj
                }
            }
            if (choose[product.IDSanPham]) {
                delete choose[product.IDSanPham]
                return { ...choose }
            }
            return { ...choose, [product.IDSanPham]: product.IDSanPham }
        })
    }

    const checkoutClickHandler = async (e) => {
        e.preventDefault()
        const number = Object.keys(choose).length
        setNotify((notify) => {
            if (Object.keys(choose).length === 0) {
                return { show: true, message: "Vui lòng chọn sản phẩm", success: false }
            }
            return { ...notify }
        })

        if (number === 0) return
        var arrIDSanPham = []
        for (let index = 0; index < cart.length; index++) {
            if (choose[cart[index].IDSanPham]) {
                arrIDSanPham.push(choose[cart[index].IDSanPham])
            }
        }
        var strIDSanPham = arrIDSanPham.join(",")

        setNotify((notify) => {
            if (!strIDSanPham) {
                return { show: true, message: "Vui lòng chọn sản phẩm", success: false }
            }
            return { ...notify }
        })

        navigate(`/checkout?product_id=${strIDSanPham}&from_cart=1&IDGioHang=${cartInfo.id}`)
    }
    const fetchProduct = async (cart) => {
        if (cart.length !== 0) {
            const productsID = []
            for (let index = 0; index < cart.length; index++) {
                productsID.push(cart[index].IDSanPham)
            }
            var strID = productsID.join(",")
            const condition = { id: strID }
            const response = await productAPI.getAll(condition)
            const data = response.data.data
            for (let index = 0; index < cart.length; index++) {
                const cartSL = cart[index]
                for (let i = 0; i < data.length; i++) {
                    const proSL = data[i]
                    setNotify((notify) => {
                        if (cartSL.IDSanPham === proSL.id && cartSL.SoLuong > proSL.SoLuong) {
                            return {
                                show: true,
                                message:
                                    proSL.Ten +
                                    " không đủ số lượng, quý khách vui lòng liên hệ 0334596482 để đặt hàng ",
                                success: true,
                            }
                        }
                        return { ...notify }
                    })
                }
            }
            setProduct(data)
        }
    }
    useEffect(() => {
        fethDataCart()
    }, [searchParams])
    const handleDelete = (IDGioHang, IDSanPham) => {
        setDelete({ ...Delete, show: true, idGH: IDGioHang, idSP: IDSanPham })
    }

    return (
        <>
            {cartEmty ? (
                <CartRong />
            ) : (
                <>
                    <section className="shoping-cart spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="shoping__cart__table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: "150px",
                                                            textAlign: "left",
                                                        }}
                                                    >
                                                        <input
                                                            id="choose-all"
                                                            type="checkbox"
                                                            name="all"
                                                            checked={
                                                                Object.keys(choose).length ===
                                                                cart.length
                                                                    ? true
                                                                    : ""
                                                            }
                                                            onChange={(e) => chooseHandler(e, cart)}
                                                        />
                                                        <label for="choose-all">Chọn tất cả</label>
                                                    </th>
                                                    <th className="shoping__product pl-3">
                                                        Sản Phẩm
                                                    </th>
                                                    <th>Giá</th>
                                                    <th>Số Lượng</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart &&
                                                    cart.map &&
                                                    cart.map((item, k) => (
                                                        <tr key={k}>
                                                            <td style={{ textAlign: "left" }}>
                                                                <input
                                                                    type="checkbox"
                                                                    name={item.IDSanPham}
                                                                    value={item.IDSanPham}
                                                                    checked={
                                                                        choose[item.IDSanPham]
                                                                            ? true
                                                                            : ""
                                                                    }
                                                                    onChange={(e) =>
                                                                        chooseHandler(e, item)
                                                                    }
                                                                />
                                                            </td>
                                                            <td className="shoping__cart__item pl-3">
                                                                <img
                                                                    src={
                                                                        item.SanPhamHinhAnh
                                                                            ? process.env
                                                                                  .REACT_APP_API_IMAGE +
                                                                              JSON.parse(
                                                                                  item.SanPhamHinhAnh
                                                                              )[0]
                                                                            : ""
                                                                    }
                                                                    alt=""
                                                                    style={{
                                                                        width: 50,
                                                                        height: 50,
                                                                    }}
                                                                />
                                                                <h5>{item.SanPhamTen}</h5>
                                                            </td>
                                                            <td className="shoping__cart__price">
                                                                {Math.abs(item.SanPhamGiaGoc)
                                                                    ? Math.abs(item.SanPhamGiaGoc) *
                                                                      (Math.abs(item.SoLuong)
                                                                          ? Math.abs(item.SoLuong)
                                                                          : 1)
                                                                    : 0}{" "}
                                                                VND
                                                            </td>
                                                            <td className="shoping__cart__quantity">
                                                                <div className="quantity">
                                                                    <div className="pro-qty d-flex align-items-center justify-content-center m-auto fs-4">
                                                                        <input
                                                                            type="number"
                                                                            className="text-center"
                                                                            name="SoLuong"
                                                                            min={0}
                                                                            value={
                                                                                Math.abs(
                                                                                    item.SoLuong
                                                                                )
                                                                                    ? Math.abs(
                                                                                          item.SoLuong
                                                                                      )
                                                                                    : 1
                                                                            }
                                                                            onChange={(e) =>
                                                                                ChangInput(e, item)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="shoping__cart__item__close">
                                                                <span
                                                                    className="icon_close"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            item.IDGioHang,
                                                                            item.IDSanPham
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12"></div>
                                <div className="col-lg-6">
                                    <div className="shoping__continue">
                                        <div className="shoping__discount">
                                            <h5>Mã Giảm Giá</h5>
                                            <form action="#">
                                                <input
                                                    type="text"
                                                    placeholder="Enter your coupon code"
                                                />
                                                <button type="submit" className="site-btn">
                                                    áp dụng phiếu giảm giá
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="shoping__checkout">
                                        <a
                                            href=" "
                                            className="primary-btn"
                                            onClick={checkoutClickHandler}
                                        >
                                            Mua hàng
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Modal
                        show={notify.show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Thông báo giỏ hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{notify.message}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            {notify.success && <Button variant="primary">Liên hệ</Button>}
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={Delete.show}
                        onHide={handleCloseAlert}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Thông báo giỏ hàng
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Quý khách có chắc muốn loại bỏ sản phẩm này ra khỏi giỏ hàng
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAlert}>
                                {" "}
                                không
                            </Button>
                            <Button variant="primary" onClick={() => RemoveProduct(Delete)}>
                                có
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    )
}

export default CartComponent
