import { useCallback, useState } from "react"
import CustommerAPI from "../../services/API/CustomerAPI"
import isEmty from "validator/lib/isEmpty"
import isEmail from "validator/lib/isEmail"
import { useNavigate } from "react-router-dom"
import Toast from "react-bootstrap/Toast"
import token from "../../services/utils/setToken"
import ToastContainer from "react-bootstrap/ToastContainer"
const RegisterComponent = () => {
    const navigate = useNavigate()
    const [notify, setNotify] = useState()
    const [account, setAccount] = useState({ HoTen: "", Email: "", MatKhau: "" })
    const [validated, setValidated] = useState("")
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
        const response = await CustommerAPI.register(account)
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

            return { show: true, success: false, message: "C?? l???i x???y ra, vui l??ng th??? l???i" }
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
    const onInputChange = useCallback((e) => {
        setAccount((account) => ({ ...account, [e.target.name]: e.target.value }))
    }, [])
    const validatedAll = () => {
        const nsg = {}
        //Ki???m tra email
        if (!isEmail(account.Email)) {
            nsg.Email = "Kh??ng ????ng ?????nh d???ng email"
        }
        //Ki???m tra password
        if (account.MatKhau.length < 6) {
            nsg.MatKhau = "M???t kh???u ph???i l???n h??n 6 k?? t???"
        }

        if (isEmty(account.Email)) {
            nsg.Email = "Vui l??ng nh???p email"
        }
        if (isEmty(account.MatKhau)) {
            nsg.MatKhau = "Vui l??ng nh???p m???t kh???u"
        }
        setValidated(nsg)
        if (Object.keys(nsg).length > 0) {
            return false
        }
        return true
    }
    return (
        <div>
            <div>
                <div className=" h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
                    <form className="wow zoomIn">
                        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                            <div className="space-y-4">
                                <h1 className="text-center text-2xl font-semibold text-gray-600">
                                    ????ng k?? t??i kho???n
                                </h1>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-1 text-gray-600 font-semibold"
                                    >
                                        H??? t??n
                                    </label>
                                    <input
                                        onChange={onInputChange}
                                        name="HoTen"
                                        type="text"
                                        placeholder="Full Name"
                                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                    />
                                </div>
                                <p className="text-red-400 text-xs italic">{validated.HoTen}</p>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-1 text-gray-600 font-semibold"
                                    >
                                        Email
                                    </label>
                                    <input
                                        onChange={onInputChange}
                                        placeholder="Email"
                                        name="Email"
                                        type="text"
                                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                    />
                                </div>
                                <p className="text-red-400 text-xs italic">{validated.Email}</p>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-1 text-gray-600 font-semibold"
                                    >
                                        M???t kh???u
                                    </label>
                                    <input
                                        onChange={onInputChange}
                                        name="MatKhau"
                                        type="password"
                                        required
                                        placeholder="Password"
                                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                    />
                                </div>
                                <p className="text-red-400 text-xs italic">{validated.MatKhau}</p>
                            </div>
                            <button
                                onClick={handleAcountSubmit}
                                className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
                            >
                                ????ng k??
                            </button>
                        </div>
                    </form>
                </div>
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
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
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
            </div>
        </div>
    )
}

export default RegisterComponent
