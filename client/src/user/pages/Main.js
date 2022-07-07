import { useParams } from "react-router-dom"
import CartComponent from "../components/Cart"
import DetailComponent from "../components/Detail"
import Checkout from "../components/Checkout"
const Main = () => {
    const { option} = useParams()
    var pageBody 
    switch (option) {
        case "Cart":
            pageBody = <CartComponent />
            break;
        case "ProductDetail": 
            pageBody = < DetailComponent/>
            break;
        case "CheckOut":
            pageBody = <Checkout/>
            break;
        default:
            break;
    }
    return (
        <div>
              {pageBody}
        </div>
    )
}

export default Main