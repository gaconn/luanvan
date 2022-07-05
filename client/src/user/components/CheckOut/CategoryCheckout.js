const Category = () => {
    return (
        <div className="checkout__order">
            <h4>Đơn đặt hàng của bạn</h4>
            <div className="checkout__order__products">
                Sản phẩm<span>Tổng cộng</span>
            </div>
            <ul>
                <li>
                    Vegetable’s Package <span>$75.99</span>
                </li>
                <li>
                    Fresh Vegetable <span>$151.99</span>
                </li>
                <li>
                    Organic Bananas <span>$53.99</span>
                </li>
            </ul>
            <div className="checkout__order__subtotal">
            Tổng phụ <span>$750.99</span>
            </div>
            <div className="checkout__order__total">
            Thành tiền <span>$750.99</span>
            </div>
            <div className="checkout__input__checkbox">
                <label htmlFor="acc-or">
                Tạo một tài khoản?
                    <input type="checkbox" id="acc-or" />
                    <span className="checkmark" />
                </label>
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adip elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="checkout__input__checkbox">
                <label htmlFor="payment">
                Kiểm tra thanh toán
                    <input type="checkbox" id="payment" />
                    <span className="checkmark" />
                </label>
            </div>
            <div className="checkout__input__checkbox">
                <label htmlFor="paypal">
                    Paypal
                    <input type="checkbox" id="paypal" />
                    <span className="checkmark" />
                </label>
            </div>
            <button type="submit" className="site-btn">
            ĐẶT HÀNG TẬN NƠI
            </button>
        </div>
    );
}

export default Category;