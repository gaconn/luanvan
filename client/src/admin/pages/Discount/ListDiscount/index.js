import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table, Toast, ToastContainer } from "react-bootstrap";
import FilterContainer from "../../../components/FilterContainer";
import discountAPI from "../../../services/API/discountAPI";
import { Container, Content } from "./ListDiscount.style";
import Page from "../../../components/Page";
import {BsPencil} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import {useNavigate, useSearchParams} from "react-router-dom"
import { LinkDiscountAction } from "../../../configs/define"
import Loading from "../../../components/Loading";
import { targetDiscount, toTimeString } from "../../../services/utils/General";
const ListDiscount = () => {
    const [discount, setDiscount] = useState([])
    const [notify, setNotify] = useState({show: false, message: "", success: false})
    const [page, setPage] = useState({rowCount: 0, now: 1, next: null, prev: null})
    const [del, setDel] = useState({show: false, id: null})
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    const fetchDiscount = async() => {
        setLoading(true)
        const discountResponse = await discountAPI.getList(page.now)
        setDiscount(discountResponse.data)
        setNotify((notify)=> {
            if(!discountResponse.success) {
                return {show: true, message: discountResponse.message, success: discountResponse.success}
            }
            return notify
        })
        setPage((page) => {
            if(discountResponse.success) {
                if(discountResponse.data.rowCount) {
                    let next = (page.now) * 10 < discountResponse.data.rowCount ? page.now+1: null
                    let prev = page.now > 1 ? page.now -1 : null
                    return {...page,rowCount: discountResponse.data.rowCount, next, prev}       
                }
            }
            return {...page}
        })
        setLoading(false)
    }
    useEffect(()=> {
        fetchDiscount()
    },[page.now])
    const onClickPageHandler = (e) => {
        const pageValue = e.target.innerText *1;
        const nextPage= pageValue *10 <page.rowCount ? pageValue + 1 : null
        const prevPage = pageValue > 1 ? pageValue -1 : null
        setPage({...page, now: pageValue, prev: prevPage, next: nextPage})
    }
    const handleDeleteAlertClose = () => {
        setDel({...del, show: false})
    }
    const handleDeleteAccept = async() => {
        const deleteDiscountResponse = await discountAPI.delete(del.id)
        setDel({...del, show: false}) //ẩn dialog
        setNotify(() => {
            if(!deleteDiscountResponse) {
                return {...notify, show: true, message: "Có lỗi xảy ra. Vui lòng thử lại", success: false}
            }
            return {...notify, show: true, message: deleteDiscountResponse.message, success: deleteDiscountResponse.success, errors: deleteDiscountResponse.errors}
        })
        fetchDiscount()

    }
    const onControlClick = (e, id, action) => {
        if(action === "update") {
            navigate(LinkDiscountAction.discount_update+`?id=${id}`, {replace:true})
            return
        }

        setDel({...del, show: true, id: id})
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
                                        Trạng thái
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
                            <th>Tên chương trình</th>
                            <th>Bắt đầu</th>
                            <th>Kết thúc</th>
                            <th>Đối tượng</th>
                            <th>Trạng thái</th>
                            <th>Mã giảm giá</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discount && discount.map((item, index)=> {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.TenChuongTrinh}</td>
                                        <td style={{minWidth: "150px"}}>{toTimeString(item.ThoiGianBatDau*1000)}</td>
                                        <td style={{minWidth: "150px"}}>{toTimeString(item.ThoiGianKetThuc * 1000)}</td>
                                        <td style={{minWidth: "200px"}}>{targetDiscount(item)}</td>
                                        <td className={item.TrangThai === 1 ? "text-primary": "text-danger"}>{item.TrangThai === 1 ? "Hoạt động" : "Vô hiệu hóa"}</td>
                                        <td>{item.MaChietKhau}</td>
                                        <td className="d-flex" style={{maxWidth: "60px"}}>
                                            <span className="discount-item-icon" onClick={(e)=> onControlClick(e,item.id, "update")}><BsPencil/></span>
                                            <span className="discount-item-icon" onClick={(e)=> onControlClick(e,item.id, "delete")}><MdDelete/></span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Content>
            {page && <Page page={page} onClickPage={onClickPageHandler} />}
            <Modal
                show={del.show}
                onHide={handleDeleteAlertClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        Bạn có chắc chắn muốn xóa ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteAlertClose}>
                    Quay lại
                </Button>
                <Button variant="danger" onClick={handleDeleteAccept}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )

}
export default ListDiscount