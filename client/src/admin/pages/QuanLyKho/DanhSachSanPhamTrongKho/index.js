import { Container, Content } from "./DanhSachSanPhamTrongKho.style";
import Table from "react-bootstrap/Table"
import FilterContainer from "../../../components/FilterContainer";
import {Form, Row, Col, Pagination} from 'react-bootstrap'

const DanhSachSanPhamTrongKho = () => {
    return <Container>
        <FilterContainer>
            <Form className="filter-form">
                <Row className="mb-3">
                    <Col>
                        <Row>
                            <Form.Label column="lg" lg={4} className="fs-6">
                                ID sản phẩm
                            </Form.Label>
                            <Col>
                                <Form.Control size="lg" type="text" placeholder="Large text" className="fs-6" />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Form.Label column="lg" lg={4} className="fs-6">
                                Nhà cung cấp
                            </Form.Label>
                            <Col>
                                <Form.Select aria-label="Default select example">
                                    <option>Chọn nhà cung cấp</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Form.Label column="lg" lg={4} className="fs-6">
                                Loại sản phẩm
                            </Form.Label>
                            <Col>
                                <Form.Select aria-label="Default select example">
                                    <option>Chọn nhà cung cấp</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Form.Label column="lg" lg={4} className="fs-6">
                                Trạng thái
                            </Form.Label>
                            <Col>
                                <Form.Select aria-label="Default select example">
                                    <option>Chọn nhà cung cấp</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </FilterContainer>
        <Content>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Trạng thái</th>
                        <th>Số lượng</th>
                        <th>Thời gian nhập hàng</th>
                        <th>Giá gốc</th>
                        <th>Nhà cung cấp</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
            <Pagination className="justify-content-center">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </Content>
    </Container>
}

export default DanhSachSanPhamTrongKho