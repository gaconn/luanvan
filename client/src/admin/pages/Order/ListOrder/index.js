import { useEffect, useState } from "react";
import { Col, Form, Row, Table, Toast, ToastContainer } from "react-bootstrap";
import FilterContainer from "../../../components/FilterContainer";
import { Container, Content } from "./ListOrder.style";
import Page from "../../../components/Page";
import {AiOutlineFileSearch} from 'react-icons/ai'
import {useNavigate} from "react-router-dom"
import { LinkOrderAction } from "../../../configs/define"
import Loading from "../../../components/Loading";
import orderAPI from "../../../services/API/orderAPI";
import { StatusOrder } from "../../../services/utils/General";
const ListOrder = () => {
    const [order, setOrder] = useState([])
    const [notify, setNotify] = useState({show: false, message: "", success: false})
    const [page, setPage] = useState({rowCount: 0, now: 1, next: null, prev: null})
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    useEffect(()=> {
        const fetchOrder = async() => {
            setLoading(true)
            const orderResponse = await orderAPI.getAll({page: page.now})
            console.log(orderResponse);
            setOrder(() => {
                if(orderResponse && orderResponse.success && orderResponse.data && orderResponse.data[0]) {
                    return orderResponse.data[0]
                }
                return []
            })
            setNotify((notify)=> {
                if(!orderResponse.success) {
                    return {show: true, message: orderResponse.message, success: orderResponse.success}
                }
                return notify
            })
            setPage((page) => {
                if(orderResponse.success && orderResponse.data && orderResponse.data[1]) {
                    if(orderResponse.data[1].rowCount) {
                        let next = (page.now) * 10 < orderResponse.data[1].rowCount ? page.now+1: null
                        let prev = page.now > 1 ? page.now -1 : null
                        return {...page,rowCount: orderResponse.data[1].rowCount, next, prev}       
                    }
                }
                return {...page}
            })
            setLoading(false)
        }
        fetchOrder()
    },[page.now])
    const onClickPageHandler = (e) => {
        const pageValue = e.target.innerText *1;
        const nextPage= pageValue *10 <page.rowCount ? pageValue + 1 : null
        const prevPage = pageValue > 1 ? pageValue -1 : null
        setPage({...page, now: pageValue, prev: prevPage, next: nextPage})
    }
    if(loading) {
        return <Loading />
    }
    return (
        <Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast bg={notify.success ? "success": "danger"} onClose={()=> setNotify({...notify, show: false})} show={notify.show} delay={3000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Thông báo</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>{notify.message ? notify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>
                <FilterContainer>
                    <Form className="filter-form">
                        <Row className="mb-3">
                            <Col>
                                <Row>
                                    <Form.Label column="lg" lg={4} className="fs-6">
                                        ID Nhà cung cấp
                                    </Form.Label>
                                    <Col>
                                        <Form.Control size="lg" type="text" placeholder="Large text" className="fs-6" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Form.Label column="lg" lg={4} className="fs-6">
                                        Tên cung cấp
                                    </Form.Label>
                                    <Col>
                                        <Form.Control size="lg" type="text" placeholder="Large text" className="fs-6" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Form.Label column="lg" lg={4} className="fs-6">
                                        
                                    </Form.Label>
                                    <Col>
                                        <Form.Select aria-label="Default select example">
                                            <option>Chọn trạng thái</option>
                                            <option value="0">Hoạt động</option>
                                            <option value="1">Ngưng hoạt động</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </FilterContainer>
            <Content>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thông tin đặt hàng</th>
                            <th>Trạng thái</th>
                            <th>Thời gian đặt hàng</th>
                            <th>Giá trị đơn hàng</th>
                            <th>Khuyến mãi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order && order.map((item, index)=> {
                                
                                var createdDate = new Date(item.ThoiGianTao * 1000)
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            <span>{item.ThongTinDatHang && item.ThongTinDatHang.Email ? item.ThongTinDatHang.Email : item.TaiKhoan_Email}</span> <br/>
                                            <span>{item.ThongTinDatHang && item.ThongTinDatHang.SoDienThoai ? item.ThongTinDatHang.SoDienThoai : item.TaiKhoan_SoDienThoai}</span>
                                        </td>
                                        <td className={"text-danger"}>{StatusOrder[item.TrangThai]}</td>
                                        <td>{`${createdDate.getDate()} / ${createdDate.getMonth()} / ${createdDate.getFullYear()}`}</td>
                                        <td>{item.TongGiaTriDonHang}</td>
                                        <td style={{color: "red"}}>{item.MaChietKhau ? item.MaChietKhau : "Không"}</td>
                                        <td className="d-flex" style={{height: "100%"}}>
                                            <span className="order-item-icon" onClick={()=>navigate(`../detail?${item.id}`)}><AiOutlineFileSearch/></span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Content>
            {page && <Page page={page} onClickPage={onClickPageHandler} />}
        </Container>
    )

}
export default ListOrder