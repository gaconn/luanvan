import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Dropdown from "react-bootstrap/Dropdown"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import token from "../../services/utils/setToken"
import { FaUserAlt } from "react-icons/fa"
import "./icon.css"
import iconImg from "../../assets/img/icon/icon2.png"
import { useEffect, useState } from "react"
import categoryAPI from "../../services/API/CategoryAPI"
import TreeNavBar from "./TreeNavBar"
import ListItem from "./ListItem"
import Section from "../Section"
import CartAPI from "../../services/API/Cart"
import { logout } from "../../services/utils/auth"
import uniqid from "uniqid"
import Offcanvas from "react-bootstrap/Offcanvas"
import Accordion from "react-bootstrap/Accordion"
const NavbarHeader = () => {
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [show, setShow] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [cart, setCart] = useState({})
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const logoutHandler = () => {
        logout()
        token.deleteToken()
        navigate("/Home", { replace: true })
    }
    useEffect(() => {
        const fetchDataDanhMuc = async () => {
            const response = await categoryAPI.getTree()
            setCategory(response.data)
        }
        fetchDataDanhMuc()
    }, [])
    const handleIDCategory = (id) => {
        const params = new URLSearchParams({ IDTheLoai: id }).toString()
        if (location.pathname !== "Shop") {
            navigate("Shop?" + params)
        } else setSearchParams(params)
    }
    // const ListChild = (item) => {
    //     // if (item.listChild && !item.listChild.listChild) {
    //     //     return <ListItem listChild={item.listChild} handlerID={handleIDCategory} />
    //     // }
    //     return <TreeNavBar listChild={item.listChild} handlerIDItem={handleIDCategory} />
    // }
    const checkInformation = () => {
        if (localStorage.getItem("UID")) {
            navigate(`/InformationCustomer?id=${localStorage.getItem("UID")}`)
        }
    }

    //cart
    const fetchCart = async () => {
        var response
        if (localStorage.getItem("UID")) {
            response = await CartAPI.GetCart({ IDTaiKhoan: localStorage.getItem("UID") })
        } else if (localStorage.getItem("SessionID")) {
            response = await CartAPI.GetCart({ SessionID: localStorage.getItem("SessionID") })
        } else {
            let session = uniqid()
            const SessionID = localStorage.setItem("SessionID", session)
            response = await CartAPI.GetCart({ SessionID: SessionID })
        }
        setCart(() => {
            if (!response || response.success === false || response.data.length === 0) {
                return {}
            }
            return response.data[0]
        })
    }
    useEffect(() => {
        fetchCart()
    }, [searchParams])

    return (
        <>
            <Navbar bg="light" variant="light" expand="sm" sticky="top">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={iconImg} style={{ width: 150, height: 100 }} />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-4 my-lg-4 grid grid-cols-3 gap-4 header1"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link href="/Shop">Cửa hàng</Nav.Link>
                            <Nav.Link href="/Contact">Liên hệ</Nav.Link>
                            {/* <Nav.Link>
                                <ul className="menu-items">
                                    <li>
                                        Danh mục
                                        <div className="mega-menu">
                                            <div className="content">
                                                {
                                                    category && category.map && category.map((item, k) => (
                                                        <div className="col" key={k}>
                                                            <section>
                                                                <h2 onClick={() => { handleIDCategory(item.id) }}>{item.Ten}</h2>
                                                                <ul className="mega-links">
                                                                    {ListChild(item)}
                                                                </ul>
                                                            </section>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </Nav.Link> */}
                            <Nav.Link variant="primary" onClick={handleShow}>
                                Danh mục
                            </Nav.Link>
                            <Nav.Link href="/Blog">Bản tin</Nav.Link>
                        </Nav>

                        <Navbar.Brand href="Cart">
                            <button type="button" className="icon-button">
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                <span className="icon-button__badge">
                                    {cart.SoLuongSanPham ? cart.SoLuongSanPham : 0}
                                </span>
                            </button>
                        </Navbar.Brand>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant=""
                                id="dropdown-button-dark-example1"
                                className="d-flex align-items-center"
                            >
                                <FaUserAlt />
                                <div className="p-1">
                                    {localStorage.getItem("USER_NAME") &&
                                    localStorage.getItem("UID")
                                        ? localStorage.getItem("USER_NAME")
                                        : "Tài khoản"}
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                                {!localStorage.getItem("UID") ? (
                                    <>
                                        <Dropdown.Item href="/Login">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                            &nbsp;Đăng nhập
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/Register">
                                            <i className="fa fa-user-plus" aria-hidden="true"></i>
                                            &nbsp; Đăng ký
                                        </Dropdown.Item>
                                    </>
                                ) : (
                                    <>
                                        <Dropdown.Item onClick={checkInformation} active>
                                            Thông tin khách hàng
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={logoutHandler}>
                                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                                            &nbsp;Đăng xuất
                                        </Dropdown.Item>
                                    </>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-center"> Danh mục</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {category &&
                        category.map &&
                        category.map((item, k) => (
                            <>
                                <Accordion defaultActiveKey="0" key={k}>
                                    <Accordion.Item>
                                        <Accordion.Header>
                                            <h5
                                                onClick={() => {
                                                    handleIDCategory(item.id)
                                                }}
                                            >
                                                {item.Ten}
                                            </h5>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <TreeNavBar
                                                listChild={item.listChild}
                                                handlerIDItem={handleIDCategory}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </>
                        ))}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default NavbarHeader
