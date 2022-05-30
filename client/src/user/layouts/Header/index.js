import img from '../../assets/img/language.png'
const Header = () => {
    return (
        <>
            <div id="preloder">
                <div className="loader" />
            </div>

            {/* Header Section Begin */}
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <li>
                                            <i className="fa fa-envelope" /> hello@colorlib.com
                                        </li>
                                        <li>Free Shipping for all Order of $99</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href="#">
                                            <i className="fa fa-facebook" />
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-twitter" />
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-linkedin" />
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-pinterest-p" />
                                        </a>
                                    </div>
                                    <div className="header__top__right__language">
                                        <img src={img} alt="" />
                                        <div>English</div>
                                        <span className="arrow_carrot-down" />
                                        <ul>
                                            <li>
                                                <a href="#">Spanis</a>
                                            </li>
                                            <li>
                                                <a href="#">English</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Header Section End */}
        </>


    );
}

export default Header;