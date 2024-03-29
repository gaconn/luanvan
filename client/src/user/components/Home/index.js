import { useState, useEffect } from "react"
import ProductAPI from "../../services/API/productAPI"
import { useSearchParams } from "react-router-dom"
import List from "../Shop/ListProduct"
const Home = () => {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [typeList, setTypeList] = useState("discount")

    const fetchProduct = async (objCondition) => {
        const productResponse = await ProductAPI.getAll(objCondition)
        setProducts(() => {
            if (productResponse.success) {
                return productResponse.data.data
            }
            return []
        })
    }
    useEffect(() => {
        const objCondition = {}
        if (typeList === "discount") {
            objCondition.joinDiscount = true
        }
        if (typeList === "new") {
            objCondition.new = true
        }
        fetchProduct(objCondition)
    }, [typeList])
    useEffect(() => {
        const kind = searchParams.get("kind")
        setTypeList((typeList) => {
            if (kind) {
                return kind
            }
            return typeList
        })
    }, [searchParams])
    return (
        <>
            {/* Featured Section Begin */}
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Sản phẩm nổi bật</h2>
                            </div>
                            <div className="featured__controls">
                                <ul>
                                    <li
                                        className={`${typeList === "discount" ? "active" : ""}`}
                                        onClick={() => setSearchParams("kind=discount")}
                                    >
                                        Đang khuyến mãi
                                    </li>
                                    <li
                                        className={`${typeList === "new" ? "active" : ""}`}
                                        onClick={() => setSearchParams("kind=new")}
                                    >
                                        Sản phẩm mới
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">{<List Product={products} />}</div>
                </div>
            </section>
            {/* Featured Section End */}
            {/* Banner Begin */}
            {/* <div className="banner">
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
            </div> */}
            {/* Banner End */}
            <>
                {/* Blog Section Begin */}
                {/* <section className="from-blog spad">
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
                                            Sed quia non numquam modi tempora indunt ut labore et
                                            dolore magnam aliquam quaerat{" "}
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
                                            Sed quia non numquam modi tempora indunt ut labore et
                                            dolore magnam aliquam quaerat{" "}
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
                                            Sed quia non numquam modi tempora indunt ut labore et
                                            dolore magnam aliquam quaerat{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* Blog Section End */}
            </>
        </>
    )
}

export default Home
