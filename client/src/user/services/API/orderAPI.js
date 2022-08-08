import axios from "axios"

const orderUrl = process.env.REACT_APP_API_HOST_URL + "/order"

const orderAPI = {
    getAll: async (params = { page: 1 }) => {
        try {
            const url = orderUrl + "/get-orders"
            const response = await axios.get(url, { params: params })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    getAllOrder: async (params) => {
        try {
            const url = orderUrl + "/get-orders"
            const response = await axios.get(url, { params: params })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    changeStatus: async (params) => {
        try {
            const url = orderUrl + "/change-status"
            const response = await axios.put(url, params)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    checkout: async (params) => {
        try {
            const url = orderUrl + "/checkout"
            const response = await axios.post(url, params)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    getDetail: async (params) => {
        try {
            const url = orderUrl + "/get-order-detail"
            const response = await axios.get(url, { params: params })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    detail: async (id) => {
        try {
            const url = `${orderUrl}/get-detail`
            const response = await axios.get(url, { params: { id } })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    getCheckoutList: async (params) => {
        try {
            const url = orderUrl + "/get-product-checkout-list"
            const response = await axios.get(url, { params: params })
            return response.data
        } catch (error) {
            return false
        }
    },
}

export default orderAPI
