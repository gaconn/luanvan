const bcrypt = require("bcrypt")
class GeneralUtil {
    checkIsEmptyArray = (array) => {
        if (Array.isArray(array)) {
            return array.length > 0 ? false : true
        }
        return true
    }
    checkIsObject = (data) => {
        if (typeof data === "object" && data !== null) {
            return true
        }
        return false
    }
    checkIsEmptyObject = (obj) => {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true
        }
        return false
    }

    checkIsEmptyString = (str) => {}
    checkValidEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    checkIsValidPassword = (strPassword) => {
        let password = String(strPassword).trim()
        if (password) {
            if (password.length > 6) {
                return true
            }
        }
        return false
    }
    checkIsValidPhone = (strPhone) => {
        let phone = String(strPhone).trim()
        if (phone) {
            if (strPhone.length === 10 && !isNaN(phone)) {
                return true
            }
        }
        return false
    }
    hashPassword = (strPassword) => {
        try {
            const salt = bcrypt.genSaltSync(process.env.BCRYPT_SALT_ROUNDS * 1)
            const hash = bcrypt.hashSync(strPassword, salt)
            return hash
        } catch (error) {
            throw error
        }
    }

    verifyPassword = (plainPassword, hashedPassword) => {
        try {
            const isTrue = bcrypt.compareSync(plainPassword, hashedPassword)
            return isTrue
        } catch (error) {
            throw error
        }
    }
    //Tìm kiếm mail
    upsert = (array, item) => {
        const i = array.findIndex((_item) => _item.Email === item.Email)
        if (i > -1) array[i] = item
        else array.push(item)
    }
}

module.exports = new GeneralUtil()
