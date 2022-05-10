const GeneralUtil = require("./GeneralUtil")

class DBUtil {
    where = (tableName,objCondition) => {
        var result = ""
        if(!GeneralUtil.checkIsEmptyObject(objCondition)) {
            result = "where "
            for(var item in objCondition) {
                result += `${tableName}.${item} = ${objCondition.item}`
            }
        }
        return result
    }

    select = (tableName, arrColumn) => {
        var result = "Select *"
        if(!GeneralUtil.checkIsEmptyArray(arrColumn)) {
            result = "Select "
            for(var i = 0 ; i< arrColumn.length ; i++) {
                if(i===0){
                    result += `${tableName}.${arrColumn[i]}`
                }
                result += `,${tableName}.${arrColumn[i]}`
            }
        }
        return result
    }
}

module.exports = new DBUtil()