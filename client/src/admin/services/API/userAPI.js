import axios from "axios"
const BASE_URL = process.env.REACT_APP_API_HOST_URL + "/user"
const userAPI = {
    login : async(data) => {
        const url = BASE_URL+"/login"
        const response = await axios.post(url, data)
        return response.data
    }
}
export default userAPI