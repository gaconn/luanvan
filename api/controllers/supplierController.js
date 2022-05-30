const SupplierModel = require('../models/SupplierModel')
const { checkIsEmptyObject } = require('../utils/GeneralUtil')
const ResponseUtil = require('../utils/ResponseUtil')
class Supplier {
    //method: GET
    //url: /supplier/get-all
    getAll = async(req, res) =>{
        const data =await SupplierModel.get()
        if(!data) {
            return res.json(ResponseUtil.response(false, 'Lỗi hệ thống', [], ['không thể lấy dữ liệu từ database']))
        }
        return res.json(data)
    }

    insert = async(req, res) => {
        const data = req.body

        if(!data) {
            return res.json(ResponseUtil.response(false, 'Dữ liệu truyền vào không hợp lệ', [], ['Dữ liệu không hợp lệ']))
        }

        try {
            const response = await SupplierModel.insert(data)

            if(checkIsEmptyObject(response)) {
                return res.json(ResponseUtil.response(false, 'Không thêm dữ liệu', [], ['Có lỗi xảy ra khi thêm dữ liệu']))
            }
            return res.json(response)
        } catch (error) {
            return res.json(ResponseUtil.response(false, 'Lỗi hệ thống', [], [error]))
        }
    }

    update = async (req, res) => {
        const data= req.body

        if(!data.id) {
            return res.json(ResponseUtil.response(false, 'Đối tượng cần sửa không hợp lệ'))
        }

        const objCondition = { id: data.id }
        delete data.id

        if(checkIsEmptyObject(data)) {
            return res.json(ResponseUtil.response(false, 'Dữ liệu chỉnh sửa không hợp lệ'))
        }

        try {
            const response = await SupplierModel.update(data, objCondition)

            if(!response) {
                return res.json(ResponseUtil.response(false, 'Có lỗi xảy ra'))
            }
            return res.json(response)
        } catch (error) {
            return res.json(ResponseUtil.response(false, 'Lỗi hệ thống'))
        }
    }
}

module.exports = new Supplier()