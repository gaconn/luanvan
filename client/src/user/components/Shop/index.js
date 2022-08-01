import List from "./ListProduct"
import { useState, useEffect } from "react"
import Accordion from "react-bootstrap/Accordion"
import Tree from "./Tree"
import categoryAPI from "../../services/API/CategoryAPI"
import productAPI from "../../services/API/productAPI"
import "./search.css"
import { useNavigate, useSearchParams } from "react-router-dom"
import Spinner from "react-bootstrap/Spinner"
import Item from "./Item"

const ShopComponent = () => {
    const [categories, setCategories] = useState([])
    const [Loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(0)
    const [finish, setFinish] = useState(false)
    const [keyword, setKeyword] = useState()
    const [IDTLProduct, setIDTLProduct] = useState()
    const navigate = useNavigate()
    const [sort, setSort] = useState({})
    //Hiển category theo danh mục
    const id = searchParams.get("IDTheLoai")
    useEffect(() => {
        const objConditionTheLoai = {}
        objConditionTheLoai.id = id
        objConditionTheLoai.child = true
        if (!id) {
            fetchParentTree()
        } else {
            fetchCategory(objConditionTheLoai)
            const objConditionProduct = {}
            objConditionProduct.IDTheLoai = id
            fetchCategoryProduct(objConditionProduct)
        }
        setLoading(() => {
            return false
        })
    }, [searchParams, Loading])
    //Lấy Category con để hiển thị từ danh mục
    const fetchCategory = async (objConditionTheLoai) => {
        const categoryResponse = await categoryAPI.getChild(objConditionTheLoai)
        setCategories(categoryResponse.data.data)
        setLoading(() => {
            return false
        })
    }
    //Lấy Category cha để hiển thị từ danh mục
    const fetchParentTree = async () => {
        const categoryResponse = await categoryAPI.getTree()
        setCategories(categoryResponse.data)
        setLoading(() => {
            return false
        })
    }

    //Lấy Sản Phẩm Theo Danh Mục
    const fetchCategoryProduct = async (objConditionProduct) => {
        let tmpPage = 1
        objConditionProduct.page = page + 1
        // khi id thì set lại page = 1
        let isSearch = IDTLProduct !== objConditionProduct.IDTheLoai
        if (isSearch) {
            objConditionProduct.page = tmpPage
        }
        const productResponseTL = await productAPI.getAll(objConditionProduct)
        setProduct((product) => {
            // nếu đang search thì trả về danh sách mới
            if (isSearch) {
                return productResponseTL.data.data
            }
            // còn không thì nối thêm vào danh sách cũ
            return [...product, ...productResponseTL.data.data]
        })
        setPage((page) => {
            if (isSearch) {
                return 1
            }
            if (productResponseTL.success && productResponseTL.data.data.length > 0) {
                return page + 1
            }
            return page
        })
        setFinish((finish) => {
            if (productResponseTL.success && productResponseTL.data.data.length === 0) {
                return true
            }
            return false
        })
        setIDTLProduct(() => {
            return objConditionProduct.id
        })
    }
    //Hiển thị sản phẩm theo search
    useEffect(() => {
        const Ten = searchParams.get("keyword")
        if (!Loading && Ten === keyword) return
        const objCondition = {}
        objCondition.Ten = Ten
        fetchProduct(objCondition)
        setLoading(() => {
            return false
        })
    }, [searchParams, Loading])

    // infinite loading
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            Loading
        )
            return
        setLoading(true)
    }
    //lấy theo search
    const fetchProduct = async (objCondition) => {
        let tmpPage = 1
        objCondition.page = page + 1
        // khi search thì set lại page = 1
        let isSearch = keyword !== objCondition.Ten
        if (isSearch) {
            objCondition.page = tmpPage
        }
        const productResponse = await productAPI.getAll(objCondition)

        setProduct((product) => {
            // nếu đang search thì trả về danh sách mới
            if (isSearch) {
                return productResponse.data.data
            }
            // còn không thì nối thêm vào danh sách cũ
            return [...product, ...productResponse.data.data]
        })
        setPage((page) => {
            if (isSearch) {
                return 1
            }
            if (productResponse.success && productResponse.data.data.length > 0) {
                return page + 1
            }
            return page
        })
        setFinish((finish) => {
            if (productResponse.success && productResponse.data.data.length === 0) {
                return true
            }
            return false
        })
        setKeyword(() => {
            return objCondition.Ten
        })
    }

    // sắp xếp
    const priceSortChangeHandler = (e) => {
        setSort(() => {
            return { [e.target.name]: e.target.value }
        })
    }
    const ListCategory = (categories, id) => {
        if (id) {
            if (Array.isArray(categories) && !categories.length) {
                fetchParentTree()
                return <Tree categoryParent={categories} />
            }
            return <Tree categoryParent={categories} />
        }

        return <Item categoryParent={categories} />
    }
    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="sidebar">
                                <div className="sidebar__item ">
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Thể loại</Accordion.Header>
                                            <Accordion.Body>
                                                {ListCategory(categories, id)}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-7">
                            {/* safe off */}
                            <div className="filter__item">
                                <div className="row">
                                    <div className="col-6 d-flex">
                                        <div className="filter__sort pr-3">
                                            <span>Sắp xếp theo giá</span>
                                            <select
                                                name="sortPrice"
                                                onChange={priceSortChangeHandler}
                                            >
                                                <option value="asc">Tăng dần</option>
                                                <option value="desc">Giảm dần</option>
                                            </select>
                                        </div>
                                        <div className="filter__sort">
                                            <span>Sort By</span>
                                            <select>
                                                <option value={0}>Default</option>
                                                <option value={0}>Default</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* List product */}
                                {<List Product={product} LoadingProduct={Loading} />}
                            </div>
                            <div
                                className="d-flex justify-content-center"
                                style={{ height: "60px" }}
                            >
                                {Loading && <Spinner animation="border" />}
                                {finish && "Hết hàng"}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopComponent
