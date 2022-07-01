const { _buildSelect, buildFieldQuery, _buildInsertField } = require("../utils/DBUtil")
const ResponseUtil = require("../utils/ResponseUtil")
const DBConnection = require("./DBConnection")

class CartItemModel {
    constructor() {
        this.table = 'chitietgiohang'
    }
    getListCartItem = async (objData) => {
        const errors  = []
        if(!objData.IDGioHang) {
            errors.push('Thông tin giỏ hàng không hợp lệ')
        }

        if(errors.length > 0) {
            return ResponseUtil.response(false, 'Thông tin không hợp lệ', [], errors)
        }

        try {
            var strSelect = 'select 1'
            strSelect += _buildSelect(['*'], this.table)
            var strJoin = ''

            if(objData.joinProduct) {
                strJoin += ` left join sanpham on ${this.table}.IDSanPham = sanpham.id`
                let field = [
                    'Ten',
                    'HinhAnh',
                    'MoTa',
                    'IDTheLoai',
                    'IDNhaCungCap',
                    'GiaGoc'
                ]
                strSelect += _buildSelect(field, 'sanpham', 'SanPham')
            }

            var strWhere = this._buildWhereQuery(objData)

            const query = `${strSelect} from ${this.table} ${strJoin} ${strWhere}`

            const result = await DBConnection.query(query)

            if(!result || !result[0]) {
                throw new Error('Không thể kết nối database')
            }
            return ResponseUtil.response(true, 'Thành công', result[0])
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }

    update = async (objData) => {
        var errors = []
        if(!objData.id) {
            errors.push('Thiếu id chi tiết giỏ hàng')
        }

        if(!objData.IDSanPham) {
            errors.push('Thiếu thông tin sản phẩm')
        }

        if(errors.length >0) {
            return ResponseUtil.response(false, 'Thông tin cập nhật không chính xác')
        }

        try {
            var objValue = {
                SoLuong: objData.SoLuong,
                ThoiGianCapNhat: new Date().getTime()/1000
            }
            const query = `update ${this.table} set ? where ?`

            const result = await DBConnection.query(query, [objValue, {id : objData.id}])

            if(!result && !result[0]) {
                throw new Error('Không thể kết nối tới database')
            }
            if(result[0].affectedRows === 0 ){
                return ResponseUtil.response(false, 'Cập nhật thất bại')
            }
            return ResponseUtil.response(true, 'Thành công')
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }

    insert = async (objData) => {
        const errors = []
        if(!objData.IDSanPham) {
            errors.push('Thiếu mã sản phẩm')
        }
        if(!objData.SoLuong) {
            errors.push('Thiếu số lượng sản phẩm muốn thêm')
        }
        if(!objData.IDGioHang) {
            errors.push('Thiếu thông tin giỏ hàng')
        }

        if(errors.length > 0) {
            return ResponseUtil.response(false, 'Dữ liệu không hợp lệ', [], errors)
        }
        try {
            var objValues = {
                IDSanPham: objData.IDSanPham,
                IDGioHang: objData.IDGioHang,
                SoLuong: objData.SoLuong,
                ThoiGianTao: new Date().getTime()/1000
            }

            var strField = buildFieldQuery(objValues)
            var values = _buildInsertField(strField, objValues)

            const query = `insert into ${this.table}(${strField}) values(${values})`

            const result = await DBConnection.query(query)

            if(!result || !result[0]) {
                throw new Error('Không thể kết nối tới database')
            }
            if(result[0].affectedRows ===0) {
                return ResponseUtil.response(false, 'Thêm thất bại')
            }
            return ResponseUtil.response(true, 'Thành công')
        } catch (error) {
            return ResponseUtil.response(false, error.message)
        }
    }
    _buildWhereQuery = (objData) => {
        var strWhere = ' where 1=1 '

        if(objData.IDGioHang) {
            strWhere += ` and ${this.table}.IDGioHang = ${objData.IDGioHang}`
        }
        if(objData.IDSanPham) {
            strWhere += ` and ${this.table}.IDSanPham = ${objData.IDSanPham}`
        }

        return strWhere
    }
}

module.exports = new CartItemModel()