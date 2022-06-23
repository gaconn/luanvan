const upload = require("../middlewares/Files")
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
        const objQuery = req.query
        if(!objQuery.id) {
            return res.json(ResponseUtil.response(false, 'Tham số không hợp lệ'))
        }
        var objCondition = {id: objQuery.id,joinCategory: true, joinSupplier: true, DaXoa: 0}
        try {
            const data =await ProductModel.getDetail(objCondition)

            if(!data) {
                return res.json(ResponseUtil.response(false, 'Lỗi hệ thống', [], ['không thể lấy dữ liệu từ database']))
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, 'Lỗi hệ thống'))
        }
    }

    /**
     * method POST
     * url: /product/insert
     */

    insert = async(req, res) => {

        const objParams = req.body
        const images = req.files
        if(!objParams) {
            return res.json(ResponseUtil.response(false, "Tham số không hợp lệ"))
        }
        try {
            objParams.images = images
            const data = await ProductModel.insert(objParams)

            if(!data) {
                throw new Error("Không thể lấy dữ liệu từ database")
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }

    /**
     * method PUT
     * url: /product/update
     */

    update = async(req, res) => {
        const objProduct = req.body
        const images = req.files

        if(!objProduct) {
            return res.json(ResponseUtil.response(false, 'Tham số không hợp lệ'))
        }

        try {
            objProduct.images = images
            const result = await ProductModel.update(objProduct)

            if(!result) {
                throw new Error('Lỗi kết nối với database')
            }
            return res.json(result)
        } catch (error) {
            return res.json(ResponseUtil.response(false, 'Lỗi hệ thống', [], [error.message]))
        }
    }

    /**
     * method PUT
     * url: /product/delete
     */

    delete = async (req, res) => {
        const params=req.query
        if(!params || !params.id) {
            return res.json(ResponseUtil.response(false, 'Thiếu id sản phẩm'))
        }
        try {
            const data = await ProductModel.delete(params.id)

            if(!data) {
                throw new Error("Không thể kết nối database")
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }
}

module.exports = new ProductController()