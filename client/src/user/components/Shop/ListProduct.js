import { useEffect, useState } from "react"

import { Link, useSearchParams } from "react-router-dom"
import uniqid from "uniqid"
import CartAPI from "../../services/API/Cart"
import LoadingPage from "../Loading"
import { truncateWords } from "../../services/utils/GenerateUtil"
const List = ({ Product, LoadingProduct }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    // if(LoadingProduct){
    //     return <LoadingPage/>
    // }
    const HandleInfo = (item) => {
        localStorage.setItem("DetailID", item)
    }
    const handleInfoCart = async (e, item) => {
        e.preventDefault()
        let SessionID = localStorage.getItem("SessionID")
        let UID = localStorage.getItem("UID")
        if (!UID) {
            if (!SessionID) {
                let session = uniqid()
                SessionID = localStorage.setItem("SessionID", session)
            }
            const addToCart = await CartAPI.AddToCart({
                IDSanPham: item.id,
                SoLuong: 1,
                SessionID: SessionID,
            })
        } else {
            const addToCart = await CartAPI.AddToCart({
                IDSanPham: item.id,
                SoLuong: 1,
                IDTaiKhoan: UID,
            })
        }
        const params = new URLSearchParams({ updateCart: new Date().getTime() }).toString()
        setSearchParams(params)
    }

    return (
        <>
            {Product &&
                Product.map &&
                Product.map((item, k) => (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={k}>
                        <div className="product__item">
                            <div className="product__item__pic set-bg">
                                {
                                    item.HinhAnh && (
                                        <img
                                            className="d-block w-100"
                                            src={
                                                process.env.REACT_APP_API_IMAGE +
                                                JSON.parse(item.HinhAnh)[0]
                                            }
                                            style={{ height: 300 }}
                                            alt="First slide"
                                        />
                                    )

                                    // <Product ProductIMG={JSON.parse(item.HinhAnh)} />
                                }
                                <ul className="product__item__pic__hover">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-heart" />
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/ProductDetail?IDSanPham=${item.id}`}
                                        >
                                            <i className="fa fa-retweet" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/Shop"
                                            onClick={(e) => {
                                                handleInfoCart(e, item)
                                            }}
                                        >
                                            <i className="fa fa-shopping-cart" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6>
                                    <Link to="/ProductDetail" onClick={() => HandleInfo(item.id)}>
                                        {truncateWords(item.Ten, 4, "...")}
                                    </Link>
                                </h6>
                                <h5>{(item.GiaGoc * 2).toLocaleString("en-US")}VND</h5>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )
}

export default List
