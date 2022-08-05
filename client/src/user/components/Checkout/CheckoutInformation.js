import Modal from "react-bootstrap/Modal"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Row, Form, Button, Toast, ToastContainer } from "react-bootstrap"
import CustommerAPI from "../../services/API/CustomerAPI"
import addressAPI from "../../../admin/services/API/addressAPI"
import { formatDateForInput } from "../../services/utils/GenerateUtil"
import orderAPI from "../../services/API/orderAPI"
const CheckoutInformation = ({ OrderCheckout, InfoCheckout }) => {
    const [validated, setValidated] = useState(false)
    const [user, setUser] = useState([])
    const [notify, setNotify] = useState({ show: false, message: "" })
    const [searchParams, setSearchParams] = useSearchParams()
    const [listCity, setListCity] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])
    const [address, setAddress] = useState({ city: "", district: "", ward: "" })
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [DiaChi, setDiaChi] = useState({})
    const user_id = localStorage.getItem("UID")
    const fetchData = async (user_id) => {
        if (!user_id && user_id === undefined) {
            return
        }
        const response = await CustommerAPI.getCustomerDetail({ id: user_id })
        // if (OrderCheckout) {
        //     OrderCheckout.HoTen = response.data[0].HoTen
        //     OrderCheckout.NgaySinh = response.data[0].NgaySinh
        //     OrderCheckout.SoDienThoai = response.data[0].SoDienThoai
        //     OrderCheckout.TinhThanh = response.data[0].TinhThanh
        //     OrderCheckout.QuanHuyen = response.data[0].QuanHuyen
        //     OrderCheckout.PhuongXa = response.data[0].PhuongXa
        //     OrderCheckout.SoNha = response.data[0].SoNha
        //     const addressUser =
        //         OrderCheckout.TinhThanh +
        //         "," +
        //         OrderCheckout.QuanHuyen +
        //         "," +
        //         OrderCheckout.PhuongXa +
        //         "," +
        //         OrderCheckout.SoNha
        //     setDiaChi({ ...DiaChi, addressUser })
        // }
        setUser((user) => {
            if (response && (!response.success || response.data.length === 0)) {
                return user
            }
            return response.data[0]
        })
        setNotify((notify) => {
            if (response && (!response.success || response.data.length === 0)) {
                return { ...notify, show: true, message: "Không tìm thấy dữ liệu", success: false }
            }
            return { ...notify }
        })
    }
    useEffect(() => {
        fetchData(user_id)
    }, [searchParams])
    //City
    useEffect(() => {
        const fetAllCity = async () => {
            const response = await addressAPI.getAllCity()
            setNotify((notify) => {
                if (!response) {
                    return {
                        show: true,
                        message: "Không thể lấy dữ liệu tỉnh thành",
                        success: false,
                    }
                }
                return notify
            })
            setListCity((listCity) => {
                if (response) return response
                return listCity
            })
        }
        fetAllCity()
    }, [])
    //District
    useEffect(() => {
        const fetchDistrict = async () => {
            var response
            if (address.city !== "") {
                let arrData = address.city.split("-")
                let code = arrData ? arrData[0] : 1
                response = await addressAPI.getDistrictByCityCode({ code: code })
            }

            setListDistrict((district) => {
                if (response && response.districts) {
                    return response.districts
                }
                return []
            })
        }
        fetchDistrict()
    }, [address.city])
    //Ward
    useEffect(() => {
        const fetchWard = async () => {
            var response
            if (address.district !== "") {
                let arrData = address.district.split("-")
                let code = arrData ? arrData[0] : 1
                response = await addressAPI.getWardByDistrictCode({ code })
            }
            setListWard((ward) => {
                if (response && response.wards) {
                    return response.wards
                }
                return []
            })
        }
        fetchWard()
    }, [address.district])

    //get input
    const onChangeInput = (e) => {
        setUser((user) => {
            if (e.target.name === "NgaySinh") {
                return { ...user, [e.target.name]: new Date(e.target.value).getTime() / 1000 }
            }
            return { ...user, [e.target.name]: e.target.value }
        })
    }
    // Address
    const changeAddressHandler = (e) => {
        setAddress((arr) => {
            if (e.target.name === "city")
                return { ...arr, [e.target.name]: e.target.value, district: "", ward: "" }
            if (e.target.name === "district")
                return { ...arr, [e.target.name]: e.target.value, ward: "" }
            return { ...arr, [e.target.name]: e.target.value }
        })
    }

    //Submit
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

        if (address.city) {
            const arrCity = address.city.split("-")
            const strCity = arrCity && arrCity[1] ? arrCity[1] : ""
            user.TinhThanh = strCity
        }
        if (address.district) {
            const arrDistrict = address.district.split("-")
            const strDistrict = arrDistrict && arrDistrict[1] ? arrDistrict[1] : ""
            user.QuanHuyen = strDistrict
        }
        if (address.ward) {
            const arrWard = address.ward.split("-")
            const strWard = arrWard && arrWard[1] ? arrWard[1] : ""
            user.PhuongXa = strWard
        }
        OrderCheckout.HoTen = user.HoTen
        OrderCheckout.NgaySinh = user.NgaySinh
        OrderCheckout.SoDienThoai = user.SoDienThoai
        OrderCheckout.TinhThanh = user.TinhThanh
        OrderCheckout.QuanHuyen = user.QuanHuyen
        OrderCheckout.PhuongXa = user.PhuongXa
        OrderCheckout.SoNha = user.SoNha
        InfoCheckout(false)
        //const responseOrder = await orderAPI.checkout(OrderCheckout)
        const response = await CustommerAPI.updateInformation(user)
        InfoCheckout(true)
        setNotify(() => {
            if (!response) {
                return { ...notify }
            }
            return { ...notify, show: true, message: response.message, success: response.success }
        })
        const addressUser =
            OrderCheckout.TinhThanh +
            "," +
            OrderCheckout.QuanHuyen +
            "," +
            OrderCheckout.PhuongXa +
            "," +
            OrderCheckout.SoNha
        setDiaChi({ ...DiaChi, addressUser })
        //const responseOrder = await CustommerAPI.getCustomerDetail({ id: OrderCheckout.IDTaiKhoan })
        // const data=user
    }

    return (
        <>
            {/* component */}
            <ToastContainer
                position="bottom-end"
                className="p-3 position-fixed"
                style={{ zIndex: "10" }}
            >
                <Toast
                    bg={notify.success ? "success" : "danger"}
                    onClose={() => setNotify({ ...notify, show: false })}
                    show={notify.show}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Thông báo</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>Xác nhận thông tin thành công</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="max-w-md py-4 px-4 bg-white shadow-lg rounded-lg my-10 w-2/3">
                <div className="flex justify-center md:justify-end -mt-16">
                    <img
                        className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                        src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    />
                </div>
                <div>
                    <h2 className="text-gray-800 text-3xl font-semibold">
                        Thông tin khách đặt hàng
                    </h2>
                    {OrderCheckout.SoDienThoai &&
                    OrderCheckout.TinhThanh &&
                    OrderCheckout.QuanHuyen &&
                    OrderCheckout.PhuongXa &&
                    OrderCheckout.SoNha ? (
                        <>
                            {OrderCheckout.HoTen && (
                                <p className="mt-3 text-gray-700 text-sm ">
                                    {" "}
                                    HoTen : <label>{OrderCheckout.HoTen}</label>
                                </p>
                            )}
                            {OrderCheckout.SoDienThoai && (
                                <p className="mt-3 text-gray-700 text-sm ">
                                    {" "}
                                    Số điện thoại : <label>{OrderCheckout.SoDienThoai}</label>
                                </p>
                            )}
                            {DiaChi && (
                                <p className="mt-3 text-gray-700 text-sm ">
                                    {" "}
                                    Địa Chỉ Nhận Hàng : <label>{DiaChi.addressUser}</label>
                                </p>
                            )}
                        </>
                    ) : (
                        <>
                            <p className="mt-2 text-gray-600">
                                Quý khách vui lòng xác nhận thông tin đơn hàng
                            </p>
                        </>
                    )}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleShow}
                        type="button"
                        className="text-xl font-medium  border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                    >
                        {!OrderCheckout.SoDienThoai &&
                        !OrderCheckout.TinhThanh &&
                        !OrderCheckout.QuanHuyen &&
                        !OrderCheckout.PhuongXa &&
                        !OrderCheckout.SoNha
                            ? "Xác nhận thông tin đơn hàng"
                            : "Cập nhật thông tin đặt hàng"}
                    </button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông Tin Đơn Đặt Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3" style={{ width: "100%" }}>
                            <Form.Group controlId="user-name">
                                <Form.Label>Họ tên</Form.Label>
                                <Form.Control
                                    required
                                    onChange={onChangeInput}
                                    type="text"
                                    placeholder="Họ tên"
                                    name="HoTen"
                                    disabled
                                    value={user.HoTen ? user.HoTen : ""}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập họ tên chính xác
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="user-name">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    required
                                    onChange={onChangeInput}
                                    type="tel"
                                    placeholder="Số điện thoại liên lạc"
                                    name="SoDienThoai"
                                    value={user.SoDienThoai ? user.SoDienThoai : ""}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập số điện thoại. Số điện thoại được sử dụng để liên
                                    lạc khi hàng được giao tới.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3" style={{ width: "100%" }}>
                            <Form.Group controlId="user-name">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    onChange={onChangeInput}
                                    type="email"
                                    placeholder="Email"
                                    name="Email"
                                    value={user.Email ? user.Email : ""}
                                    disabled
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập email chính xác.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="user-name">
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="NgaySinh"
                                    value={
                                        formatDateForInput(user.NgaySinh * 1000)
                                            ? formatDateForInput(user.NgaySinh * 1000)
                                            : ""
                                    }
                                    onChange={onChangeInput}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập ngày sinh.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3" style={{ width: "100%" }}>
                            <Form.Group controlId="user-city">
                                <Form.Label>Tỉnh thành</Form.Label>
                                <Form.Select name="city" required onChange={changeAddressHandler}>
                                    <option value=" ">
                                        {user.TinhThanh ? user.TinhThanh : ""}
                                    </option>
                                    {listCity &&
                                        listCity.map((city, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`${city.code}-${city.name}`}
                                                >
                                                    {city.name}
                                                </option>
                                            )
                                        })}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng chọn tỉnh thành.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="user-district">
                                <Form.Label>Quận/Huyện:</Form.Label>
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    name="district"
                                    onChange={changeAddressHandler}
                                >
                                    <option value=" ">
                                        {user.QuanHuyen ? user.QuanHuyen : ""}
                                    </option>
                                    {listDistrict &&
                                        listDistrict.map((discrict, k) => {
                                            return (
                                                <option
                                                    key={k}
                                                    value={`${discrict.code}-${discrict.name}`}
                                                >
                                                    {discrict.name}
                                                </option>
                                            )
                                        })}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng chọn quận huyện .
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3" style={{ width: "100%" }}>
                            <Form.Group controlId="user-ward">
                                <Form.Label>Phường/Xã:</Form.Label>
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    name="ward"
                                    onChange={changeAddressHandler}
                                >
                                    <option value=" ">{user.PhuongXa ? user.PhuongXa : " "}</option>
                                    {listWard &&
                                        listWard.map((ward, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`${ward.code}-${ward.name}`}
                                                >
                                                    {ward.name}
                                                </option>
                                            )
                                        })}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng chọn phường xã.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="user-name">
                                <Form.Label>Số nhà</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="SoNha"
                                    value={user.SoNha ? user.SoNha : ""}
                                    onChange={onChangeInput}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập địa chỉ nhà
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" onClick={handleClose}>
                                Xác nhận thông tin
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CheckoutInformation
