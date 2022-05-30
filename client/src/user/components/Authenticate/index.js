import { Container, Content } from "./Authenticate.style"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react"
const Authenticate = () => {
    const [auth, setAuth] = useState(true)    
    return(
        <Container>
            <Content>
                <h3 className="auth-title">
                    {
                        auth ? "Đăng nhập": "Đăng ký"
                    }
                </h3>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    {
                        !auth && (
                            <>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control type="text" placeholder="nhập họ tên" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control type="text" placeholder="nhập số điện thoại" />
                                </Form.Group>
                            </>
                        )
                    }
                    
                    
                    <div className="auth-switch" onClick={()=> setAuth(!auth)}>
                        {
                            auth ? "Đăng ký tại đây" : "Đăng nhập tại đây"
                        }
                    </div>
                    <Button variant="primary" type="submit" >
                        {
                            auth? "Đăng nhập" : "Đăng ký"
                        }
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}
export default Authenticate