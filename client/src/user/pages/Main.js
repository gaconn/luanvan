import { useParams } from "react-router-dom"
import CartComponent from "../components/Cart"
import DetailComponent from "../components/Detail"
import ChechOutComponent from "../components/CheckOut"
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
            pageBody = <ChechOutComponent/>
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