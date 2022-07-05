import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_HOST_URL + "/product"
const ProducAPI = {
    getAll: async(page) => {
        try {
            const url =  BASE_URL +"/get-all"
            const response = await axios.get(url, {params: {page}})
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
    }
}
 
export default ProducAPI;