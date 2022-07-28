import { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import uniqid from 'uniqid';
import CartAPI from "../../services/API/Cart";
import LoadingPage from '../Loading'

const List = ({ Product, LoadingProduct }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    // if(LoadingProduct){
    //     return <LoadingPage/>
    // }
    const HandleInfo = (item) => {
        localStorage.setItem('DetailID', item)
    };
    const handleInfoCart = async (item) => {
        let SessionID = localStorage.getItem('SessionID')
        let UID = localStorage.getItem('UID')
        if (!UID) {
            if (!SessionID) {
                let session = uniqid()
                SessionID = localStorage.setItem('SessionID', session)

            }
           
            const addToCart = CartAPI.AddToCart({ IDSanPham: item.id, SoLuong: 1, SessionID: SessionID })
        }
        else {
            const addToCart = CartAPI.AddToCart({ IDSanPham: item.id, SoLuong: 1, IDTaiKhoan:UID })
        }
        const params = new URLSearchParams({updateCart: new Date().getTime()}).toString()
        setSearchParams(params)
    }
    return (
        <>

            {
                Product && Product.map && Product.map((item, k) => (
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
                                        <a href='b' onClick={(e) => { 
                                                e.preventDefault()
                                                handleInfoCart(item)}
                                                } >
                                            <i className="fa fa-shopping-cart" />
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