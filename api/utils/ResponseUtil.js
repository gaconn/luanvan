class ResponseUtil{
    response = (isSuccess, message, data=[], arrError = []) =>{
        return {success: isSuccess, message: message, data, error: arrError}
    }
}

module.exports = new ResponseUtil()