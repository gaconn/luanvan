const CategoryModel = require("../models/CategoryModel")
const ResponseUtil = require("../utils/ResponseUtil")

class CategoryController {
    //method: GET
    //url: /category/get-all
    getAll = async(req, res) =>{
        const objQuery = req.query
        var objCondition = {...objQuery, DaXoa: 0}
        try {
            const data =await CategoryModel.get(objCondition)

            if(!data) {
                return res.json(ResponseUtil.response(false, 'Lỗi hệ thống', [], ['không thể lấy dữ liệu từ database']))
            }
            return res.json(data)
        } catch (error) {
            return res.json(ResponseUtil.response(false, 'Lỗi hệ thống'))
        }
    }

    insert = async(req, res) => {
        const data = req.body

        if(!data) {
            return res.json(ResponseUtil.response(false, 'Dữ liệu truyền vào không hợp lệ', [], ['Dữ liệu không hợp lệ']))
        }

        try {
            const response = await CategoryModel.insert(data)

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
            const response = await CategoryModel.update(data, objCondition)

            if(!response) {
                return res.json(ResponseUtil.response(false, 'Có lỗi xảy ra'))
            }
            return res.json(response)
        } catch (error) {
            return res.json(ResponseUtil.response(false, 'Lỗi hệ thống'))
        }
    }

    delete = async (req,res) => {
        const id = req.params.id
        if(!id) {
            return res.json(ResponseUtil.response(false, 'Tham số không hợp lệ'))
        }
        try {
            const objDataUpdate = {
                DaXoa: 1
            }
            const objCondition = {
                id: id
            }
            const response = await CategoryModel.update(objDataUpdate,objCondition)
            if(!response) {
                return res.json(ResponseUtil.response(false, "Có lỗi xảy ra"))
            }
            return res.json(response)
        } catch (error) {
            return res.json(ResponseUtil.response(false, "Lỗi hệ thống"))
        }
    }

    //GET /category/get-detail?id=
    getDetail = async(req, res) => {
        const query = req.query
        if(!query) return res.json(ResponseUtil.response(false, "Tham số không hợp lệ"))
        try {
            const id = query.id ? query.id : undefined
            const Ten = query.Ten ? query.Ten: undefined
            const HoatDong = query.HoatDong ? query.HoatDong : undefined

            const objCondition = {
                DaXoa: 0,
                id,
                Ten,
                HoatDong
            }
            const dataCategoryResponse = await CategoryModel.getDetail(objCondition)

            if(!dataCategoryResponse) {
                throw new Error("Không thể truy xuất database")
            }

            return res.json(dataCategoryResponse)
        } catch (error) {
            return res.json(ResponseUtil.response(false, error))
        }
    }
}

module.exports = new CategoryController()