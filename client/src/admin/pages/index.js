import { useParams } from "react-router-dom"
import SideBar from "../layouts/SideBar"
import NhaCungCap from "./NhaCungCap"
import TheLoai from "./TheLoai"
import SanPham from "./SanPham"
import Order from "./Order"
import User from "./User"
import KhoHang from "./KhoHang"
import DoiTra from "./DoiTra"
import Discount from "./Discount"
import Denied from "../components/Denied"
const Main = () => {
    const {manage, option} = useParams()
    var pageBody 
    var level = localStorage.getItem('USER_LEVEL')
    switch (manage) {
        case "supplier":
            if(!level || level >2) {
                pageBody= <Denied/>
            }else {
                pageBody = <NhaCungCap option={option} />
            }
            break;
        case "category":
            if(!level || level >2) {
                pageBody= <Denied/>
            }else {
                pageBody = <TheLoai option={option}/>
            }
            break;
        case "product": 
            if(!level || level >3) {
                pageBody= <Denied/>
            }else {
                pageBody = <SanPham option= {option} />
            }
            break;
        case "order":
            if(!level || level >3) {
                pageBody= <Denied/>
            }else {
                pageBody = <Order option= {option}/>
            }
            break;
        case "user":
            if(!level || level >1) {
                pageBody= <Denied/>
            }else {
                pageBody = <User option = {option}/>
            }
            break
        case "warehouse":
            if(!level || level >3) {
                pageBody= <Denied/>
            }else {
                pageBody = <KhoHang option = {option}/>
            }
            break
        case "change": 
            if(!level || level >3) {
                pageBody= <Denied/>
            }else {
                pageBody = <DoiTra option = {option}/>
            }
            break
        case "discount":
            if(!level || level >2) {
                pageBody= <Denied/>
            }else {
                pageBody = <Discount option = {option} />
            }
            break
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