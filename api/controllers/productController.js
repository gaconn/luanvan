const upload = require("../middlewares/Files")
const ProductModel = require("../models/ProductModel")
const ResponseUtil = require("../utils/ResponseUtil")
class ProductController {
    // GET /product/get-all
    getAll = async(req, res, next) => {
        const objQuery = req.query
        var objCondition = {...objQuery,joinCategory: true, joinSupplier: true, DaXoa: 0, getRowCount: true}
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

    //GET /product/get-product-checkout-list
    // params : {id, IDTaiKhoan || SessionID} id truyền vd: 1,2,3
    // Nếu checkout qua cart thì truyền IDTaiKhoan hoặc SessionID vào
    // Nếu checkout trực tiếp luôn thì chỉ chuyền id sản phẩm vào thôi 
    getCheckoutList = async(req, res) => {
        const condition = req.query
        var objCondition = {...condition,joinCategory: true, joinSupplier: true, DaXoa: 0}
        if(!condition.id) {
            return res.json(ResponseUtil.response(false, 'Tham số không hợp lệ'))
        }
        try {
            const data = await ProductModel.get(objCondition)
            if(!data) {
                throw new Error('Không thể kết nối database')
            }
            const dataProduct = data.data
            
            var PhiVanChuyen = 0
            var TongGiaTriDonHang = 0
            var PhuPhi =0
            var list = []

            if(objCondition.SessionID ||objCondition.IDTaiKhoan) {
                for (let index = 0; index < dataProduct.length; index++) {
                    PhiVanChuyen += 40000 //mặc định, sau này sửa sau
                    PhuPhi += 0 
                    var PhiSanPham = PhiVanChuyen + dataProduct[index].GiaGoc * (objCondition.SoLuong ? objCondition.SoLuong : 1)
                    TongGiaTriDonHang += PhiSanPham
                    dataProduct[index].PhiVanChuyen =PhiVanChuyen
                    dataProduct[index].PhiSanPham = PhiSanPham
                    list.push(dataProduct[index])
                }
            } else {
                for (let index = 0; index < dataProduct.length; index++) {
                    PhiVanChuyen += 40000 //mặc định, sau này sửa sau
                    PhuPhi += 0 
                    var PhiSanPham = PhiVanChuyen + dataProduct[index].GiaGoc * (dataProduct[index].ChiTietGioHang_SoLuong ? dataProduct[index].ChiTietGioHang_SoLuong : 1)
                    TongGiaTriDonHang += PhiSanPham
                    dataProduct[index].PhiVanChuyen =PhiVanChuyen
                    dataProduct[index].PhiSanPham = PhiSanPham
                    list.push(dataProduct[index])
                }
            }
            const dataResponse = {
                PhiVanChuyen,
                TongGiaTriDonHang,
                PhuPhi,
                list
            }
            
            return res.json(ResponseUtil.response(true, 'Thành công', dataResponse))
        } catch (error) {
            return ResponseUtil.response(false, error.message)
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