const ResponseUtil = require("../utils/ResponseUtil")
const jwt = require('jsonwebtoken')
const GeneralUtil = require("../utils/GeneralUtil")
const { OAuth2Client } = require('google-auth-library');
const dotenv = require("dotenv")
dotenv.config()
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const clientId = process.env.GOOGLE_DEFAULT_CLIENT_ID;
const User = {
    CheckToken: (req, res, next) => {
        const token = req.headers['authorization']
        if (!token) {
            return res.json(ResponseUtil.response(false, 'Thao tác không hợp lệ', [], ['Token không tồn tại']))
        }
        try {
            const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY)
            if (!decoded) {
                return res.json(ResponseUtil.response(false, 'Hãy chắc chắn rằng bạn đã đăng nhập để sử dụng dịch vụ này'))
            }
            if (!GeneralUtil.checkIsEmptyObject(decoded)) {
                req.Email = decoded.Email
                req.Permission = decoded.IDCapDoTaiKhoan ? decoded.IDCapDoTaiKhoan : 4;
            }

            next()
        } catch (error) {
            return res.json(ResponseUtil.response(false, 'Vui lòng đăng nhập lại để thực hiện thao tác'))
        }
    },
    googleLogin: (req, res) => {
        var inputJSON = JSON.stringify(req.body);
        var parsedJSON = JSON.parse(inputJSON);
        const { tokenId } = parsedJSON;
        var verifyObject = {};
        verifyObject.idToken = tokenId;
        verifyObject.audience = clientId;
        client.verifyIdToken(verifyObject)
            .then(response => {
                const { email_verified } = response.payload;
                if (email_verified) {
                    controller.addUser(req, res, response.payload);
                } else {
                    res.json({ status: 403, message: 'Email Not Verified, use another method to login!' });
                }
            });
    }
}

module.exports = User