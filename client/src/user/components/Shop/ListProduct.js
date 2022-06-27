const List = () => {
    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                    <div
                        className="product__item__pic set-bg"
                        data-setbg="img/product/product-1.jpg"
                    >
                        <ul className="product__item__pic__hover">
                            <li>
                                <a href="#">
                                    <i className="fa fa-heart" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-retweet" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-shopping-cart" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="product__item__text">
                        <h6>
                            <a href="#">Crab Pool Security</a>
                        </h6>
                        <h5>$30.00</h5>
                    </div>
                </div>
            </div>

        </>);
}

export default List;