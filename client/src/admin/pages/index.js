import { Link, useParams } from "react-router-dom"
import SideBar from "../layouts/SideBar"
import NhaCungCap from "./NhaCungCap"

const Main = () => {
    const {manage, option} = useParams()
    var pageBody 

    switch (manage) {
        case "supplier":
            pageBody = <NhaCungCap option={option} />
            break;
    
        default:
            break;
    }
    return (
        <div className="d-flex">
            <SideBar/>
            <div className="flex-fill">
                {pageBody}
            </div>
        </div>
    )
}

export default Main