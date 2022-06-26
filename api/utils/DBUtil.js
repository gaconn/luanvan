const { checkIsObject } = require("./GeneralUtil")
const GeneralUtil = require("./GeneralUtil")

class DBUtil {
    buildFieldQuery = (objData) => {
        if(checkIsObject === false) {
            return ""
        }
        if(Object.keys(objData).length === 0) return "" 
        const arrKeys = Object.keys(objData)
        if(!arrKeys) return ""
        const strKeys = arrKeys.join(", ")
        return strKeys
    }
    _buildSelect = (arrField, table, prefix ='') => {
        var strSelect = ''
        for (let index = 0; index < arrField.length; index++) {
            strSelect += `, ${table}.${arrField[index]} ` 
            strSelect += prefix && arrField[index]!== '*' ? prefix + arrField[index] : ''
        }
        return strSelect
    }

    /**
     * Tạo ra mảng dữ liệu được sắp xếp đúng thứ tự của strField
     * @param {string} strField example: "id, name, old"
     * @returns array example: [1, 'quan', 18]
     */
    _buildInsertField = (strField, objField) => {
        const arrField = strField.split(', ')

        var arrValue = []

        for(let i = 0; i<arrField.length ; i++) {
            arrValue.push(objField[arrField[i].trim()])
        }
        return arrValue
    }
    object_filter = (objData) => {
         Object.keys(objData).forEach((key) => {
            if(objData[key] === undefined || objData[key] === null) {
                delete objData[key]
            }
        })
        return objData
    }
    
}

module.exports = new DBUtil()