const CartModel = require("../models/CartModel")
const ResponseUtil = require("../utils/ResponseUtil")

class CartController {
    getCart = async (req, res) => {

    }
    /**
     * Method: post
     * url: /cart/add-to-cart  
     *  {IDSanPham, SoLuong, IDTaiKhoan || SessionID}
     */
    addToCart = async (req, res) => {
        const data = req.body
        if(!data) {
            return res.json(ResponseUtil.response(false, 'Tham số không hợp lệ'))
        }

        try {
            const response = await CartModel.addToCart(data)

            if(!response) {
                throw new Error()
            }
            return res.json(response)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }

    removeCartItem = async (req, res) => {

    }

    upadteCart = async (req, res) => {
        
    }
}

module.exports = new CartController()