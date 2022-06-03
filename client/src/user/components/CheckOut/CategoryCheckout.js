const Category = () => {
    return (
        <div className="checkout__order">
            <h4>Your Order</h4>
            <div className="checkout__order__products">
                Products <span>Total</span>
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
                Subtotal <span>$750.99</span>
            </div>
            <div className="checkout__order__total">
                Total <span>$750.99</span>
            </div>
            <div className="checkout__input__checkbox">
                <label htmlFor="acc-or">
                    Create an account?
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
                    Check Payment
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
                PLACE ORDER
            </button>
        </div>
    );
}

export default Category;