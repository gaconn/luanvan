import { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row, Table, Toast, ToastContainer } from "react-bootstrap"
import { BsPencil } from "react-icons/bs"
import { MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import FilterContainer from "../../../components/FilterContainer"
import Loading from "../../../components/Loading"
import Page from "../../../components/Page"
import { LinkCategoryAction } from "../../../configs/define"
import categoryAPI from "../../../services/API/categoryAPI"
import { Container, Content } from "./DanhSachTheLoai.style"

const DanhSachTheLoai = () => {
    const [category, setCategory] = useState([])
    const [notify, setNotify] = useState({show: false, message: "", success: false})
    const [page, setPage] = useState({rowCount: 0, now: 1, next: null, prev: null})
    const [del, setDel] = useState({show: false, id: null})
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    useEffect(()=> {
        const fetchCategory = async() => {
            setLoading(true)
            const supplierResponse = await categoryAPI.getAll(page.now)
            setCategory(supplierResponse.data)
            setNotify((notify)=> {
                if(!supplierResponse.success) {
                    return {show: true, message: supplierResponse.message, success: supplierResponse.success}
                }
                return notify
            })
            setPage((page) => {
                if(supplierResponse.success) {
                    if(supplierResponse.data.rowCount) {
                        let next = (page.now) * 10 < supplierResponse.data.rowCount ? page.now+1: null
                        let prev = page.now > 1 ? page.now -1 : null
                        return {...page,rowCount: supplierResponse.data.rowCount, next, prev}       
                    }
                }
                return {...page}
            })
            setLoading(false)
        }
        fetchCategory()
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
        const deleteCategoryResponse = await categoryAPI.delete(del.id)
        setDel({...del, show: false}) //ẩn dialog
        setNotify(() => {
            if(!deleteCategoryResponse || !deleteCategoryResponse.success) {
                return {...notify, show: true, message: "Có lỗi xảy ra. Vui lòng thử lại", success: false}
            }
            return {...notify, show: true, message: deleteCategoryResponse.message, success: deleteCategoryResponse.success, errors: deleteCategoryResponse.errors}
        })

        setCategory(() => {
            if(deleteCategoryResponse.success) {
                var tmpCategory = [...category.data]
                tmpCategory= tmpCategory.filter((item)=> item.id !== del.id)
                return {data: tmpCategory, rowCount: category.rowCount -1}
                
            }
            return {...category}
        })
    }
    const onControlClick = (e, id, action) => {
        if(action === "update") {
            navigate(LinkCategoryAction.category_update+`?id=${id}`, {replace:true})
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
                            <th>Tên</th>
                            <th>Trạng thái</th>
                            <th>Số lượng sản phẩm</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category && category.data && category.data.map && category.data.map((item, index)=> {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.Ten}</td>
                                        <td className={item.TrangThai === 1 ? "text-primary": "text-danger"}>{item.TrangThai === 1 ? "Hoạt động" : "Ngưng hoạt động"}</td>
                                        <td>{item.SoLuongSanPham}</td>
                                        <td>
                                            <span className="category-item-icon" onClick={(e)=> onControlClick(e,item.id, "update")}><BsPencil/></span>
                                            <span className="category-item-icon" onClick={(e)=> onControlClick(e,item.id, "delete")}><MdDelete/></span>
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

export default DanhSachTheLoai