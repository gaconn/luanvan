import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap"
import categoryAPI from "../../../services/API/categoryAPI"
import productAPI from "../../../services/API/productAPI"
import supplierAPI from "../../../services/API/supplierAPI"
import { Container, Content } from "./ThemSanPham.style"

const ThemSanPham = () => {
    const [validated, setValidated] = useState(false)
    const [product, setProduct] = useState({ Ten: "" })
    const [insertNotify, setInsertNotify] = useState({ show: false, message: "" })
    const [category, setCategory] = useState([])
    const [supplier, setSupplier] = useState([])

    useEffect(() => {
        const fetchCategory = async () => {
            const categoryDataResponse = await categoryAPI.getAll()

            setCategory(() => {
                if (
                    !categoryDataResponse ||
                    !categoryDataResponse.success ||
                    !categoryDataResponse.data
                ) {
                    return []
                }
                return categoryDataResponse.data.data
            })
        }

        const fetchSupplier = async () => {
            const supplierDataResponse = await supplierAPI.getAll()
            setSupplier(() => {
                if (
                    !supplierDataResponse ||
                    !supplierDataResponse.success ||
                    !supplierDataResponse.data
                ) {
                    return []
                }
                return supplierDataResponse.data.data
            })
        }

        fetchCategory()
        fetchSupplier()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        var isValid = true
        if (form.checkValidity() === false) {
            isValid = false
        }
        setValidated(true)

        if (!isValid) return
        var isValidFile = true
        for (let i = 0; i < product.file?.length; i++) {
            const type = product.file[i].type.split("/")[0]

            if (type !== "image") {
                isValidFile = false
            }
        }
        setInsertNotify((n) => {
            if (!isValidFile) {
                return { show: true, message: "?????nh d???ng file h??nh kh??ng h???p l???", success: false }
            }
            return n
        })
        if (!isValidFile) return

        const arrObjKey = Object.keys(product)
        const formData = new FormData()
        for (let i = 0; i < arrObjKey.length; i++) {
            if (arrObjKey[i] === "file") {
                for (let index = 0; index < product[arrObjKey[i]].length; index++) {
                    formData.append("files", product[arrObjKey[i]][index])
                }
            } else {
                formData.append(arrObjKey[i], product[arrObjKey[i]])
            }
        }
        const response = await productAPI.insert(formData)

        setInsertNotify(() => {
            if (!response) {
                return { ...insertNotify }
            }
            return {
                ...insertNotify,
                show: true,
                message: response.message,
                success: response.success,
            }
        })
    }

    const onChangeInput = (e) => {
        setProduct((p) => ({ ...p, [e.target.name]: e.target.value }))
    }

    const uploadFileHandler = (e) => {
        setProduct((p) => {
            return { ...p, [e.target.name]: e.target.files }
        })
    }

    return (
        <Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg={insertNotify.success ? "success" : "danger"}
                    onClose={() => setInsertNotify({ ...insertNotify, show: false })}
                    show={insertNotify.show}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Th??ng b??o</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{insertNotify.message ? insertNotify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Content>
                <h3 className="text-center m-5">Th??m s???n ph???m</h3>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    className=" justify-content-center"
                >
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>T??n s???n ph???m</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="T??n s???n ph???m"
                                name="Ten"
                                value={product.Ten}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">
                                T??n kh??ng ???????c ????? tr???ng
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>Xu???t x???</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Xu???t x???"
                                name="XuatXu"
                                value={product.XuatXu}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">
                                Xu???t x??? kh??ng ???????c ????? tr???ng
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>K??ch th?????c</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="K??ch th?????c"
                                name="KichThuoc"
                                value={product.KichThuoc}
                                onChange={onChangeInput}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>C??n n???ng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="C??n n???ng"
                                name="CanNang"
                                value={product.CanNang}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>S??? l?????ng</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="S??? l????ng"
                                name="SoLuong"
                                value={product.SoLuong}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">
                                S??? l?????ng kh??ng ???????c ????? tr???ng
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>Gi?? g???c</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Gi?? g???c"
                                name="GiaGoc"
                                value={product.GiaGoc}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">
                                Gi?? kh??ng ???????c ????? tr???ng
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>M?? t???</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="H??y nh???p th??ng tin m?? t??? v??? s???n ph???m n??y."
                                style={{ height: "100px" }}
                                name="MoTa"
                                value={product.MoTa}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>Th??? lo???i</Form.Label>
                            <Form.Select
                                required
                                name="IDTheLoai"
                                value={product.IDTheLoai}
                                onChange={onChangeInput}
                            >
                                <option value="">Ch???n ng??nh h??ng</option>
                                {category &&
                                    category.length > 0 &&
                                    category.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>
                                                {item.Ten}
                                            </option>
                                        )
                                    })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng ch???n ng??nh h??ng
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>Nh?? cung c???p</Form.Label>
                            <Form.Select
                                required
                                name="IDNhaCungCap"
                                value={product.IDNhaCungCap}
                                onChange={onChangeInput}
                            >
                                <option value="">Ch???n nh?? cung c???p</option>
                                {supplier &&
                                    supplier.length > 0 &&
                                    supplier.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>
                                                {item.Ten}
                                            </option>
                                        )
                                    })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng ch???n nh?? cung c???p
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>H??nh ???nh</Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                multiple
                                onChange={uploadFileHandler}
                            />
                        </Form.Group>
                    </Row>
                    <Button type="submit">Th??m m???i</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default ThemSanPham
