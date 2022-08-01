const axios = require("axios")
const ResponseUtil = require("../utils/ResponseUtil")
const { config } = require("../define/telegram")
class TelegramModel {
    sendMessage = async (message) => {
        if (!message) {
            return ResponseUtil.response(false, "message không được để trống")
        }
        try {
            const url = `${config.HOST}/bot${config.TOKEN}/sendMessage`
            const response = await axios.post(url, { chat_id: config.GROUP_CHAT_ID, text: message })
            if (!response.data || !response.data.ok) {
                return ResponseUtil.response(false, "Gửi mail thất bại")
            }
            return ResponseUtil.response(true, message)
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }
}

module.exports = new TelegramModel()
