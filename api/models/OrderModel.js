const { _buildSelect, buildFieldQuery, _buildInsertField, object_filter } = require("../utils/DBUtil")
const ResponseUtil = require("../utils/ResponseUtil")
const DBConnection = require("./DBConnection")
const OrderDetailModel = require("./OrderDetailModel")
const ProductModel = require("./ProductModel")
const UserModel = require("./UserModel")
const uniqid = require('uniqid')

class OrderModel {
    constructor() {
        this.table = "donhang"
    }
    get = async(objCondition) => {
        if(!objCondition || Object.keys(objCondition).length === 0 ) {
            return ResponseUtil.response(false, 'Tham số không hợp lệ')
        }
        var page = objCondition.page ? objCondition.page : 1;
        var offsetStart= (page -1)*10
        try {
            var strWhere = this._buildWhere(objCondition, this.table)
            var strJoin = ''
            var strSelect = 'select 1'
            strSelect += _buildSelect(['*'], this.table) // select donhang.*
            if(objCondition.joinUser) {
                strJoin += ` left join taikhoan on ${this.table}.IDTaiKhoan = TaiKhoan.id`
                var arrFieldUserSelect = [
                    'HoTen',
                    'NgaySinh',
                    'SoDienThoai',
                    'Email',
                    'TinhThanh',
                    'QuanHuyen',
                    'PhuongXa',
                    'SoNha',
                ]
                strSelect += _buildSelect(arrFieldUserSelect, 'TaiKhoan', 'TaiKhoan_')
            }

            if(objCondition.joinPaymentMethod) {
                strJoin += ` left join phuongthucthanhtoan on ${this.table}.IDPhuongThucThanhToan = phuongthucthanhtoan.id`
                var arrFieldPaymentMethodSelect = [
                    'TenPhuongThucThanhToan'
                ]

                strSelect += _buildSelect(arrFieldPaymentMethodSelect, 'phuongthucthanhtoan', 'PhuongThucThanhToan_')
            }

            if(objCondition.joinProduct) {
                strJoin += ` left join sanpham on ${this.table}.IDSanPham = sanpham.id`
                var arrFieldProductSelect = [
                    'Ten',
                    'HinhAnh',
                    'XuatXu',
                    'MauSac',
                    'KichThuoc',
                    'CanNang',
                    'MoTa',
                    'GiaGoc',
                    'IDTheLoai',
                    'IDNhaCungCap'
                ]
                strSelect += _buildSelect(arrFieldProductSelect, 'sanpham', 'SanPham_')
            }
            
            const query = `${strSelect} from ${this.table} ${strJoin} ${strWhere} limit 10 offset ${offsetStart}`

            const response = await DBConnection.query(query)
            const countResponse  = await DBConnection.query('select COUNT(id) rowCount from sanpham')

            if(!response || !countResponse || !response[0] || !countResponse[0]) {
                throw new Error('Lỗi kết nối database')
            }

            return ResponseUtil.response(true, 'Thành công', [response[0],countResponse[0][0]])
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }
    /**
     * 
     * @param {Object} objData {IDTaiKhoan, IDSanPham, IDPhuongThucThanhToan, SoLuong}
     * @returns object
     * Checkout không qua giỏ hàng
     */
    checkoutV1 = async (objData) => {
        if(!objData || Object.keys(objData).length === 0) {
            return ResponseUtil.response(false, 'Tham số không hợp lệ')
        }

        try {
            // kiểm tra thông tin truyền vào
            const errors = []
            if(!objData.IDTaiKhoan) {
                errors.push('Thiếu thông tin tài khoản')
            }else {
                const user = await UserModel.get({DaXoa: 0, id: objData.IDTaiKhoan})
                if(!user || !user.data || !user.data[0]) {
                    throw new Error(user.message)
                }
                if(user.data[0].length === 0) {
                    errors.push('Tài khoản không hợp lệ')
                }
            }

            if(!objData.IDPhuongThucThanhToan) {
                errors.push('Thiếu phương thức thanh toán')
            }

            if(!objData.IDSanPham) {
                errors.push('Thiếu mã sản phẩm')
            }

            if(!objData.SoLuong) {
                errors.push('Thiếu số lượng sản phẩm cần mua')
            }
            if(errors.length > 0) {
                return ResponseUtil.response(false, 'Dữ liệu không hợp lệ', [], errors)
            }

            // lấy thông tin product

            const objProductResponse = await ProductModel.getDetail({id: objData.IDSanPham})
            if(!objProductResponse.success) {
                return objProductResponse
            }

            const productDetail = objProductResponse.data

            productDetail.SoLuongSanPham = objData.SoLuong
            productDetail.PhiVanChuyen = 40000
            const MaDonHang = uniqid('DonHang-')

            const extraInfo = {
                IDTaiKhoan : objData.IDTaiKhoan,
                IDPhuongThucThanhToan: objData.IDPhuongThucThanhToan,
                MaDonHang
            }

            const resultCheckout = this._checkout({arrProduct:[productDetail], extraInfo})

            return resultCheckout
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }
    /**
     * 
     * @param {object} objOrderData 
     * arrProduct = [{SoLuongSanPham: 1, PhiVanChuyen: 10000, GiaGoc}]
     * extraInfo = {IDTaiKhoan, IDPhuongThucThanhToan, PhuPhi, MaDonHang}
     */
    _checkout = async(objOrderData) => {
        var {arrProduct, extraInfo} = objOrderData
        try {
            var TongGiaTriDonHang = 0
            var TongPhiVanChuyen = 0
            var arrErrors = [] //Trả về các sản phẩm thêm thất bại

            for (let index = 0; index < arrProduct.length; index++) {
                var objDetailProduct = arrProduct[index]
                if(objDetailProduct.SoLuong < objDetailProduct.SoLuongSanPham) {
                    arrErrors.push(`Hết Hàng ::${objDetailProduct.id}`)
                    continue
                }
                var itemPrice = objDetailProduct.GiaGoc * objDetailProduct.SoLuongSanPham + objDetailProduct.PhiVanChuyen
                TongGiaTriDonHang += itemPrice
                TongPhiVanChuyen += arrProduct[index].PhiVanChuyen
                arrProduct[index].ItemPrice = itemPrice
            }

            const objOrder = {
                IDTaiKhoan: extraInfo.IDTaiKhoan,
                IDPhuongThucThanhToan: extraInfo.IDPhuongThucThanhToan,
                ThoiGianTao: new Date().getTime()/1000,
                DaXoa: 0,
                TongGiaTriDonHang: TongGiaTriDonHang,
                PhuPhi: extraInfo.PhuPhi ? extraInfo.PhuPhi : 0,
                TrangThai: 0,
                MaDonHang: extraInfo.MaDonHang,
                GiaVanChuyen: TongPhiVanChuyen
            }

            const responseOrder = await this.insert(objOrder)

            if(!responseOrder.success) {
                return responseOrder
            }

            //lấy id đơn hàng
            const orderInfo = await this.get({MaDonHang: extraInfo.MaDonHang})

            if(!orderInfo.success || !orderInfo.data || !orderInfo.data[0] || !orderInfo.data[0][0]) {
                return orderInfo
            }
            const objOrderInfo = orderInfo.data[0][0]

            for (let index = 0; index < arrProduct.length; index++) {
                var ThanhTien = objDetailProduct.GiaGoc * objDetailProduct.SoLuongSanPham + objDetailProduct.PhiVanChuyen
                //Trừ số lượng sản phẩm đi
                const updateProductResponse = await ProductModel.update({SoLuong: arrProduct[index].SoLuong - arrProduct[index].SoLuongSanPham, id: arrProduct[index].id})

                if(!updateProductResponse.success) {
                    arrErrors.push(`${updateProductResponse.message}::${arrProduct[index].id}`)

                    let dataUpdateOrder = {
                        TongGiaTriDonHang: objOrderInfo.TongGiaTriDonHang - ThanhTien
                    }
                    let updateResponse = await this.update(dataUpdateOrder, {id: objOrderInfo.id})

                    if(!updateResponse.success) {
                        throw new Error(updateResponse.message)
                    }
                    continue
                }

                // insert order item
                let orderItem = {
                    IDSanPham: arrProduct[index].id,
                    IDDonHang: objOrderInfo.id,
                    ThoiGianTao: new Date().getTime()/1000,
                    SoLuong: arrProduct[index].SoLuongSanPham,
                    DonGia: arrProduct[index].GiaGoc,
                    ThanhTien: ThanhTien,
                    PhiVanChuyen: arrProduct[index].PhiVanChuyen
                }

                const responseItemOrder = await OrderDetailModel.insert(orderItem)

                // nếu thêm thất bại thì chỉnh lại đơn hàng
                if(!responseItemOrder.success) {
                    arrErrors.push(`${responseItemOrder.message}::${arrProduct[index].id}`)

                    let dataUpdateOrder = {
                        TongGiaTriDonHang: objOrderInfo.TongGiaTriDonHang - ThanhTien
                    }
                    let updateResponse = await this.update(dataUpdateOrder, {id: objOrderInfo.id})

                    if(!updateResponse.success) {
                        throw new Error(updateResponse.message)
                    }
                }
            }

            return ResponseUtil.response(true, 'Thành công', [], arrErrors)
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }

    insert = async(objOrder) => {
        try {
            const strField = buildFieldQuery(objOrder)
            const strValue = _buildInsertField(strField, objOrder)

            const query = `insert into ${this.table}(${strField}) values(?)`

            const response = await DBConnection.query(query, [strValue])

            if(!response || !response[0]) {
                return ResponseUtil.response(false, 'Không thể kết nối database')
            }

            if(response[0].affectedRows === 0) {
                return ResponseUtil.response(false, 'Thêm dữ liệu thất bại')
            }
            return ResponseUtil.response(true, 'Thành công')
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }

    update = async (objData, objCondition) => {
        if(!objData || !objCondition) {
            return ResponseUtil.response(false, 'Sửa thất bại')
        } 

        try {
            var objOrder = {
                IDTaiKhoan: objData.IDTaiKhoan ? objData.IDTaiKhoan : undefined,
                IDPhuongThucThanhToan: extraInfo.IDPhuongThucThanhToan ? extraInfo.IDPhuongThucThanhToan : undefined,
                ThoiGianCapNhat: new Date().getTime()/1000,
                DaXoa: objData.DaXoa ? objData.DaXoa : undefined,
                TongGiaTriDonHang: objData.TongGiaTriDonHang ? objData.TongGiaTriDonHang : undefined,
                PhuPhi: objData.PhuPhi ? objData.PhuPhi : undefined,
                TrangThai: objData.TrangThai ? objData.TrangThai : undefined,
                GiaVanChuyen: objData.GiaVanChuyen ? objData.GiaVanChuyen : undefined
            }

            objOrder = object_filter(objOrder) // bỏ đi những trường undefined

            const query = `update ${this.table} set ? where ?`

            const response = await DBConnection.query(query, [objOrder, objCondition])

            if(!response || !response[0]) {
                return ResponseUtil.response(false, 'Không thể kết nối database')
            }

            if(response[0].affectedRows === 0) {
                return ResponseUtil.response(false, 'Sửa thông tin thất bại')
            }

            return ResponseUtil.response(true, 'Thành công')
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }
    _buildWhere = (objCondition, table) => {
        var strWhere = " where 1=1 "

        if(objCondition.id) {
            strWhere += ` and ${table}.id = ${objCondition.id} `
        }

        if(objCondition.IDSanPham) {
            strWhere += ` and ${table}.IDSanPham = ${objCondition.IDSanPham}`
        }

        if(objCondition.IDPhuongThucThanhToan) {
            strWhere += ` and ${table}.IDPhuongThucThanhToan = ${objCondition.IDPhuongThucThanhToan} `
        }

        if(objCondition.hasOwnProperty("DaXoa")) {
            strWhere += ` and ${table}.DaXoa = ${objCondition.DaXoa} `
        }

        if(objCondition.hasOwnProperty("TrangThai")) {
            strWhere += ` and ${table}.TrangThai = ${objCondition.TrangThai}`
        }

        if(objCondition.MaDonHang) {
            strWhere += ` and ${table}.MaDonHang = '${objCondition.MaDonHang}'`
        }

        return strWhere
    }
}

module.exports = new OrderModel()