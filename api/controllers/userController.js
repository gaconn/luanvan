const UserModel = require("../models/UserModel")
const GeneralUtil = require("../utils/GeneralUtil")
const ResponseUtil = require("../utils/ResponseUtil")
const mailer=require('../utils/mailerUtil')


class UserController {
    logon = async(req, res) => {
        const data = req.body
        if(Object.keys(data).length === 0) {
            return res.json(ResponseUtil.response(false, "Dữ liệu truyền vào không hợp lệ"))
        }
        const objResult = await UserModel.add(data)
        if(Object.keys(objResult).length === 0) {
            return res.json(ResponseUtil.response(false, "Có lỗi xảy ra, vui lòng thử lại"))
        }
        return res.json(objResult)
    }
    getDetail = async (req, res) => {
        console.log("getting");
         UserModel.get();
    }

    login = async(req, res) => {
        const data = req.body

        if(GeneralUtil.checkIsEmptyObject(data)) {
            return res.json(ResponseUtil.response(false, 'Dữ liệu truyền vào không hợp lệ'))
        }

        const objResult = await UserModel.login(data)

        if(!objResult) {
            return res.json(ResponseUtil.response(false, 'Có lỗi xảy ra, vui lòng thử lại'))
        }

        return res.json(objResult)
    }
    //Register
    Register= async(req, res) => {
        const data = req.body
        if(Object.keys(data).length === 0) {
            return res.json(ResponseUtil.response(false, "Dữ liệu truyền vào không hợp lệ"))
        }
        const objResult = await UserModel.addCustomer(data)
        if(Object.keys(objResult).length === 0) {
            return res.json(ResponseUtil.response(false, "Có lỗi xảy ra, vui lòng thử lại"))
        }
        return res.json(objResult)
    }
    //sendMail
    sendResetLinkEmail =async(req,res)=>{
        const data = req.body
        let MatKhauRS = Math.random().toString(36).substring(4);  
        //  const token = jwt.sign({Email: data.Email}, mailConfig.JSON, {expiresIn: '30s'})
                var content = '';
                content += `
                    <div style="padding: 10px; background-color: #003375">
                        <div style="padding: 10px; background-color: white;">
                            <h4 style="color: #0085ff">Đặt Lại mật khẩu</h4>
                            <span style="color: black">Mật khẩu mới: ${MatKhauRS}</span>
                        </div>
                    </div>
                `;
                // console.log(`${mailConfig.APP}/user/MatKhau/${data.Email}?token=${token}?MatKhau=${MatKhauRS}`);
                const UPDATEMK=await UserModel.resetPassword(data,MatKhauRS)
              if(UPDATEMK.data.length>0){
                mailer.sendMail(data.Email,'Đặt lại mật khẩu',content)
              }
                return res.json(UPDATEMK)
    }
    // ChangePassword=async(req,res)=>{
    //    //ThayDoiPass
    // }
}

module.exports = new UserController()