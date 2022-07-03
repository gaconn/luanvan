const DetailComponent = () => {
    return (
        <>
            {/* Product Details Section Begin */}
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img
                                        className="product__details__pic__item--large"
                                        src="img/product/details/product-details-1.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="product__details__pic__slider owl-carousel">
                                    <img
                                        data-imgbigurl="img/product/details/product-details-2.jpg"
                                        src="img/product/details/thumb-1.jpg"
                                        alt=""
                                    />
                                    <img
                                        data-imgbigurl="img/product/details/product-details-3.jpg"
                                        src="img/product/details/thumb-2.jpg"
                                        alt=""
                                    />
                                    <img
                                        data-imgbigurl="img/product/details/product-details-5.jpg"
                                        src="img/product/details/thumb-3.jpg"
                                        alt=""
                                    />
                                    <img
                                        data-imgbigurl="img/product/details/product-details-4.jpg"
                                        src="img/product/details/thumb-4.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                <h3>Vetgetable’s Package</h3>
                                <div className="product__details__rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half-o" />
                                    <span>(18 reviews)</span>
                                </div>
                                <div className="product__details__price">$50.00</div>
                                <p>
                                    Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
                                    dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam
                                    vehicula elementum sed sit amet dui. Proin eget tortor risus.
                                </p>
                                <div className="product__details__quantity">
                                    <div className="quantity">
                                        <div className="pro-qty">
                                            <input type="text" defaultValue={1} />
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="primary-btn">
                                    Thêm Vào Giỏ Hàng
                                </a>
                                <a href="#" className="heart-icon">
                                    <span className="icon_heart_alt" />
                                </a>
                                <ul>
                                    <li>
                                        <b>Tình Trạng</b> <span>Còn hàng</span>
                                    </li>
                                    <li>
                                        <b>Giao Hàng</b>{" "}
                                        <span>
                                            trong 1 ngày.
                                        </span>
                                    </li>
                                    <li>
                                        <b>Cân nặng</b> <span>0.5 kg</span>
                                    </li>
                                    <li>
                                        <b>Chia sẻ</b>
                                        <div className="share">
                                            <a href="#">
                                                <i className="fa fa-facebook" />
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-instagram" />
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-pinterest" />
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="product__details__tab">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            data-toggle="tab"
                                            href="#tabs-1"
                                            role="tab"
                                            aria-selected="true"
                                        >
                                            Mô tả
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div className="product__details__tab__desc">
                                            <h6>Thông tin sản phẩm</h6>
                                            <p>
                                                ABABAB
                                            </p>
                                            <p>
                                                ADFGHJKL
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Product Details Section End */}
        </>

    );
}

export default DetailComponent;