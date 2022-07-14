import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import isEmty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail';
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import imgIcon from '../../assets/img/icon/icon2.png'
import CustommerAPI from "../../services/API/CustomerAPI";
const ValidateCheckout = () => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState([])
    const [notify, setNotify] = useState({show: false, message: ""})
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [listCity, setListCity] = useState([])
    const [listDistrict, setListDistrict]= useState([])
    const [listWard, setListWard] = useState([])
    const [address, setAddress] = useState({city: "", district: "", ward: "", home: ""})
useEffect(()=>{
    const fetchData=async()=>{
        setLoading(true)
        const user_id=searchParams.get('id')
        console.log(user_id)
    }
    fetchData()
},[])
    return (
        <Container >
            <Row>
                <Col ><h3><b style={{color:"red",textAlign:"center"}}>Thông Tin Khách Hàng</b></h3></Col>
            </Row>
            <hr></hr>
            <Row>
                <Col xs={8}>
                    <Form >
                        <Row className="mb-3" style={{ width: "100%" }}>
                            <Form.Group as={Col} md="6" controlId="user-name">
                                <Form.Label>Họ tên</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Tên nhà cung cấp"
                                    name="Ten"
                                   
                                />
                                <Form.Control.Feedback type="invalid">Tên không được để trống</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="user-name">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    required
                                    type="tel"
                                    placeholder="Số điện thoại liên lạc"
                                    name="SoDienThoai"
                                  
                                />
                                <Form.Control.Feedback type="invalid">Số điện thoại không được để trống</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3" style={{ width: "100%" }}>
                            <Form.Group as={Col} md="6" controlId="user-name">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    name="Email"
                                 
                                  
                                />
                                <Form.Control.Feedback type="invalid">Email không được để trống</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="user-name">
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="NgaySinh"

                                  
                                />
                            </Form.Group>

                        </Row>
                        <Row className="mb-3" style={{ width: "100%" }}>
                            <Form.Group as={Col} md="6" controlId="user-city">
                                <Form.Label>Tỉnh thành</Form.Label>
                                <Form.Select name="city" >
                                 
                                   
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="user-district">
                                <Form.Label>Quận/Huyện:</Form.Label>
                                <Form.Select aria-label="Default select example" name="district"  >
                                   
                                   
                                </Form.Select>
                            </Form.Group>

                        </Row>
                        <Row className="mb-3" style={{ width: "100%" }}>
                            <Form.Group as={Col} md="6" controlId="user-ward">
                                <Form.Label>Phường/Xã:</Form.Label>
                                <Form.Select aria-label="Default select example" name="ward"  >
                                   
                                   
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="user-home">
                                <Form.Label>Số nhà</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SoNha"
                               
                                 
                                />
                            </Form.Group>
                        </Row>

                        <Button type="submit">Cập Nhật</Button>
                    </Form>
                </Col>
                <Col xs={4}>
                    <Row></Row>
                    <Row> <Col><img src={imgIcon} /></Col></Row>
                </Col>
            </Row>
        </Container>
    );
}

export default ValidateCheckout;