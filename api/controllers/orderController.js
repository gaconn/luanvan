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
}

module.exports = new OrderController()