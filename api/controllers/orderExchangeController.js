const ExchangeModel = require("../models/ExchangeModel")
const ResponseUtil = require("../utils/ResponseUtil")

class OrderExchangeController {
    getList = async (req, res) => {
        const data = req.query

        if (!req.Permission || req.Permission > 3) {
            return res.json(
                ResponseUtil.response(
                    false,
                    "Bạn không có quền thay đổi dữ liệu này, xin vui lòng liên hệ quản trị viên"
                )
            )
        }

        try {
            const response = await ExchangeModel.get(data)

            if (!response) {
                throw new Error("Không thể kết nối database")
            }

            return res.json(response)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }

    insert = async (req, res) => {
        const data = req.body
        if (!req.Permission || req.Permission > 3) {
            return res.json(
                ResponseUtil.response(
                    false,
                    "Bạn không có quền thay đổi dữ liệu này, xin vui lòng liên hệ quản trị viên"
                )
            )
        }
        if (!data) {
            return res.json(ResponseUtil.response(false, "Dữ liệu không hợp lệ"))
        }

        try {
            const response = await ExchangeModel.insert(data)

            if (!response) {
                throw new Error("Không thể kết nối database")
            }

            return res.json(response)
        } catch (error) {
            return res.json(false, error.message)
        }
    }

    update = async (req, res) => {
        const data = req.body
        if (!req.Permission || req.Permission > 3) {
            return res.json(
                ResponseUtil.response(
                    false,
                    "Bạn không có quền thay đổi dữ liệu này, xin vui lòng liên hệ quản trị viên"
                )
            )
        }
        if (!data) {
            return res.json(ResponseUtil.response(false, "Dữ liệu không hợp lệ"))
        }

        try {
            const response = await ExchangeModel.update(data)

            if (!response) {
                throw new Error("Không thể kết nối database")
            }

            return res.json(response)
        } catch (error) {
            return res.json(false, error.message)
        }
    }

    delete = async (req, res) => {
        const data = req.query
        if (!req.Permission || req.Permission > 3) {
            return res.json(
                ResponseUtil.response(
                    false,
                    "Bạn không có quền thay đổi dữ liệu này, xin vui lòng liên hệ quản trị viên"
                )
            )
        }
        if (!data) {
            return res.json(ResponseUtil.response(false, "Dữ liệu không hợp lệ"))
        }

        try {
            const response = await ExchangeModel.delete(data)

            if (!response) {
                throw new Error("Không thể kết nối database")
            }

            return res.json(response)
        } catch (error) {
            return res.json(false, error.message)
        }
    }
}

module.exports = new OrderExchangeController()
