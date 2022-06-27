const ResponseUtil = require("../utils/ResponseUtil")
const jwt = require('jsonwebtoken')
const GeneralUtil = require("../utils/GeneralUtil")

const User = {
    CheckToken: (req, res, next) => {
        const token = req.header('Authorization')
  

        if(!token) {
            return res.json(ResponseUtil.response(false, 'Thao tác không hợp lệ', [], ['Token không tồn tại']))
        }

        try {
            const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY)
            if(!decoded) {
                return res.json(ResponseUtil.response(false,'Hãy chắc chắn rằng bạn đã đăng nhập để sử dụng dịch vụ này'))
            }
            if(!GeneralUtil.checkIsEmptyObject(decoded)) {
                req.Email = decoded.Email
            }

            next()
        } catch (error) {
            return res.json(ResponseUtil.response(false, 'Có lỗi xảy ra, vui lòng thử lại'))
        }
    }
}

module.exports = User