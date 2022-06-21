const ProductModel = require("../models/ProductModel")
const ResponseUtil = require("../utils/ResponseUtil")
class ProductController {
    // GET /product/get-all
    getAll = async(req, res, next) => {
        const objQuery = req.query
        var objCondition = {...objQuery,joinCategory: true, joinSupplier: true, DaXoa: 0}
        try {
            const data =await ProductModel.get(objCondition)

            if(!data) {
                return res.json(ResponseUtil.response(false, 'Lỗi hệ thống', [], ['không thể lấy dữ liệu từ database']))
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, 'Lỗi hệ thống'))
        }
    }

    /**
     * method GET
     * url: /product/detail
     */
    getDetail = async(req,res) => {

    }

    /**
     * method POST
     * url: /product/insert
     */

    insert = async(req, res) => {
        const objParams = req.body
        const tam = req.file
        if(!objParams) {
            return res.json(ResponseUtil.response(false, "Tham số không hợp lệ"))
        }
        try {
            const data = await ProductModel.insert(objParams)

            if(!data) {
                throw new Error("Không thể lấy dữ liệu từ database")
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }

}

module.exports = new ProductController()