import { useEffect, useState } from "react";
import CartAPI from "../../services/API/Cart";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Loading from "./loading";

const CartComponent = () => {
    const [cart, setCart] = useState([])
    //localStorage.removeItem('SessionID')
    const [updateCart, setUpdateCart] = useState({})
    const [loading, setLoading] = useState(false);
    const TongCong = 0
    const fethDataCart = async () => {
        let Session = localStorage.getItem('SessionID')
        console.log(Session)
        const response = await CartAPI.GetCart(Session)
        if (response) {
            const data = response.data
            const cartResponse = await CartAPI.getItemCart(data[0].id)
            setCart(cartResponse.data)
        }
    }
    useEffect(
        () => {
            fethDataCart()
        }
        , [])
    const RemoveProduct = async (idGH, idSP) => {
        const removeCart = await CartAPI.getRemoveCart(idGH, idSP)
        if (removeCart) {
            window.location.reload();
        }
    }
    const ChangInput = (e, item) => {
        setUpdateCart((updateCart) => ({ ...updateCart, IDGioHang: item.IDGioHang, IDSanPham: item.IDSanPham, SoLuong: e.target.value }))
        setLoading(true)

        setLoading(false)
        console.log(cart)
    }
  
    const UpdateCart = async (cart, updateCart) => {
        const update = cart.forEach(element => {
            if (element.IDSanPham === updateCart.IDSanPham && element.IDGioHang === updateCart.IDGioHang) {
                element.SoLuong = updateCart.SoLuong
            }
        });
        console.log(cart)
    }

  

    return (
        <>
        {loading ?(Loading):(

            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">Sản Phẩm</th>
                                            <th>Giá</th>
                                            <th>Số Lượng</th>
                                            <th>Thành Tiền</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart && cart.map && cart.map((item, k) => (
                                                <tr key={k}>
                                                    <td className="shoping__cart__item">
                                                        <img src={process.env.REACT_APP_API_IMAGE + JSON.parse(item.SanPhamHinhAnh)[0]} alt="" style={{ width: 50, height: 50 }} />
                                                        <h5>{item.SanPhamTen}</h5>
                                                    </td>
                                                    <td className="shoping__cart__price">${item.SanPhamGiaGoc }</td>
                                                    <td className="shoping__cart__quantity">
                                                        <div className="quantity">
                                                            <div className="pro-qty">
                                                                <input type="number" min={1} defaultValue={item.SoLuong} onChange={(e) => ChangInput(e,item)} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="shoping__cart__total">${item.SanPhamGiaGoc * item.SoLuong}</td>
                                                    <td className="shoping__cart__item__close">
                                                        <span className="icon_close" onClick={() => RemoveProduct(item.IDGioHang, item.IDSanPham)} />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__btns">
                                <a href="#" className="primary-btn cart-btn">
                                    Tiếp Tục Mua Săm
                                </a>
                                <a href="#" className="primary-btn cart-btn cart-btn-right" onClick={() => UpdateCart(cart, updateCart)}>
                                    <span className="icon_loading" />
                                    Cập nhật giỏ hàng
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__continue">
                                <div className="shoping__discount">
                                    <h5>Mã Giảm Giá</h5>
                                    <form action="#">
                                        <input type="text" placeholder="Enter your coupon code" />
                                        <button type="submit" className="site-btn">
                                            áp dụng phiếu giảm giá
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>Tổng số giỏ hàng</h5>
                                <ul>
                                    <li>
                                        Tổng phụ <span>$454.98</span>
                                    </li>
                                    <li>
                                        Tổng cộng <span>$454.98</span>
                                    </li>
                                </ul>
                                <a href="#" className="primary-btn">
                                    TIẾN HÀNH KIỂM TRA
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}
        </>

    );
}

export default CartComponent;