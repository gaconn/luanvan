
import List from "./ListProduct";
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Tree from './Tree'
import categoryAPI from "../../services/API/CategoryAPI";
import PaginationShop from "./page";
import productAPI from "../../services/API/productAPI";
import './search.css'
import Search from "./SearchProduct";
const ShopComponent = () => {
    const [categories, setCategories] = useState([])
    const [Loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    const[query,setQuery]=useState("")
    //Phân Trang
    const [currentPage, setCurrentPage] = useState(1)
    const [newPerPage] = useState(3)
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await categoryAPI.getTree();
            setCategories(response.data)
        };
        fetchCategory();
    }, [])
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const productResponse = await productAPI.getAll()
            setProduct(productResponse.data.data)
            if (!Loading) {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }
        fetchProduct()
    }, [])
    const indexOfLastNews = currentPage * newPerPage
    const indexOfFirstNews = indexOfLastNews - newPerPage
    const currentListProduct = product.slice(indexOfFirstNews, indexOfLastNews)
    const paginate = (numberPage) => setCurrentPage(numberPage)
    const [pageNumberLimit, setPageNumberLimit] = useState(3)
    const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(3)
    const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0)
    const handelNextPage = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > MaxPageNumberLimit) {
            setMaxPageNumberLimit(MaxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(MinPageNumberLimit + pageNumberLimit)
        }
    }
    const handelPrevPage = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(MaxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(MinPageNumberLimit - pageNumberLimit)
        }
    }
    //search
    const search=(data)=>{
        return data.filter(item => item.Ten.toLocaleLowerCase().includes(query))
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
                                                <Tree categoryParent={categories} />
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
                                    <div className="col-lg-4 col-md-5">
                                        <div className="filter__sort">
                                            <span>Sort By</span>
                                            <select>
                                                <option value={0}>Default</option>
                                                <option value={0}>Default</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="app">
                                          
                                                <input type="text" placeholder="Tìm kiếm sản phẩm ..." name="search" className="search" onChange={(e) => setQuery(e.target.value)} />

                                                {/* <ul className="list">
                                                    {
                                                        product.filter(item => item.Ten.includes(query)).map((item, k) => {
                                                            return <li className="listItem" key={k}>{item.Ten}</li>
                                                        })
                                                    }
                                                </ul> */}
                                                {/* <button type="submit">
                                                         <i className="fa fa-search" />
                                                          </button> */}
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-3">
                                        <div className="filter__option">
                                            <span className="icon_grid-2x2" />
                                            <span className="icon_ul" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* List product */}
                            {
                                query ? ( <Search ProductSearch={search(product)} LoadingProduct={Loading} />):( <List Product={currentListProduct} LoadingProduct={Loading} />)
                            }
                               

                            </div>
                            <PaginationShop current={currentPage} totalPage={product.length} NewPerPage={newPerPage} paginate={paginate} pageLimit={pageNumberLimit} Max={MaxPageNumberLimit} Min={MinPageNumberLimit} handelNext={handelNextPage} handelPrev={handelPrevPage} />
                        </div>
                    </div>
                </div>
            </section>


        </>


    );
}

export default ShopComponent;