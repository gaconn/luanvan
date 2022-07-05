import { useParams } from "react-router-dom"
import CartComponent from "../components/Cart"
import ChechOutComponent from "../components/CheckOut"
import DetailComponent from "../components/Detail"

const Main = () => {
    const {option} = useParams()
    var pageBody 
    switch (option) {
        case "ProductDetail":
            pageBody = <DetailComponent  />
            break;
        case "Cart":
            pageBody = <CartComponent />
            break;
        case "Checkout": 
            pageBody = <ChechOutComponent/>
            break;
        default:
            break;
    }
    return (
        <>
         {pageBody}
        </>
    )
}

export default Main