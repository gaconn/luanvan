const { _buildSelect, buildFieldQuery, _buildInsertField } = require("../utils/DBUtil")
const ResponseUtil = require("../utils/ResponseUtil")
const DBConnection = require("./DBConnection")
const ProductModel = require("./ProductModel")
const UserModel = require("./UserModel")

class OrderModel {
    constructor() {
        this.table = "chitietdonhang"
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
    
    insert = async (objData) => {
        if(!objData || Object.keys(objData).length === 0) {
            return ResponseUtil.response(false, 'Tham số không hợp lệ')
        }

        try {
            const data = {
                IDSanPham: objData.IDSanPham,
                IDDonHang: objData.IDDonHang,
                SoLuong: objData.SoLuong,
                DonGia: objData.DonGia,
                ThanhTien: objData.ThanhTien,
                PhiVanChuyen: objData.PhiVanChuyen,
                ThoiGianTao: new Date().getTime()/1000
            }
            const strField = buildFieldQuery(data)
            if(!strField) {
                return ResponseUtil.response(false, 'Tham số không hợp lệ')
            }

            const arrValue = _buildInsertField(strField, data)


            const query = `insert into ${this.table}(${strField}) values(?)`
            const result = await DBConnection.query(query, [arrValue])
            if(!result || !result[0]) {
                return ResponseUtil.response(false, 'Không thể kết nối database')
            }
            if(result[0].affectedRows === 0) {
                return ResponseUtil.response(false, 'Thêm thất bại')
            }
            return ResponseUtil.response(true, "Thành công")
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }
    _buildWhere = (objCondition, table) => {
        var strWhere = " 1=1 "

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
        return strWhere
    }
}

module.exports = new OrderModel()