import { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row, Table, Toast, ToastContainer } from "react-bootstrap"
import FilterContainer from "../../../components/FilterContainer"
import supplierAPI from "../../../services/API/supplierAPI"
import { Container, Content } from "./DanhSachNhaCungCap.style"
import Page from "../../../components/Page"
import { BsPencil } from "react-icons/bs"
import { MdDelete } from "react-icons/md"
import { useNavigate, useSearchParams } from "react-router-dom"
import { LinkSupplierAction } from "../../../configs/define"
import Loading from "../../../components/Loading"
const DanhSachNhaCungCap = () => {
    const [supplier, setSupplier] = useState([])
    const [notify, setNotify] = useState({ show: false, message: "", success: false })
    const [page, setPage] = useState({ rowCount: 0, now: 1, next: null, prev: null })
    const [del, setDel] = useState({ show: false, id: null })
    const [loading, setLoading] = useState(false)
    const [supplierFilter, setSupplierFilter] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    let navigate = useNavigate()
    const fetchSupplier = async (objCondition) => {
        setLoading(true)
        const supplierResponse = await supplierAPI.getAll(objCondition)
        setSupplier(supplierResponse.data)
        setNotify((notify) => {
            if (!supplierResponse.success) {
                return {
                    show: true,
                    message: supplierResponse.message,
                    success: supplierResponse.success,
                }
            }
            return notify
        })
        setPage((page) => {
            if (supplierResponse.success) {
                if (supplierResponse.data.rowCount) {
                    let next = page.now * 10 < supplierResponse.data.rowCount ? page.now + 1 : null
                    let prev = page.now > 1 ? page.now - 1 : null
                    return { ...page, rowCount: supplierResponse.data.rowCount, next, prev }
                }
            }
            return { ...page }
        })
        setLoading(false)
    }
    useEffect(() => {
        const objCondition = { page: page.now }
        const id = searchParams.get("id")
        const name = searchParams.get("name")
        const status = searchParams.get("status")
        if (id) {
            objCondition.id = id
        }
        if (name) {
            objCondition.Ten = name
        }
        if (status) {
            objCondition.TrangThai = status
        }
        fetchSupplier(objCondition)
    }, [page.now, searchParams])
    const onClickPageHandler = (e) => {
        const pageValue = e.target.innerText * 1
        const nextPage = pageValue * 10 < page.rowCount ? pageValue + 1 : null
        const prevPage = pageValue > 1 ? pageValue - 1 : null
        setPage({ ...page, now: pageValue, prev: prevPage, next: nextPage })
    }
    const handleDeleteAlertClose = () => {
        setDel({ ...del, show: false })
    }
    const handleDeleteAccept = async () => {
        const deleteSupplierResponse = await supplierAPI.delete(del.id)
        setDel({ ...del, show: false }) //???n dialog
        setNotify(() => {
            if (!deleteSupplierResponse || !deleteSupplierResponse.success) {
                return {
                    ...notify,
                    show: true,
                    message: "C?? l???i x???y ra. Vui l??ng th??? l???i",
                    success: false,
                }
            }
            return {
                ...notify,
                show: true,
                message: deleteSupplierResponse.message,
                success: deleteSupplierResponse.success,
                errors: deleteSupplierResponse.errors,
            }
        })

        setSupplier(() => {
            if (deleteSupplierResponse.success) {
                var tmpSupplier = [...supplier.data]
                tmpSupplier = tmpSupplier.filter((item) => item.id !== del.id)
                return { data: tmpSupplier, rowCount: supplier.rowCount - 1 }
            }
            return { ...supplier }
        })
    }
    const onControlClick = (e, id, action) => {
        if (action === "update") {
            navigate(LinkSupplierAction.supplier_update + `?id=${id}`, { replace: true })
            return
        }

        setDel({ ...del, show: true, id: id })
    }

    // filter
    const searchHandler = () => {
        const dataFilter = { ...supplierFilter }
        const condition = new URLSearchParams(dataFilter).toString()
        setSearchParams(condition)
    }

    const unsearchHandler = () => {
        setSearchParams("")
        setSupplierFilter({})
    }

    const changeFilterHandler = (e) => {
        setSupplierFilter((supplierFilter) => {
            return { ...supplierFilter, [e.target.name]: e.target.value }
        })
    }
    return (
        <Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg={notify.success ? "success" : "danger"}
                    onClose={() => setNotify({ ...notify, show: false })}
                    show={notify.show}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Th??ng b??o</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{notify.message ? notify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>
            <FilterContainer handleSearch={searchHandler} handleUnsearch={unsearchHandler}>
                <Form className="filter-form p-4">
                    <Row className="mb-3">
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    ID nh?? cung c???p
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="ID nh?? cung c???p"
                                        className="fs-6"
                                        name="id"
                                        value={supplierFilter.id ? supplierFilter.id : ""}
                                        onChange={changeFilterHandler}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    T??n nh?? cung c???p
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="T??n nh?? cung c???p"
                                        className="fs-6"
                                        name="id"
                                        value={supplierFilter.Ten ? supplierFilter.Ten : ""}
                                        onChange={changeFilterHandler}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    Tr???ng th??i
                                </Form.Label>
                                <Col>
                                    <Form.Select
                                        aria-label="Default select example"
                                        defaultValue=""
                                        name="status"
                                        value={supplierFilter.status ? supplierFilter.status : ""}
                                        onChange={changeFilterHandler}
                                    >
                                        <option value="">Ch???n tr???ng th??i</option>
                                        <option value="0">Kh??ng ho???t ?????ng</option>
                                        <option value="1">Ho???t ?????ng</option>
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
                            <th>T??n</th>
                            <th>Tr???ng th??i</th>
                            <th>S??? l?????ng s???n ph???m</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplier &&
                            supplier.data &&
                            supplier.data.map &&
                            supplier.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.Ten}</td>
                                        <td
                                            className={
                                                item.TrangThai === 1
                                                    ? "text-primary"
                                                    : "text-danger"
                                            }
                                        >
                                            {item.TrangThai === 1 ? "Ho???t ?????ng" : "Ng??ng ho???t ?????ng"}
                                        </td>
                                        <td>{item.SoLuongSanPham}</td>
                                        <td className="d-flex">
                                            <span
                                                className="supplier-item-icon"
                                                onClick={(e) =>
                                                    onControlClick(e, item.id, "update")
                                                }
                                            >
                                                <BsPencil />
                                            </span>
                                            <span
                                                className="supplier-item-icon"
                                                onClick={(e) =>
                                                    onControlClick(e, item.id, "delete")
                                                }
                                            >
                                                <MdDelete />
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
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
                    <Modal.Title>C???nh b??o</Modal.Title>
                </Modal.Header>
                <Modal.Body>B???n c?? ch???c ch???n mu???n x??a ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteAlertClose}>
                        Quay l???i
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccept}>
                        X??a
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default DanhSachNhaCungCap
