import axios from "axios"

var supplierUrl = process.env.REACT_APP_API_HOST_URL+"/supplier"
const supplierAPI = {
    getAll: async() => {
        try {
            const url = supplierUrl+"/get-all"
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    insert: async(data) => {
        try {
            const url = supplierUrl+"/insert"
            const response = await axios.post(url,data)
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    update: async(data) => {
        try {
            const url = supplierUrl + "/update"
            const response = await axios.put(url, data)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
}

export default supplierAPI