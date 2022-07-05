import axios from "axios"
const BASE_URL = process.env.REACT_APP_API_HOST_URL + "/cart"
const CartAPI  =  {
    AddToCart: async(data)=>{
       try {
        const url=BASE_URL+'/add-to-cart'
        const response=await axios.post(url,data)
        return response.data
       } catch (error) {
        console.log(error)
       }
    },
    GetCart:async(id)=>{
        try {
            const url=BASE_URL+'/cart-item/get-all'
            const response=await axios.get(url,{params:{IDGioHang:id}})
            return response.data
           } catch (error) {
            console.log(error)
           }
    }
}
 
export default CartAPI ;