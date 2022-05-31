const Home = () => {
    return (
        <>
            {/* Featured Section Begin */}
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Featured Product</h2>
                            </div>
                            <div className="featured__controls">
                                <ul>
                                    <li className="active" data-filter="*">
                                        All
                                    </li>
                                    <li data-filter=".oranges">Oranges</li>
                                    <li data-filter=".fresh-meat">Fresh Meat</li>
                                    <li data-filter=".vegetables">Vegetables</li>
                                    <li data-filter=".fastfood">Fastfood</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-1.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
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
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-2.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
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
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fresh-meat">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-3.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
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
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix fastfood oranges">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-4.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
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
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-5.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
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
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fastfood">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-6.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
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
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-7.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
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
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix fastfood vegetables">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-8.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
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
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Featured Section End */}
            {/* Banner Begin */}
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img src="img/banner/banner-1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img src="img/banner/banner-2.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End */}
            <>
  {/* Blog Section Begin */}
  <section className="from-blog spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title from-blog__title">
            <h2>From The Blog</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6">
          <div className="blog__item">
            <div className="blog__item__pic">
              <img src="img/blog/blog-1.jpg" alt="" />
            </div>
            <div className="blog__item__text">
              <ul>
                <li>
                  <i className="fa fa-calendar-o" /> May 4,2019
                </li>
                <li>
                  <i className="fa fa-comment-o" /> 5
                </li>
              </ul>
              <h5>
                <a href="#">Cooking tips make cooking simple</a>
              </h5>
              <p>
                Sed quia non numquam modi tempora indunt ut labore et dolore
                magnam aliquam quaerat{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <div className="blog__item">
            <div className="blog__item__pic">
              <img src="img/blog/blog-2.jpg" alt="" />
            </div>
            <div className="blog__item__text">
              <ul>
                <li>
                  <i className="fa fa-calendar-o" /> May 4,2019
                </li>
                <li>
                  <i className="fa fa-comment-o" /> 5
                </li>
              </ul>
              <h5>
                <a href="#">6 ways to prepare breakfast for 30</a>
              </h5>
              <p>
                Sed quia non numquam modi tempora indunt ut labore et dolore
                magnam aliquam quaerat{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <div className="blog__item">
            <div className="blog__item__pic">
              <img src="img/blog/blog-3.jpg" alt="" />
            </div>
            <div className="blog__item__text">
              <ul>
                <li>
                  <i className="fa fa-calendar-o" /> May 4,2019
                </li>
                <li>
                  <i className="fa fa-comment-o" /> 5
                </li>
              </ul>
              <h5>
                <a href="#">Visit the clean farm in the US</a>
              </h5>
              <p>
                Sed quia non numquam modi tempora indunt ut labore et dolore
                magnam aliquam quaerat{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Blog Section End */}
</>

        </>

    );
}

export default Home;