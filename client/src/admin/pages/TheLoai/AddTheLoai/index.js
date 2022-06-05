import { useState } from "react";
import { Button, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import categoryAPI from "../../../services/API/categoryAPI";
import { Container, Content } from "./AddTheLoai.style";

const AddTheLoai = () => {
    const [validated, setValidated] = useState(false);
    const [category, setCategory] = useState({Ten:""})
    const [insertNotify, setInsertNotify] = useState({show: false, message: ""})

    const handleSubmit = async(event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        var isValid = true
        if (form.checkValidity() === false) {
            isValid =false
        }
        setValidated(true);

        if(!isValid) return

        const response = await categoryAPI.insert(category)
        
        setInsertNotify(() =>{ 
            if(!response) {
                return {...insertNotify}
            }
            return {...insertNotify, show: true, message: response.message, success: response.success}
        })
    };
  
    const onChangeInput = (e) => {
        setCategory({[e.target.name]: e.target.value})
    }
    return(
        <Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast bg={insertNotify.success ? "success": "danger"} onClose={()=> setInsertNotify({...insertNotify, show: false})} show={insertNotify.show} delay={3000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Thông báo</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>{insertNotify.message ? insertNotify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Content>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="category-name">
                            <Form.Label>Tên nhà cung cấp</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Tên nhà cung cấp"
                                name="Ten"
                                value={category.Ten}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Tên không được để trống</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    
                    <Button type="submit">Thêm mới</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default AddTheLoai