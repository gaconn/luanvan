class GeneralUtil {
    checkIsEmptyArray = (array) => {
        if(Array.isArray(array)){
            return array.length > 0 ? false : true
        }
        return true
    }

    checkIsEmptyObject = (obj) => {
        if(Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true
        }
        return false
    }
}

module.exports = new GeneralUtil()