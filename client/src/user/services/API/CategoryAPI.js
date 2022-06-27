import axios from "axios"
const BASE_URL = process.env.REACT_APP_API_HOST_URL + "/category"
const CategoryAPI = {
    getAll: async(params) => {
        try {
            const url = `${BASE_URL}`+"/get-all"
            const response = await axios.get(url, {params: params})
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (id) => {
        try {
            const url = `${BASE_URL}/get-detail`
            const response = await axios.get(url, {params: {id}})
            return response.data
        } catch (error) {
            console.warn(error)
        }
    },
    getTree: async () => {
        try {
            const url = `${BASE_URL}/get-tree`
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            console.log(error)            
        }
    }
}
 
export default CategoryAPI;