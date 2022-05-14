import {Link} from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Search from "../../components/Search"
import {AiOutlineMenu , AiFillSetting, AiFillCaretRight} from "react-icons/ai"
import {MdOutlineSettingsInputComponent, MdOutlineElectricalServices} from "react-icons/md"
import {FaCaravan} from "react-icons/fa"

import "./Header.style.css"
const Header = () => {
    return (
        <>
        <div className="header-container">
            <nav class="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
                <div class="container text-light">
                    <div class="w-100 d-flex justify-content-between">
                        <div>
                            <i class="fa fa-envelope mx-2"></i>
                            <a class="navbar-sm-brand text-light text-decoration-none" href="mailto:info@company.com">info@company.com</a>
                            <i class="fa fa-phone mx-2"></i>
                            <a class="navbar-sm-brand text-light text-decoration-none" href="tel:010-020-0340">010-020-0340</a>
                        </div>
                        <div>
                            <a class="text-light" href="https://fb.com/templatemo" target="_blank" rel="sponsored">
                                <i class="fab fa-facebook-f fa-sm fa-fw me-2"></i>
                            </a>
                            <a class="text-light" href="https://www.instagram.com/" target="_blank">
                                <i class="fab fa-instagram fa-sm fa-fw me-2"></i>
                            </a>
                            <a class="text-light" href="https://twitter.com/" target="_blank">
                                <i class="fab fa-twitter fa-sm fa-fw me-2"></i>
                            </a>
                            <a class="text-light" href="https://www.linkedin.com/" target="_blank">
                                <i class="fab fa-linkedin fa-sm fa-fw"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
                <Container className="navbar-item">
                    <Row style={{width: "100%", alignItem:"center", justifyContent:"center"}}>
                        <Col sm={2}>
                            <Link class="navbar-brand text-success logo h1 align-self-center" to={"/"}>
                                Tên shop
                            </Link>

                        </Col>
                        <Col md={8} style={{position: "relative", margin: "auto"}}>
                            <Search />
                        </Col>
                        <Col md={2} >
                            <div class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-center" id="templatemo_main_nav">
                                
                                <div class="navbar align-self-center d-flex">
                                    <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="inputMobileSearch" placeholder="Search ..."/>
                                            <div class="input-group-text">
                                                <i class="fa fa-fw fa-search"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
                                        <i class="fa fa-fw fa-search text-dark mr-2"></i>
                                    </a>
                                    <a class="nav-icon position-relative text-decoration-none" href="#">
                                        <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                                        <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">7</span>
                                    </a>
                                    <Link className="nav-login-title" to="/auth">
                                        Đăng nhập
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="menu-list">
                        <Col >
                            <label className="menu-list-toggle" for="menu-list-toggle-handler">
                                <div className="menu-list-toggle-icon">
                                    <AiOutlineMenu/>
                                </div>
                                <h3 className="menu-list-toggle-title">Danh mục</h3>    
                            </label>
                            <input type="checkbox" hidden  id="menu-list-toggle-handler" />
                            <div className="menu-list-data">
                                <label className="menu-list-toggle-base" for="menu-list-toggle-handler"></label>
                                <ul>
                                    <li>
                                        <div className="menu-list-data-cat-icon"><AiFillSetting /></div>
                                        <div className="menu-list-data-cat-title">Phụ tùng động cơ</div>
                                        <div className="menu-list-data-cat-icon-pointer"><AiFillCaretRight/></div>    
                                    </li>
                                    <li>
                                        <div className="menu-list-data-cat-icon"><MdOutlineSettingsInputComponent /></div>
                                        <div className="menu-list-data-cat-title">Phụ tùng máy gầm</div>   
                                        <div className="menu-list-data-cat-icon-pointer"><AiFillCaretRight/></div>   
                                    </li>
                                    <li>
                                        <div className="menu-list-data-cat-icon"><FaCaravan /></div>
                                        <div className="menu-list-data-cat-title">Phụ tùng thân - vỏ</div> 
                                        <div className="menu-list-data-cat-icon-pointer"><AiFillCaretRight/></div>  
                                    </li>
                                    <li>
                                        <div className="menu-list-data-cat-icon"><MdOutlineElectricalServices /></div>
                                        <div className="menu-list-data-cat-title">Phụ tùng điện</div>
                                        <div className="menu-list-data-cat-icon-pointer"><AiFillCaretRight/></div>  
                                    </li>
                                </ul>
                                <div>
                                    element
                                </div>
                            </div>
                        </Col>
                        <Col>

                        </Col>
                        <Col> Danh mục</Col>
                        <Col> Danh mục</Col>
                    </Row>
                </Container>
        </div>
        
        <div className="nav-space"></div>
        </>
    )
}

export default Header