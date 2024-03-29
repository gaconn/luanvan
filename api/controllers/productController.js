const upload = require("../middlewares/Files")
const DiscountModel = require("../models/DiscountModel")
const ProductModel = require("../models/ProductModel")
const ResponseUtil = require("../utils/ResponseUtil")
class ProductController {
    // GET /product/get-all
    getAll = async (req, res, next) => {
        const objQuery = req.query
        var objCondition = {
            ...objQuery,
            joinCategory: true,
            joinSupplier: true,
            DaXoa: 0,
            getRowCount: true,
        }
        try {
            const data = await ProductModel.get(objCondition)
            if (!data) {
                return res.json(
                    ResponseUtil.response(
                        false,
                        "Lỗi hệ thống",
                        [],
                        ["không thể lấy dữ liệu từ database"]
                    )
                )
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, "Lỗi hệ thống"))
        }
    }

    //GET /product/get-product-checkout-list
    // params : {id, IDTaiKhoan || SessionID} id truyền vd: 1,2,3
    // Nếu checkout qua cart thì truyền IDTaiKhoan hoặc SessionID vào
    // Nếu checkout trực tiếp luôn thì chỉ chuyền id sản phẩm vào thôi
    getCheckoutList = async (req, res) => {
        const condition = req.query
        var objCondition = { ...condition, joinCategory: true, joinSupplier: true, DaXoa: 0 }
        if (!condition.id) {
            return res.json(ResponseUtil.response(false, "Tham số không hợp lệ"))
        }
        try {
            const data = await ProductModel.get(objCondition)
            if (!data) {
                throw new Error("Không thể kết nối database")
            }
            const dataProduct = data.data

            var PhiVanChuyen = 0
            var TongGiaTriDonHang = 0
            var PhuPhi = 0
            var list = []

            if (objCondition.SessionID || objCondition.IDTaiKhoan) {
                for (let index = 0; index < dataProduct.length; index++) {
                    PhiVanChuyen += 40000 //mặc định, sau này sửa sau
                    PhuPhi += 0
                    var PhiSanPham =
                        40000 +
                        dataProduct[index].GiaGoc *
                            (objCondition.SoLuong
                                ? objCondition.SoLuong
                                : dataProduct[index].ChiTietGioHang_SoLuong)
                    TongGiaTriDonHang += PhiSanPham
                    dataProduct[index].PhiVanChuyen = PhiVanChuyen
                    dataProduct[index].PhiSanPham = PhiSanPham
                    list.push(dataProduct[index])
                }
            } else {
                for (let index = 0; index < dataProduct.length; index++) {
                    PhiVanChuyen += 40000 //mặc định, sau này sửa sau
                    PhuPhi += 0
                    var PhiSanPham =
                        40000 +
                        dataProduct[index].GiaGoc *
                            (dataProduct[index].ChiTietGioHang_SoLuong
                                ? dataProduct[index].ChiTietGioHang_SoLuong
                                : 1)
                    TongGiaTriDonHang += PhiSanPham
                    dataProduct[index].PhiVanChuyen = PhiVanChuyen
                    dataProduct[index].PhiSanPham = PhiSanPham
                    list.push(dataProduct[index])
                }
            }

            //discount
            var discountFee = 0
            var isValidDiscount = true
            if (condition.MaChietKhau) {
                const responseDiscount = await DiscountModel.get({
                    MaChietKhau: condition.MaChietKhau,
                    DaXoa: 0,
                    TrangThai: 1,
                    validTime: true,
                })
                const discount = responseDiscount.data[0]
                if (!responseDiscount.success && responseDiscount.data.length === 0) {
                    isValidDiscount = false
                } else {
                    if (
                        discount.DieuKienGiaToiDa &&
                        TongGiaTriDonHang > discount.DieuKienGiaToiDa
                    ) {
                        isValidDiscount = false
                    }
                    if (
                        discount.DieuKienGiaToiThieu &&
                        TongGiaTriDonHang < discount.DieuKienGiaToiThieu
                    ) {
                        isValidDiscount = false
                    }
                    if (discount.SoLuongSuDungToiDa) {
                        const responseOrderDiscount = await this.get({
                            DaXoa: 0,
                            MaChietKhau: condition.MaChietKhau,
                        })
                        if (
                            responseOrderDiscount.success &&
                            responseOrderDiscount.data[1] &&
                            responseOrderDiscount.data[1].rowCount >= discount.SoLuongSuDungToiDa
                        ) {
                            isValidDiscount = false
                        }
                    }
                }
                if (isValidDiscount) {
                    if (discount.GiaTriChietKhau) {
                        discountFee = discount.GiaTriChietKhau
                    } else if (discount.PhanTramChietKhau) {
                        discountFee = discount.PhanTramChietKhau * TongGiaTriDonHang
                    }
                }
            }
            const dataResponse = {
                PhiVanChuyen,
                TongGiaTriDonHang: TongGiaTriDonHang - discountFee,
                PhuPhi,
                KhuyenMai: discountFee,
                list,
            }

            return res.json(ResponseUtil.response(true, "Thành công", dataResponse))
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }
    /**
     * method GET
     * url: /product/detail
     */
    getDetail = async (req, res) => {
        const objQuery = req.query
        if (!objQuery.id) {
            return res.json(ResponseUtil.response(false, "Tham số không hợp lệ"))
        }
        var objCondition = { id: objQuery.id, joinCategory: true, joinSupplier: true, DaXoa: 0 }
        try {
            const data = await ProductModel.getDetail(objCondition)

            if (!data) {
                return res.json(
                    ResponseUtil.response(
                        false,
                        "Lỗi hệ thống",
                        [],
                        ["không thể lấy dữ liệu từ database"]
                    )
                )
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, "Lỗi hệ thống"))
        }
    }

    /**
     * method POST
     * url: /product/insert
     */

    insert = async (req, res) => {
        const objParams = req.body
        const images = req.files
        if (!req.Permission || req.Permission > 2) {
            return res.json(
                ResponseUtil.response(
                    false,
                    "Bạn không có quền thay đổi dữ liệu này, xin vui lòng liên hệ quản trị viên"
                )
            )
        }
        if (!objParams) {
            return res.json(ResponseUtil.response(false, "Tham số không hợp lệ"))
        }
        try {
            objParams.images = images
            const data = await ProductModel.insert(objParams)

            if (!data) {
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

    update = async (req, res) => {
        const objProduct = req.body
        const images = req.files
        if (!req.Permission || req.Permission > 3) {
            return res.json(
                ResponseUtil.response(
                    false,
                    "Bạn không có quền thay đổi dữ liệu này, xin vui lòng liên hệ quản trị viên"
                )
            )
        }
        if (!objProduct) {
            return res.json(ResponseUtil.response(false, "Tham số không hợp lệ"))
        }

        try {
            objProduct.images = images
            const result = await ProductModel.update(objProduct)

            if (!result) {
                throw new Error("Lỗi kết nối với database")
            }
            return res.json(result)
        } catch (error) {
            return res.json(ResponseUtil.response(false, "Lỗi hệ thống", [], [error.message]))
        }
    }

    /**
     * method PUT
     * url: /product/delete
     */

    delete = async (req, res) => {
        const params = req.query
        if (!req.Permission || req.Permission > 3) {
            return res.json(
                ResponseUtil.response(
                    false,
                    "Bạn không có quền thay đổi dữ liệu này, xin vui lòng liên hệ quản trị viên"
                )
            )
        }
        if (!params || !params.id) {
            return res.json(ResponseUtil.response(false, "Thiếu id sản phẩm"))
        }
        try {
            const data = await ProductModel.delete(params.id)

            if (!data) {
                throw new Error("Không thể kết nối database")
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }
    //get-all new
    featuredProduct = async (req, res) => {
        const objQuery = req.query
        var objCondition = {
            ...objQuery,
            joinCategory: true,
            joinSupplier: true,
            ThoiGianTao: new Date().getTime() / 1000,
            DaXoa: 0,
            getRowCount: true,
        }
        if (!objQuery) {
            return res.json(ResponseUtil.response(false, "Tham số không hợp lệ"))
        }
        try {
            const data = await ProductModel.featuredProduct(objCondition)
            if (!data) {
                return res.json(
                    ResponseUtil.response(
                        false,
                        "Lỗi hệ thống",
                        [],
                        ["không thể lấy dữ liệu từ database"]
                    )
                )
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }

    //import by excel file 
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    updateMultiple = async(req, res) => {
        //check permission
        if(req.Permission >3) {
            return res.json(ResponseUtil.response(false, "Bạn không có quyền sử dụng"))
        }
        const data = req.body
        
        if(!data) {
            return res.json(ResponseUtil.response(false, "Dữ liệu không hợp lệ"))
        }
        
        try {
            //check data exist
            var isValid =await this._checkDataExist(data)
            if(!isValid) {
                return res.json(ResponseUtil.response(false, "Vui lòng kiểm tra dữ liệu thêm vào. Hãy chắc chắn rằng sản phẩm có tồn tại, id sản phẩm không bị trùng."))
            }
            const result = await ProductModel.updateMultiple(data)
            return res.json(result)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error.message))
        }
    }

    _checkDataExist = async(data) => {
        if(!data.length) {
            return false
        }

        //kiểm tra dữ liệu thêm có bị trùng hay không

        for (let index = 0; index < data.length; index++) {
            for (let j = 0; j < data.length; j++) {
                if(index === j) continue
                if(data[index].id === data[j].id) {
                    return false
                }
            }
            
        }

        //kiểm tra sản phẩm có trong danh sách bán không
        var arrID = []
        for (let index = 0; index < data.length; index++) {
            if(!data[index].id) {
                return false
            }
            arrID.push(data[index].id)
        }
        const strListID = arrID.join(',')
        try {
            const productResponse = await ProductModel.get({id: strListID, DaXoa: 0, TrangThai: 1})
            if(!productResponse || productResponse.success === false) {
                throw new Error('Không thể kết nối cơ sở dữ liệu')
            }

            if(data.length !== productResponse.data.length ) {
                return false
            }

            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = new ProductController()
