import { useEffect, useState } from "react";
import ProductAPI from "../../services/API/ProductAPI";
import Product from './product'
import { Link} from "react-router-dom";
const List = () => {
    const [product, setProduct] = useState([])
    const [page, setPage] = useState({ rowCount: 0, now: 1, next: null, prev: null })
    const HandleInfo = (item) => {
        localStorage.setItem('DetailID',item)
    };
    useEffect(() => {
        const fetchProduct = async () => {
            const productResponse = await ProductAPI.getAll(page.now)
            setProduct(productResponse.data)
            setPage((page) => {
                if (productResponse.success) {
                    if (productResponse.data.rowCount) {
                        let next = (page.now) * 10 < productResponse.data.rowCount ? page.now + 1 : null
                        let prev = page.now > 1 ? page.now - 1 : null
                        return { ...page, rowCount: productResponse.data.rowCount, next, prev }
                    }
                }
                return { ...page }
            })
        }
        fetchProduct()
    }, [page.now])
   
    return (
        <>
            {
               product && product.data && product.data.map && product.data.map((item,k) => (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={k}>
                        <div className="product__item">
                            <div
                                className="product__item__pic set-bg"
                            >
                           {
                            item.HinhAnh && 
                                <Product ProductIMG={JSON.parse(item.HinhAnh)} />
                           }
                                <ul className="product__item__pic__hover">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-heart" />
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/ProductDetail" >
                                            <i className="fa fa-retweet" />
                                        </Link>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i className="fa fa-shopping-cart" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6>
                                    <Link to="/ProductDetail" onClick={()=>HandleInfo(item.id)}>{item.Ten}</Link>
                                </h6>
                                <h5>${item.GiaGoc*2}</h5>
                            </div>
                        </div>
                    </div>

               ))
            }
        </>);
}

export default List;