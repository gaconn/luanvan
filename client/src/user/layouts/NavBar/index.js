import Navbar from "react-bootstrap/Navbar";
import Row from 'react-bootstrap/Row'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

const NavbarHeader = () => {
    return (
        <>
            <Navbar bg="light" expand="lg" sticky="top" >
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Row >
                            <Col lg>
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link href="#action1">Home</Nav.Link>
                                    <Nav.Link href="#action2">Shop</Nav.Link>
                                    <Nav.Link href="#action1">Contact</Nav.Link>
                                    <Nav.Link href="#action2">Blog</Nav.Link>

                                </Nav>
                            </Col>
                            <Col lg ></Col>
                            <Col lg>
                                <NavDropdown title="Account" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">
                                        <div className="header__top__right__auth">
                                            <a href="#">
                                                <i class="fa fa-user-plus" aria-hidden="true"></i> Register
                                            </a>
                                        </div>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        <div className="header__top__right__auth">
                                            <a href="#">
                                                <i className="fa fa-user" size='100' /> Login
                                            </a>
                                        </div>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        <div className="header__top__right__auth">
                                            <a href="#">
                                                <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
                                            </a>
                                        </div>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Col>
                        </Row>


                    </Navbar.Collapse>

                </Container>
            </Navbar>


        </>
    );
}

export default NavbarHeader;