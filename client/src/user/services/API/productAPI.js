import axios from "axios"

const productUrl = process.env.REACT_APP_API_HOST_URL + "/product"

const productAPI = {
    getAll: async(params) => {
        try {
            const url = productUrl+"/get-all"
            const response = await axios.get(url, {params: params})
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (id) => {
        try {
            const url = `${productUrl}/get-detail`
            const response = await axios.get(url, {params: {id}})
            return response.data
        } catch (error) {
            console.warn(error)
        }
    },
    getCheckoutList: async (params) => {
        try {
            const url = productUrl + "/get-product-checkout-list"
            const response = await axios.get(url, {params: params})
            return response.data
        } catch (error) {
            return false
        }
    }
}

export default productAPI