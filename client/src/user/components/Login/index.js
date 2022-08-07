import image from "../../assets/img/banner/banner-login.png"
import { useState, useEffect } from "react"
import isEmty from "validator/lib/isEmpty"
import isEmail from "validator/lib/isEmail"
import CustommerAPI from "../../services/API/CustomerAPI"
import { useNavigate, Link } from "react-router-dom"
import token from "../../services/utils/setToken"
import Toast from "react-bootstrap/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"
import GoogleLogin from "react-google-login"
import { gapi } from "gapi-script"
import { Redirect } from "react-router-dom"
const Logincomponents = () => {
   // localStorage.removeItem('USER_NAME')
    const navigate = useNavigate()
    const [account, setAccount] = useState({ Email: "", MatKhau: "" })
    const [validated, setValidated] = useState("")
    const [notify, setNotify] = useState()
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
          ? JSON.parse(localStorage.getItem('loginData'))
          : null
      );
    const InputOnChange = (e) => {
        setAccount((account) => ({ ...account, [e.target.name]: e.target.value }))
    }
    const handleAcountSubmit = async (event) => {
        const isvalidated = validatedAll()
        if (!isvalidated) {
            event.preventDefault()
            return
        }

        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            return
        }
        event.preventDefault()
        let UID = localStorage.getItem("UID")
        let SessionID = localStorage.getItem("SessionID")
        const response = await CustommerAPI.login(account)
        setNotify(() => {
            if (response) {
                if (!response.success) {
                    return {
                        show: true,
                        success: false,
                        message: response.message,
                        error: response.error,
                    }
                }
                if (response.error.length > 0) {
                    return {
                        show: true,
                        success: false,
                        message: response.message,
                        error: response.error,
                    }
                }
                if (response.success && response.error.length === 0) {
                    return {
                        show: false,
                        success: true,
                        message: response.message,
                        error: response.error,
                    }
                }
            }

            return { show: true, success: false, message: "Có lỗi xảy ra, vui lòng thử lại" }
        })
        const data = response.data[0]
        if (response) {
            if (response.success && response.error.length === 0) {
                if (data.token) {
                    token.setAuthToken(data.token)
                    localStorage.setItem("USER_NAME", data.HoTen)
                    localStorage.setItem("UID", data.id)
                    navigate("../Home")
                }
            }
        }
    }
    const validatedAll = () => {
        const nsg = {}
        //Kiểm tra email

        if (!isEmail(account.Email)) {
            nsg.Email = "Không đúng định dạng email"
        }
        //Kiểm tra password
        if (account.MatKhau.length < 6) {
            nsg.MatKhau = "Mật khẩu phải lớn hơn là 6 ký tự"
        }

        if (isEmty(account.Email)) {
            nsg.Email = "Vui lòng nhập email"
        }
        if (isEmty(account.MatKhau)) {
            nsg.MatKhau = "Vui lòng nhập mật khẩu"
        }
        setValidated(nsg)
        if (Object.keys(nsg).length > 0) {
            return false
        }
        return true
    }
    //google
    // useEffect(() => {
    //     function start() {
    //         gapi.client.init({
    //             clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //             scope: "email",
    //         })
    //     }
    //     gapi.load("client:auth2", start)
    // }, [])
    const onSuccess = async (googleData) => {
        const data = await CustommerAPI.loginGoogle(googleData)
        setLoginData(data)
        localStorage.setItem('USER_NAME',data.name)
        navigate('/shop')
    }
    const onFailure = (result) => {
        console.log(result.error)
    }
    const handleLogout = () => {
        localStorage.removeItem("loginData")
        setLoginData(null)
    }
    return (
        <div>
            <div className="py-6 wow zoomIn">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div
                        className="hidden lg:block lg:w-1/2 bg-cover "
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    />
                    <div className="w-full p-8 lg:w-1/2">
                        <p className="text-xl text-gray-600 text-center">Chào mừng trở lại!</p>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4" />
                            <a href="#" className="text-xs text-center text-gray-500 uppercase">
                                <h4>Đăng nhập</h4>
                            </a>
                            <span className="border-b w-1/5 lg:w-1/4" />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email"
                                required
                                name="Email"
                                onChange={InputOnChange}
                            />
                            <p style={{ color: "red" }}>{validated.Email}</p>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <Link to="/NewPassword" className="text-xs text-gray-500">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                                required
                                name="MatKhau"
                                onChange={InputOnChange}
                            />
                            <p style={{ color: "red" }}>{validated.MatKhau}</p>
                        </div>
                        <div className="mt-8">
                            <button
                                onClick={handleAcountSubmit}
                                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className="py-4 px-3">
                       
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    buttonText="Đăng Nhập bằng google"
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={"single_host_origin"}
                                />
                            
                        </div>
                        {/* <a
                            href="#"
                            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
                        >
                            <div className="px-4 py-3">
                                <svg
                                    className="w-6 h-6 text-blue-600 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>

                            </div>
                            <h6 className="px-4 py-3 w-5/6 text-center text-black font-bold">
                                Đăng nhập bằng faceBook
                            </h6>
                        </a> */}
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4" />
                            <Link to="/Register" className="text-xs text-gray-500 uppercase">
                                hoặc đăng ký
                            </Link>
                            <span className="border-b w-1/5 md:w-1/4" />
                        </div>
                    </div>
                </div>
            </div>
            {notify && (
                <ToastContainer position="bottom-end" className="p-3">
                    <Toast
                        bg="danger"
                        onClose={() => setNotify({ ...notify, show: false })}
                        show={notify.show}
                        delay={4000}
                        autohide
                    >
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Thông báo</strong>
                            <small className="text-muted">vừa xong</small>
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
        </div>
    )
}

export default Logincomponents
