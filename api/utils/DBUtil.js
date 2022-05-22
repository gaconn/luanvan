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
}

module.exports = new DBUtil()