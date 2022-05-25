const UserModel = require("../models/UserModel")
const GeneralUtil = require("../utils/GeneralUtil")
const ResponseUtil = require("../utils/ResponseUtil")
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
}

module.exports = new UserController()