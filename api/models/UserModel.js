const dbconnect = require("./DBConnection")
const GeneralUtil = require("../utils/GeneralUtil")
const ResponseUtil = require("../utils/ResponseUtil")
const bcrypt = require("bcrypt")
const { buildFieldQuery, _buildSelect, object_filter } = require("../utils/DBUtil")
const jwt = require("jsonwebtoken")
const mailConfig = require("../utils/mailConfig/mailConfig")
const { checkIsEmptyObject } = require("../utils/GeneralUtil")
const { sendMail2, contactFormat } = require("../utils/mailerUtil")
const dotenv = require("dotenv")
dotenv.config()
class UserModel {
    constructor() {
        this.table = "taikhoan"
    }
    add = async (objUserInfo) => {
        if (GeneralUtil.checkIsEmptyObject(objUserInfo)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], [])
        }
        let arrError = []
        if (!objUserInfo.SoDienThoai) {
            arrError.push("Số điện thoại không được để trống")
        }
        if (!objUserInfo.Email) {
            arrError.push("Email không được bỏ trống")
        }

        if (!GeneralUtil.checkValidEmail(objUserInfo.Email)) {
            arrError.push("Email không hợp lệ")
        }

        if (!GeneralUtil.checkIsValidPassword(objUserInfo.MatKhau)) {
            arrError.push("Password phải lớn hơn 6 ký tự")
        }
        // if (!GeneralUtil.checkIsEmptyArray(arrError)) {
        //     return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], arrError)
        // }
        try {
            const arrGetAccountResult = await dbconnect.query(
                "select * from taikhoan where  Email = ? Limit 1",
                [objUserInfo.Email]
            )
            if (arrGetAccountResult.length === 0)
                return ResponseUtil.response(false, "Lỗi hệ thống")
            if (arrGetAccountResult[0].length > 0)
                return ResponseUtil.response(false, "Email đã tồn tại")

            //format
            const hashedPassword = await GeneralUtil.hashPassword(objUserInfo.MatKhau)
            const objData = {
                HoTen: objUserInfo.HoTen ? objUserInfo.HoTen : "",
                NgaySinh: objUserInfo.NgaySinh ? objUserInfo.NgaySinh : null,
                SoDienThoai: objUserInfo.SoDienThoai,
                Email: objUserInfo.Email,
                MatKhau: hashedPassword,
                TinhThanh: objUserInfo.TinhThanh,
                QuanHuyen: objUserInfo.QuanHuyen,
                PhuongXa: objUserInfo.PhuongXa,
                SoNha: objUserInfo.SoNha,
                ThoiGianTao: new Date().getTime() / 1000,
                DaXoa: 0,
                IDCapDoTaiKhoan: 4,
            }

            const fields = buildFieldQuery(objData)
            const arrFields = fields.split(",")

            if (arrFields.length === 0) {
                throw new Error("field không hợp lệ")
            }
            var arrValues = []
            for (let i = 0; i < arrFields.length; i++) {
                arrValues.push(objData[arrFields[i].trim()])
            }

            if (arrValues.length === 0) {
                throw new Error("Values không hợp lệ")
            }
            const query = `insert into taikhoan(${fields}) values(?)`
            const arrAddUserResult = await dbconnect.query(query, [arrValues])

            if (arrAddUserResult[0].affectedRows > 0) {
                const token = jwt.sign(
                    {
                        Email: objData.Email,
                        DaXoa: objData.DaXoa,
                        IDCapDoTaiKhoan: objData.IDCapDoTaiKhoan,
                    },
                    process.env.JSON_WEB_TOKEN_SECRET_KEY,
                    { expiresIn: "24h" }
                )
                return ResponseUtil.response(true, "Tạo tài khoản thành công", token)
            }
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }

    get = async (objCondition) => {
        if (!objCondition || Object.keys(objCondition).length === 0) {
            return ResponseUtil.response(false, "Tham số không hợp lệ")
        }
        const page = objCondition.page ? objCondition.page : 1
        const offsetStart = (page - 1) * 10
        try {
            var strWhere = this._buildWhereQuery(objCondition)
            var strSelect = "select 1"
            var strJoin = ""
            strSelect += _buildSelect(["*"], this.table)

            if (objCondition.joinPermission) {
                strJoin += ` left join capdotaikhoan on ${this.table}.IDCapDoTaiKhoan = capdotaikhoan.id`
                var arrFieldUserLevelSelect = ["Ten", "TrangThai"]

                strSelect += _buildSelect(
                    arrFieldUserLevelSelect,
                    "capdotaikhoan",
                    "CapDoTaiKhoan_"
                )
            }

            const query = `${strSelect} from ${this.table} ${strJoin} ${strWhere} limit 10 offset ${offsetStart}`
            const result = await dbconnect.query(query)

            if (!result || !result[0]) {
                throw new Error("Lỗi kết nối database")
            }
            if (objCondition.count) {
                const countUser = await dbconnect.query(
                    `select COUNT(id) rowCount from ${this.table} ${strWhere}`
                )

                if (!countUser || !countUser[0]) {
                    throw new Error("Lỗi kết nối database")
                }
                return ResponseUtil.response(true, "Thành công", [result[0], countUser[0][0]])
            }
            return ResponseUtil.response(true, "Thành công", result[0])
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }
    //findbyEmail
    findbyEmail = async (objCondition) => {
        if (!objCondition || Object.keys(objCondition).length === 0) {
            return ResponseUtil.response(false, "Tham số không hợp lệ")
        }
        try {
            var strWhere = this._buildWhereQuery(objCondition)
            var strSelect = "select 1"
            var strJoin = ""
            strSelect += _buildSelect(["*"], this.table)
            if (objCondition.joinPermission) {
                strJoin += ` left join capdotaikhoan on ${this.table}.IDCapDoTaiKhoan = capdotaikhoan.id`
                var arrFieldUserLevelSelect = ["Ten", "TrangThai"]

                strSelect += _buildSelect(
                    arrFieldUserLevelSelect,
                    "capdotaikhoan",
                    "CapDoTaiKhoan_"
                )
            }

            const query = `${strSelect} from ${this.table} ${strJoin} ${strWhere} limit 1`
            const response = await dbconnect.query(query)
            if (!response || !response[0]) {
                throw new Error("Lỗi kết nối database")
            }
            if (objCondition.count) {
                const countUser = await dbconnect.query(
                    `select COUNT(id) rowCount from ${this.table} ${strWhere}`
                )
                if (!countUser || !countUser[0]) {
                    throw new Error("Lỗi kết nối database")
                }
                return ResponseUtil.response(true, "Thành công", [response[0], countUser[0][0]])
            }
            return ResponseUtil.response(true, "Thành công", response[0])
        } catch (error) {
            return ResponseUtil.response(
                false,
                "Lỗi hệ thống, Vui lòng liên hệ chăm sóc khách hàng.",
                [],
                [error.message]
            )
        }
    }
    loginGoogle = async (objUserInfo) => {
        if (GeneralUtil.checkIsEmptyObject(objUserInfo)) {
            return ResponseUtil.response(false, "Dữ liệu truyền vào không hợp lệ")
        }
        if (!GeneralUtil.checkValidEmail(objUserInfo.Email)) {
            return ResponseUtil.response(false, "Email không hợp lệ")
        }
        try {
            const objData = {
                HoTen: objUserInfo.HoTen,
                NgaySinh: objUserInfo.NgaySinh ? objUserInfo.NgaySinh : null,
                Email: objUserInfo.Email,
                SoDienThoai: objUserInfo.SoDienThoai ? objUserInfo.SoDienThoai : null,
                MatKhau: objUserInfo.MatKhau ? objUserInfo.MatKhau : null,
                TinhThanh: objUserInfo.TinhThanh ? objUserInfo.TinhThanh : null,
                QuanHuyen: objUserInfo.QuanHuyen ? objUserInfo.QuanHuyen : null,
                PhuongXa: objUserInfo.PhuongXa ? objUserInfo.PhuongXa : null,
                SoNha: objUserInfo.SoNha ? objUserInfo.SoNha : null,
                IDCapDoTaiKhoan: 4,
                ThoiGianTao: new Date().getTime() / 1000,
                DaXoa: 0,
                Token: objUserInfo.Token ? objUserInfo.Token : null,
                Image: objUserInfo.Image ? objUserInfo.Image : null,
                joinPermission: true,
            }
            var strWhere = this._buildWhereQuery(objData)
            var strSelect = "select 1"
            var strJoin = ""
            strSelect += _buildSelect(["*"], this.table)
            if (objData.joinPermission) {
                strJoin += ` left join capdotaikhoan on ${this.table}.IDCapDoTaiKhoan = capdotaikhoan.id`
                var arrFieldUserLevelSelect = ["Ten", "TrangThai"]
                strSelect += _buildSelect(
                    arrFieldUserLevelSelect,
                    "capdotaikhoan",
                    "CapDoTaiKhoan_"
                )
            }
            const query = `${strSelect} from ${this.table} ${strJoin} ${strWhere} limit 1`
            const dataExist = await dbconnect.query(query)
            if (dataExist && dataExist[0] && dataExist[0].length > 0) {
                return ResponseUtil.response(true, "Đăng nhập thành công", { ...dataExist[0] })
            }
        } catch (error) {
            return ResponseUtil.response(false, "Lỗi hệ thống", [], [error.message])
        }
    }
    login = async (objDataUser) => {
        if (GeneralUtil.checkIsEmptyObject(objDataUser)) {
            return ResponseUtil.response(false, "Dữ liệu truyền vào không hợp lệ")
        }

        if (!GeneralUtil.checkValidEmail(objDataUser.Email)) {
            return ResponseUtil.response(false, "Email không hợp lệ")
        }

        if (!GeneralUtil.checkIsValidPassword(objDataUser.MatKhau)) {
            return ResponseUtil.response(false, "Mật khẩu không hợp lệ")
        }
        try {
            const query = "select * from taikhoan where Email = ? and DaXoa = 0 limit 1 "
            const result = await dbconnect.query(query, objDataUser.Email)
            if (!result[0] || result[0].length === 0) {
                return ResponseUtil.response(
                    true,
                    "Đăng nhập không thành công",
                    [],
                    ["Email hoặc mật khẩu không chính xác"]
                )
            }

            const objUserInfo = result[0][0]
            const isValidPassword = await GeneralUtil.verifyPassword(
                objDataUser.MatKhau,
                objUserInfo.MatKhau
            )

            if (!isValidPassword) {
                return ResponseUtil.response(
                    true,
                    "Đăng nhập không thành công",
                    [],
                    ["Mật khẩu không chính xác"]
                )
            }

            if (GeneralUtil.checkIsEmptyObject(objUserInfo)) {
                return ResponseUtil.response(
                    true,
                    "Đăng nhập không thành công",
                    [],
                    ["Email hoặc mật khẩu không chính xác"]
                )
            }

            // nếu có Remember thì giữ đăng nhập 1 tháng, nếu không có thì giữ đăng nhập 1 ngày
            const token = jwt.sign(
                {
                    Email: objUserInfo.Email,
                    DaXoa: objUserInfo.DaXoa,
                    IDCapDoTaiKhoan: objUserInfo.IDCapDoTaiKhoan,
                },
                process.env.JSON_WEB_TOKEN_SECRET_KEY,
                { expiresIn: 60 * 60 * 24 * 30 }
            )
            delete objUserInfo.MatKhau
            return ResponseUtil.response(true, "Đăng nhập thành công", [{ ...objUserInfo, token }])
        } catch (error) {
            return ResponseUtil.response(false, "Lỗi hệ thống", [], [error.message])
        }
    }

    _buildWhereQuery = (objCondition) => {
        var strWhere = " where 1=1 "
        if (objCondition.id) {
            strWhere += ` and ${this.table}.id = ${objCondition.id}`
        }

        if (objCondition.Email) {
            strWhere += ` and ${this.table}.Email = '${objCondition.Email}'`
        }

        if (objCondition.SoDienThoai) {
            strWhere += ` and ${this.table}.SoDienThoai = ${objCondition.SoDienThoai}`
        }

        if (objCondition.hasOwnProperty("IDCapDoTaiKhoan")) {
            strWhere += ` and ${this.table}.IDCapDoTaiKhoan = ${objCondition.IDCapDoTaiKhoan}`
        }

        if (objCondition.hasOwnProperty("DaXoa")) {
            strWhere += ` and ${this.table}.DaXoa = ${objCondition.DaXoa}`
        }
        if (objCondition.hasOwnProperty("TrangThai")) {
            strWhere += ` and ${this.table}.TrangThai = ${objCondition.TrangThai}`
        }
        if (objCondition.hasOwnProperty("ProviderName")) {
            strWhere += ` and ${this.table}.ProviderName = '${objCondition.ProviderName}'`
        }
        if (objCondition.hasOwnProperty("Image")) {
            strWhere += ` and ${this.table}.Image = '${objCondition.Image}'`
        }
        return strWhere
    }
    //Custommer
    addCustomer = async (objUserInfo) => {
        if (GeneralUtil.checkIsEmptyObject(objUserInfo)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], [])
        }
        let arrError = []
        if (!objUserInfo.HoTen) {
            arrError.push("Họ tên không được để trống")
        }

        if (!objUserInfo.Email) {
            arrError.push("Email không được bỏ trống")
        }
        if (!objUserInfo.MatKhau) {
            arrError.push("Mật khẩu không được bỏ trống")
        }
        if (!GeneralUtil.checkValidEmail(objUserInfo.Email)) {
            arrError.push("Email không hợp lệ")
        }

        if (!GeneralUtil.checkIsValidPassword(objUserInfo.MatKhau)) {
            arrError.push("Password phải lớn hơn 6 ký tự")
        }
        if (!GeneralUtil.checkIsEmptyArray(arrError)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], arrError)
        }
        try {
            const arrGetAccountResult = await dbconnect.query(
                "select * from taikhoan where  Email = ? and IDCapDoTaiKhoan = 4 Limit 1",
                [objUserInfo.Email]
            )
            if (arrGetAccountResult.length === 0)
                return ResponseUtil.response(false, "Lỗi hệ thống")
            if (arrGetAccountResult[0].length > 0)
                return ResponseUtil.response(false, "Email đã tồn tại")

            //format
            const hashedPassword = await GeneralUtil.hashPassword(objUserInfo.MatKhau)
            const objData = {
                HoTen: objUserInfo.HoTen,
                NgaySinh: objUserInfo.NgaySinh ? objUserInfo.NgaySinh : null,
                Email: objUserInfo.Email,
                SoDienThoai: objUserInfo.SoDienThoai ? objUserInfo.SoDienThoai : null,
                MatKhau: hashedPassword,
                TinhThanh: objUserInfo.TinhThanh ? objUserInfo.TinhThanh : null,
                QuanHuyen: objUserInfo.QuanHuyen ? objUserInfo.QuanHuyen : null,
                PhuongXa: objUserInfo.PhuongXa ? objUserInfo.PhuongXa : null,
                SoNha: objUserInfo.SoNha ? objUserInfo.SoNha : null,
                IDCapDoTaiKhoan: 4,
                ThoiGianTao: new Date().getTime() / 1000,
                DaXoa: 0,
            }

            const fields = buildFieldQuery(objData)
            const arrFields = fields.split(",")

            if (arrFields.length === 0) {
                throw new Error("field không hợp lệ")
            }
            var arrValues = []
            for (let i = 0; i < arrFields.length; i++) {
                arrValues.push(objData[arrFields[i].trim()])
            }

            if (arrValues.length === 0) {
                throw new Error("Values không hợp lệ")
            }
            const query = `insert into taikhoan(${fields}) values(?)`
            const arrAddUserResult = await dbconnect.query(query, [arrValues])

            if (arrAddUserResult[0].affectedRows > 0) {
                const token = jwt.sign(
                    {
                        Email: objData.Email,
                        DaXoa: objData.DaXoa,
                        IDCapDoTaiKhoan: objData.IDCapDoTaiKhoan,
                    },
                    process.env.JSON_WEB_TOKEN_SECRET_KEY,
                    { expiresIn: "24h" }
                )
                return ResponseUtil.response(true, "Tạo tài khoản thành công", [
                    { ...objData, token },
                ])
            }
        } catch (error) {
            return ResponseUtil.response(
                false,
                "Lỗi hệ thống, Vui lòng liên hệ chăm sóc khách hàng.",
                [],
                [error.message]
            )
        }
    }

    //resetpassword
    resetPassword = async (data, MatKhauRS) => {
        if (GeneralUtil.checkIsEmptyObject(data)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], [])
        }
        let arrError = []
        if (!data.Email) {
            arrError.push("Email không được bỏ trống")
        }
        if (!GeneralUtil.checkValidEmail(data.Email)) {
            arrError.push("Email không hợp lệ")
        }
        if (!GeneralUtil.checkIsValidPassword(MatKhauRS)) {
            arrError.push("Password phải lớn hơn 6 ký tự")
        }
        if (!GeneralUtil.checkIsEmptyArray(arrError)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], arrError)
        }
        try {
            const hashPassword = GeneralUtil.hashPassword(MatKhauRS)
            //find by mail
            const dataVerify = { Email: data.Email, ThoiGian: new Date(), MatKhau: hashPassword }
            const queryfind =
                "select * from taikhoan where Email = ? and IDCapDoTaiKhoan = 4 limit 1 "
            const responsefind = await dbconnect.query(queryfind, dataVerify.Email)

            if (responsefind[0].length == 0) {
                return ResponseUtil.response(false, "Tài khoản chưa đăng ký", [], [])
            }
            if (responsefind[0].length > 0) {
                {
                    const query =
                        "UPDATE taikhoan SET MatKhau = ?,ThoiGianCapNhat=?  WHERE Email = ? and IDCapDoTaiKhoan = 4"
                    const response = await dbconnect.query(query, [
                        dataVerify.MatKhau,
                        dataVerify.ThoiGian,
                        dataVerify.Email,
                    ])
                    if (response[0].affectedRows > 0) {
                        const token = jwt.sign({ Email: data.Email }, mailConfig.JSON, {
                            expiresIn: "24h",
                        })
                        return ResponseUtil.response(true, "Mật khẩu mới đã được gửi đến mail", [
                            { ...dataVerify, token },
                        ])
                    }
                    return ResponseUtil.response(false, "Lỗi hệ thống cập nhật mật khẩu")
                }
            }
        } catch (error) {
            return ResponseUtil.response(
                false,
                "Lỗi hệ thống, Vui lòng liên hệ chăm sóc khách hàng.",
                [],
                [error.message]
            )
        }
    }
    contact= async (objUserInfo)=>{
        if (GeneralUtil.checkIsEmptyObject(objUserInfo)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], [])
        }
        let arrError = []
        if (!objUserInfo.HoTen) {
            arrError.push("Họ tên không được để trống")
        }
      
        if (!objUserInfo.Email) {
            arrError.push("Email không được bỏ trống")
        }
        if (!objUserInfo.Message) {
            arrError.push("Tin nhắn không được để trống")
        }
        if (!objUserInfo.SoDienThoai) {
            arrError.push("Số điện thoại không được để trống")
        }
        if (!GeneralUtil.checkValidEmail(objUserInfo.Email)) {
            arrError.push("Email không hợp lệ")
        }
        if (!GeneralUtil.checkIsValidPhone(objUserInfo.SoDienThoai)) {
            arrError.push("Số điện thoại phải 10 số")
        }
        if (!GeneralUtil.checkIsEmptyArray(arrError)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], arrError)
        }
        try {
            
           const objContact={
            HoTen:objUserInfo.HoTen,
            Email:objUserInfo.Email,
            SoDienThoai:objUserInfo.SoDienThoai,
            Message:objUserInfo.Message
           }
           const html = contactFormat(objContact)
            if(html){
                const send= await sendMail2(objContact.Email,`Tin nhắn từ khách hàng tên ${objContact.HoTen}`,html)
                return ResponseUtil.response(true, 'Đã gửi thông tin liên hệ đến nhân viên phụ trách thành công ')    
            }   
        } catch (error) {
            return ResponseUtil.response(false, error.message, [], [error])
        }
    }

    update = async (objData, objCondition) => {
        const error = []
        if (checkIsEmptyObject(objData)) {
            error.push("Dữ liệu cần sửa không hợp lệ")
        }
        if (checkIsEmptyObject(objCondition)) {
            error.push("Thiếu điều kiện cập nhật")
        }

        if (error.length > 0) {
            return ResponseUtil.response(false, "Dữ liệu không hợp lệ", [], error)
        }

        try {
            var dataUpdate = {
                HoTen: objData.HoTen ? objData.HoTen : undefined,
                Email: objData.Email ? objData.Email : undefined,
                SoDienThoai: objData.SoDienThoai ? objData.SoDienThoai : undefined,
                NgaySinh: objData.NgaySinh ? objData.NgaySinh : undefined,
                TinhThanh: objData.TinhThanh ? objData.TinhThanh : undefined,
                QuanHuyen: objData.QuanHuyen ? objData.QuanHuyen : undefined,
                PhuongXa: objData.PhuongXa ? objData.PhuongXa : undefined,
                SoNha: objData.SoNha ? objData.SoNha : undefined,
                TrangThai: objData.TrangThai ? objData.TrangThai : undefined,
                IDCapDoTaiKhoan: objData.IDCapDoTaiKhoan ? objData.IDCapDoTaiKhoan : undefined,
                ThoiGianCapNhat: new Date().getTime() / 1000,
            }

            dataUpdate = object_filter(dataUpdate)
            const query = `update taikhoan set ? where ?`

            const arrDataResponse = await dbconnect.query(query, [dataUpdate, objCondition])

            if (!arrDataResponse || !arrDataResponse[0]) {
                return ResponseUtil.response(
                    false,
                    "Truy xuất database không thành công",
                    [],
                    ["Có lỗi xảy ra khi truy xuất database"]
                )
            }
            if (arrDataResponse[0].affectedRows === 0) {
                return ResponseUtil.response(false, "Thất bại")
            }
            return ResponseUtil.response(true, "Sửa dữ liệu tài khoản thành công")
        } catch (error) {
            return ResponseUtil.response(false, error.message, [], [error])
        }
    }

    delete = async (id) => {
        if(!id) {
            return ResponseUtil.response(false, 'Tham số không hợp lệ')
        }
        try {
            const query = `delete from taikhoan where id = ?`
            const response = await dbconnect.query(query, id)
            if(response[0].affectedRows === 0) {
                return ResponseUtil.response(false, 'Xóa thất bại, không thể xóa do có dữ liệu liên quan')
            }
            return ResponseUtil.response(true, "thành công")
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }
}

module.exports = new UserModel()
