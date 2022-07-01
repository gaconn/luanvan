const OrderModel = require("../models/OrderModel")
const ResponseUtil = require("../utils/ResponseUtil")

class OrderController {
    /**
     * Method: GET
     * /order/get-orders
     */

    getOrder = async(req, res) => {
        const page = req.query.page
        try {
            const objCondition = {
                joinUser: true,
                joinPaymentMethod: true,
                joinProduct: true,
                page,
            }

            const orders =await OrderModel.get(objCondition)

            if(!orders) {
                throw new Error('Lỗi hệ thống')
            }

            return res.json(orders)

        } catch (error) {   
            return res.json(ResponseUtil.response(false, error.message))
        }
    }

    /**
     * Method: POST
     * /order/checkout-v1
     */

    checkoutV1 = async(req, res) => {
        const data = req.body
        try {
            const response = await OrderModel.checkoutV1(data)

            if(!response) {
                throw new Error('Lỗi hệ thống')
            }

            return res.json(response)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }

    /**
     * Checkout trực tiếp không qua giỏ hàng, không cần đăng nhập
     * Method POST
     * /order/checkout-v2 
     */
    checkoutV2 = async (req, res) => {
        const data = req.body
        if(!data) {
            return ResponseUtil.response(false, 'Tham số không hợp lệ')
        }
        try {
            const checkoutResponse = await OrderModel.checkoutV2(data)

            if(!checkoutResponse) {
                throw new Error('Không thể sử lý')
            }
            return res.json(checkoutResponse)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }

    /**
     * Checkout qua giỏ hàng khi đã đăng nhập
     * Method: POST
     * url: order/checkout-v3
     */

    checkoutV3 = async (req, res) => {
        const data = req.body
        const emailUser = req.emailUser
        if(!emailUser) {
            return res.json(ResponseUtil.response(false, 'Vui lòng đăng nhập để sử dụng'))
        }
    }
}

module.exports = new OrderController()