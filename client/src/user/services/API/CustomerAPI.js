import axios from "axios"
const BASE_URL = process.env.REACT_APP_API_HOST_URL + "/user"
const CustommerAPI = {
    register : async(data) => {
        try {
            const url = BASE_URL+"/register"
            const response = await axios.post(url, data)
            return response.data
        } catch (error) {
         console.log(error)
        }
       
    },
    login:async (data)=>{
        try {
            const url = BASE_URL+"/login"
            const response = await axios.post(url, data)
            return response.data
        } catch (error) {
         console.log(error)
        }
    }
}
export default CustommerAPI