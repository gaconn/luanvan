const dbconnect = require("./DBConnection")
const GeneralUtil = require("../utils/GeneralUtil")
const ResponseUtil = require("../utils/ResponseUtil")
const bcrypt = require("bcrypt")
const { buildFieldQuery } = require("../utils/DBUtil")
const jwt = require("jsonwebtoken")
class UserModel {
    add = async(objUserInfo) => {
        if(GeneralUtil.checkIsEmptyObject(objUserInfo)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], [])
        }
        let arrError = []
        if(!objUserInfo.HoTen) {
            arrError.push("Họ tên không được để trống")
        }
        if(!objUserInfo.SoDienThoai) {
            arrError.push("Số điện thoại không được để trống")
        }
        if(!objUserInfo.Email) {
            arrError.push("Email không được bỏ trống")
        }

        if(!GeneralUtil.checkValidEmail(objUserInfo.Email)) {
            arrError.push("Email không hợp lệ")
        }

        if(!GeneralUtil.checkIsValidPassword(objUserInfo.MatKhau)) {
            arrError.push("Password phải lớn hơn 6 ký tự")
        }
        if(!GeneralUtil.checkIsEmptyArray(arrError)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], arrError)
        }
        try {
            const arrGetAccountResult =await dbconnect.query("select * from taikhoan where  Email = ? Limit 1", [ objUserInfo.Email])
            if(arrGetAccountResult.length === 0) return ResponseUtil.response(false, "Lỗi hệ thống")
            if(arrGetAccountResult[0].length > 0) return ResponseUtil.response(false, "Email đã tồn tại")
            
            //format
            const hashedPassword =await GeneralUtil.hashPassword(objUserInfo.MatKhau)
            const objData = {
                HoTen: objUserInfo.HoTen,
                NgaySinh: objUserInfo.NgaySinh ? objUserInfo.NgaySinh : null,
                SoDienThoai: objUserInfo.SoDienThoai,
                Email: objUserInfo.Email,
                MatKhau: hashedPassword,
                TinhThanh: objUserInfo.TinhThanh,
                QuanHuyen: objUserInfo.QuanHuyen,
                PhuongXa: objUserInfo.PhuongXa,
                SoNha: objUserInfo.SoNha,
                ThoiGianTao: new Date().getTime()/1000,
                DaXoa: 0,
                IDNhomQuyen: 1,

            }

            const fields = buildFieldQuery(objData)
            const arrFields= fields.split(',')
            
            if(arrFields.length === 0) {
                throw new Error('field không hợp lệ')
            }
            var arrValues = []
            for(let i = 0 ; i<arrFields.length; i++) {
                arrValues.push(objData[arrFields[i].trim()])
            }
            
            if(arrValues.length === 0) {
                throw new Error('Values không hợp lệ')
            }
            const query = `insert into taikhoan(${fields}) values(?)`
            const arrAddUserResult = await dbconnect.query(query, [arrValues])

            if(arrAddUserResult[0].affectedRows > 0) {
                const token = jwt.sign({Email: objData.Email, DaXoa: objData.DaXoa}, process.env.JSON_WEB_TOKEN_SECRET_KEY, {expiresIn: '24h'})
                return ResponseUtil.response(true, "Tạo tài khoản thành công", token)
            }

        } catch (error) {
            return ResponseUtil.response(false, "Lỗi hệ thống, Vui lòng liên hệ chăm sóc khách hàng.")
        }
        
    }

    get = async() => {
        try {
            console.log('model');
            const obj= {Ten:"Gầm máy", DaXoa:0, ThoiGianTao:Math.floor(new Date().getTime()/1000)}
            const fields = buildFieldQuery(obj)
            const result =await dbconnect.query(`select * from taikhoan where Email = ?`, "quan12xz@gmail.com")
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    login = async (objDataUser) => {
        if(GeneralUtil.checkIsEmptyObject(objDataUser)) {
            return ResponseUtil.response(false, 'Dữ liệu truyền vào không hợp lệ')
        }

        if(!GeneralUtil.checkValidEmail(objDataUser.Email)) {
            return ResponseUtil.response(false, 'Email không hợp lệ')
        }

        if(!GeneralUtil.checkIsValidPassword(objDataUser.MatKhau)) {
            return ResponseUtil.response(false, 'Mật khẩu không hợp lệ')
        }
        try {
            const query = "select * from taikhoan where Email = ? and DaXoa = 0 limit 1"
            const result = await dbconnect.query(query, objDataUser.Email)
            if(!result[0] || result[0].length === 0) {
                return ResponseUtil.response(true, 'Đăng nhập không thành công',[], ['Email hoặc mật khẩu không chính xác'])
            }
            
            const objUserInfo = result[0][0]
            if(GeneralUtil.checkIsEmptyObject(objUserInfo)) {
                return ResponseUtil.response(true, 'Đăng nhập không thành công' ,[], ['Email hoặc mật khẩu không chính xác'])
            }
           

            const isValidPassword =await GeneralUtil.verifyPassword(objDataUser.MatKhau,objUserInfo.MatKhau)
           
            if(isValidPassword!= false ) {
                return ResponseUtil.response(true, 'Đăng nhập không thành công',[], ['Mật khẩu không chính xác'])
            }
            
            // nếu có Remember thì giữ đăng nhập 1 tháng, nếu không có thì giữ đăng nhập 1 ngày
            const token = jwt.sign(
                {Email: objUserInfo.Email, DaXoa: objUserInfo.DaXoa},
                process.env.JSON_WEB_TOKEN_SECRET_KEY,
                {expiresIn: objDataUser.Remember === 1 ? 60 * 60 * 24 * 30 : '1h'}
            )
            delete objUserInfo.MatKhau
            return ResponseUtil.response(true, 'Đăng nhập thành công', [{...objUserInfo, token}] )

        } catch (error) {
            return ResponseUtil.response(false, 'Lỗi hệ thống',[],error.message)
        }
    }
    //Custommer
    addCustomer = async(objUserInfo) => {
        if(GeneralUtil.checkIsEmptyObject(objUserInfo)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], [])
        }
        let arrError = []
        if(!objUserInfo.HoTen) {
            arrError.push("Họ tên không được để trống")
        }
        // if(!objUserInfo.SoDienThoai) {
        //     arrError.push("Số điện thoại không được để trống")
        // }
        if(!objUserInfo.Email) {
            arrError.push("Email không được bỏ trống")
        }
        if(!objUserInfo.MatKhau) {
            arrError.push("Mật khẩu không được bỏ trống")
        }
        if(!GeneralUtil.checkValidEmail(objUserInfo.Email)) {
            arrError.push("Email không hợp lệ")
        }
        // if(!GeneralUtil.checkIsValidPhone(objUserInfo.SoDienThoai)) {
        //     arrError.push("Phone phải nhập có 10 số và không có ký tự")
        // }
        if(!GeneralUtil.checkIsValidPassword(objUserInfo.MatKhau)) {
            arrError.push("Password phải lớn hơn 6 ký tự")
        }
        if(!GeneralUtil.checkIsEmptyArray(arrError)) {
            return ResponseUtil.response(false, "dữ liệu không hợp lệ", [], arrError)
        }
        try {
            const arrGetAccountResult =await dbconnect.query("select * from taikhoan where  Email = ? Limit 1", [ objUserInfo.Email])
            if(arrGetAccountResult.length === 0) return ResponseUtil.response(false, "Lỗi hệ thống")
            if(arrGetAccountResult[0].length > 0) return ResponseUtil.response(false, "Email đã tồn tại")
            
            //format
            const hashedPassword =await GeneralUtil.hashPassword(objUserInfo.MatKhau)
            const objData = {
                HoTen: objUserInfo.HoTen,
                NgaySinh: objUserInfo.NgaySinh ? objUserInfo.NgaySinh : null,
                Email: objUserInfo.Email,
                SoDienThoai: objUserInfo.SoDienThoai ? objUserInfo.SoDienThoai : null,
                MatKhau: hashedPassword,
                TinhThanh: objUserInfo.TinhThanh ? objUserInfo.TinhThanh:null,
                QuanHuyen: objUserInfo.QuanHuyen? objUserInfo.QuanHuyen:null,
                PhuongXa: objUserInfo.PhuongXa ? objUserInfo.PhuongXa :null,
                SoNha: objUserInfo.SoNha ?objUserInfo.SoNha:null,
                ThoiGianTao: new Date().getTime()/1000,
                DaXoa: 0,
                IDCapDoTaiKhoan : 4,

            }

            const fields = buildFieldQuery(objData)
            const arrFields= fields.split(',')
            
            if(arrFields.length === 0) {
                throw new Error('field không hợp lệ')
            }
            var arrValues = []
            for(let i = 0 ; i<arrFields.length; i++) {
                arrValues.push(objData[arrFields[i].trim()])
            }
            
            if(arrValues.length === 0) {
                throw new Error('Values không hợp lệ')
            }
            const query = `insert into taikhoan(${fields}) values(?)`
            const arrAddUserResult = await dbconnect.query(query, [arrValues])

            if(arrAddUserResult[0].affectedRows > 0) {
                const token = jwt.sign({Email: objData.Email, DaXoa: objData.DaXoa}, process.env.JSON_WEB_TOKEN_SECRET_KEY, {expiresIn: '24h'})
                return ResponseUtil.response(true, "Tạo tài khoản thành công", token)
            }

        } catch (error) {
            console.log(error)
            return ResponseUtil.response(false, "Lỗi hệ thống, Vui lòng liên hệ chăm sóc khách hàng.")
        }
        
    }
}

module.exports = new UserModel()