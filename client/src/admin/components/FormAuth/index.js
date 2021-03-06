import { Container, Content } from "./Authenticate.style"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import userAPI from "../../services/API/userAPI"
import { useState } from "react"
import ToastContainer from "react-bootstrap/ToastContainer"
import Toast from "react-bootstrap/Toast"
import token from "../../services/utils/token"
import { useNavigate } from "react-router-dom"
const Authenticate = () => {
    const [validated, setValidated] = useState(false)
    const [account, setAccount] = useState({ Email: "", MatKhau: "" })
    const [notify, setNotify] = useState()
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            return
        }
        setValidated(true)
        event.preventDefault()
        const objLoginResponse = await userAPI.login(account)

        const data = objLoginResponse.data[0]
        if (objLoginResponse) {
            if (objLoginResponse.success && objLoginResponse.error.length === 0) {
                if (data.token) {
                    localStorage.setItem("USER_NAME", data.HoTen)
                    localStorage.setItem("USER_LEVEL", data.IDCapDoTaiKhoan)
                    localStorage.setItem("TOKEN", data.token)
                    token.setToken(data.token)
                    navigate("../home")
                }
            }
        }

        setNotify(() => {
            if (objLoginResponse) {
                if (!objLoginResponse.success) {
                    return {
                        show: true,
                        success: false,
                        message: objLoginResponse.message,
                        error: objLoginResponse.error,
                    }
                }
                if (objLoginResponse.error.length > 0) {
                    return {
                        show: true,
                        success: false,
                        message: objLoginResponse.message,
                        error: objLoginResponse.error,
                    }
                }
                return {
                    show: false,
                    success: true,
                    message: objLoginResponse.message,
                    error: objLoginResponse.error,
                }
            }

            return { show: true, success: false, message: "C?? l???i x???y ra, vui l??ng th??? l???i" }
        })
    }

    const onChangeValue = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }
    return (
        <Container>
            <Content>
                <h3 className="auth-title">????ng nh???p</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required
                            name="Email"
                            value={account.Email}
                            onChange={onChangeValue}
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui l??ng nh???p ????ng ?????a ch??? email
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>M???t kh???u</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            name="MatKhau"
                            value={account.MatKhau}
                            onChange={onChangeValue}
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui l??ng nh???p m???t kh???u
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="auth-button">
                        <Button variant="success" type="submit">
                            ????ng nh???p
                        </Button>
                    </div>
                </Form>
            </Content>
            {notify && (
                <ToastContainer position="top-end" className="p-3">
                    <Toast
                        bg="danger"
                        onClose={() => setNotify({ ...notify, show: false })}
                        show={notify.show}
                        delay={4000}
                        autohide
                    >
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Th??ng b??o</strong>
                            <small className="text-muted">v???a xong</small>
                        </Toast.Header>
                        <Toast.Body>
                            <h5 className="notify-message">{notify.message}</h5>
                            {notify.error.length > 0 &&
                                notify.error.map((item, index) => {
                                    return (
                                        <div key={index} className="notify-error">
                                            {item}
                                        </div>
                                    )
                                })}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </Container>
    )
}
export default Authenticate
