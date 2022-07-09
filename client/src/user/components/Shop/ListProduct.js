import { useEffect, useState } from "react";
import productAPI from "../../services/API/productAPI";
import { Link } from "react-router-dom";
import uniqid from 'uniqid';
import CartAPI from "../../services/API/Cart";
const List = () => {
    const [product, setProduct] = useState([])
    const HandleInfo = (item) => {
        localStorage.setItem('DetailID', item)
    };
    useEffect(() => {
        const fetchProduct = async () => {
            const productResponse = await productAPI.getAll()
            setProduct(productResponse.data)
        }
        fetchProduct()
    }, [])
    const handleInfoCart = async (item) => {
        let SessionID=localStorage.getItem('SessionID')
        if (!SessionID) {
            let session = uniqid()
             SessionID = localStorage.setItem('SessionID', session)
        }
        const data = { IDSanPham: item.id, SoLuong: 1, SessionID: SessionID }
        const addToCart = CartAPI.AddToCart(data)
    }
    return (
        <>
            {
                product && product.data && product.data.map && product.data.map((item, k) => (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={k}>
                        <div className="product__item">
                            <div
                                className="product__item__pic set-bg"
                            >
                                {
                                    item.HinhAnh &&
                                    <img
                                        className="d-block w-100"
                                        src={process.env.REACT_APP_API_IMAGE + JSON.parse(item.HinhAnh)[0]}
                                        style={{ height: 300 }}
                                        alt="First slide"
                                    />

                                    // <Product ProductIMG={JSON.parse(item.HinhAnh)} />     

                                }
                                <ul className="product__item__pic__hover">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-heart" />
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/ProductDetail" onClick={() => HandleInfo(item.id)}   >
                                            <i className="fa fa-retweet" />
                                        </Link>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i className="fa fa-shopping-cart" onClick={() => handleInfoCart(item)}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6>
                                    <Link to="/ProductDetail" onClick={() => HandleInfo(item.id)}>{item.Ten}</Link>
                                </h6>
                                <h5>${item.GiaGoc * 2}</h5>
                            </div>
                        </div>
                    </div>

                ))
            }
        </>);
}

export default List;