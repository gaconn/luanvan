import { useEffect, useState } from "react";
import CartAPI from "../../services/API/Cart";


const CartComponent = () => {
    var SessionID=localStorage.getItem('SessionID')
    const fethDataCart=async(SectionID)=>{
        const response= await CartAPI.GetCart(SessionID)
        console.log(response)
    }
    useEffect(
        ()=>{
          
            fethDataCart(SessionID)
        }
        ,[])
    return (
        <>
            {/* Shoping Cart Section Begin */}
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
                                        <tr>
                                            <td className="shoping__cart__item">
                                                <img src="img/cart/cart-1.jpg" alt="" />
                                                <h5>Vegetable’s Package</h5>
                                            </td>
                                            <td className="shoping__cart__price">$55.00</td>
                                            <td className="shoping__cart__quantity">
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <input type="text" defaultValue={1} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="shoping__cart__total">$110.00</td>
                                            <td className="shoping__cart__item__close">
                                                <span className="icon_close" />
                                            </td>
                                        </tr>
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
                                <a href="#" className="primary-btn cart-btn cart-btn-right">
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
        </>

    );
}

export default CartComponent;