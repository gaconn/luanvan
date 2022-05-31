import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const NavbarHeader = () => {
    return (
        <>
            <Navbar bg="light" expand="lg" sticky="top">
                <Container fluid>
                    <Navbar.Brand href="Home">Automotive Parts</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        <Row>
                            <Col sm></Col>
                            <Col sm>
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/Shop">Shop</Nav.Link>
                                    <Nav.Link href="/Contact">Contact</Nav.Link>
                                    <Nav.Link href="/Blog">Blog</Nav.Link>
                                </Nav>

                            </Col>
                            <Col sm>
                                <Dropdown >
                                    <Dropdown.Toggle variant='info' id="dropdown-button-dark-example1" >
                                        My Account
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu variant="dark">
                                        <Dropdown.Item href="#/action-1" active>
                                            Customer information
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">My order</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Manage return and exchange orders</Dropdown.Item>
                                        <Dropdown.Item href="/Login"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;Login</Dropdown.Item>
                                        <Dropdown.Item href="/Register"><i className="fa fa-user-plus" aria-hidden="true"></i>&nbsp; Register</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="/Logout"><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown></Col>
                        </Row>

                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>
    );
}

export default NavbarHeader;