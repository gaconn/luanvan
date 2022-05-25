const { buildFieldQuery } = require('../utils/DBUtil')
const { checkIsEmptyObject } = require('../utils/GeneralUtil')
const ResponseUtil = require('../utils/ResponseUtil')
const dbconnect= require('./DBConnection')
class SupplierModel {
    get = async(arrDataSelect = [],objCondition = {}) => {
        try {
            var fields = ""
            if(arrDataSelect.length > 0) {
                fields = arrDataSelect.join(", ")
            }
            var query = ""
            if(fields != ""){
                query = `select ${fields} from nhacungcap`
            }else{
                query = 'select * from nhacungcap'
            }

            if(Object.keys(objCondition).length > 0) {
                query += ' where ?'
            }
            const arrData = await dbconnect.query(query, objCondition)

            if(!arrData) {
                return ResponseUtil.response(false, 'Không thể truy xuất dữ liệu từ database', [], ['Truy xuất dữ liệu thất bại'])
            }
            if(!arrData[0]) {
                return ResponseUtil.response(true, 'Không có dữ liệu', [], ['Không tìm thấy dữ liệu'])
            }

            return ResponseUtil.response(true, 'Thành công', arrData[0])
        } catch (error) {
            return ResponseUtil.response(false, 'Lỗi hệ thống', [], [error])
        }
    }

    insert = async(objSupplier) => {
        var error = []
        if(objSupplier.Ten === "") {
            error.push('Tên nhà cung cấp không được để trống')
        }
        if(error.length > 0) {
            return ResponseUtil.response(false, 'Dữ liệu không hợp lệ', [], error)
        }

        try {
            const objField = {
                Ten: objSupplier.Ten,
                TrangThai: 1,
                DaXoa: 0,
                HoatDong: 1,
                ThoiGianTao: new Date().getTime()/1000,
            }

            const strField = buildFieldQuery(objField)
            if(strField === "" || !strField ) {
                throw new Error('build query thất bại')
            } 

            const arrField = strField.split(', ')

            var arrValue = []

            for(let i = 0; i<arrField.length ; i++) {
                arrValue.push(objField[arrField[i].trim()])
            }
            const query = `insert into nhacungcap(${strField}) values(?)`
            const dataResponse = await dbconnect.query(query, [arrValue])

            if(!dataResponse || !dataResponse[0]) {
                return ResponseUtil.response(false, 'Không thể truy xuất database', [] , ['Không thể truy xuất database'])
            }
            if(dataResponse[0].affectedRows === 0) {
                return ResponseUtil.response(false, 'Thất bại', [], 'Dữ liệu không hợp lệ')
            }
            return ResponseUtil.response(true, 'Thành công' )
        } catch (error) {
            return ResponseUtil.response(false, 'Lỗi hệ thống', [], [error])
        }
    }

    update = async(objDataUpdate, objCondition) => {
        const error = []
        if(checkIsEmptyObject(objDataUpdate)) {
            error.push('Dữ liệu cần sửa không hợp lệ')
        }
        if(checkIsEmptyObject(objCondition)) {
            error.push('Thiếu điều kiện cập nhật')
        }

        try {
            objDataUpdate.ThoiGianCapNhat = new Date().getTime() /1000
            const query = `update nhacungcap set ? where ?`

            const arrDataResponse = await dbconnect.query(query, [objDataUpdate, objCondition])

            if(!arrDataResponse || !arrDataResponse[0]) {
                return ResponseUtil.response(false, 'Truy xuất database không thành công', [], ['Có lỗi xảy ra khi truy xuất database'])
            }
            if(arrDataResponse[0].affectedRows === 0) {
                return ResponseUtil.response(false, 'Thất bại')
            }
            return ResponseUtil.response(true, 'Sửa dữ liệu nhà cung cấp thành công')
        } catch (error) {
            return ResponseUtil.response(false, 'Lỗi hệ thống', [], [error])
        }
    }
}

module.exports = new SupplierModel()