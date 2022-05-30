import { useEffect, useState } from "react"
import AddNhaCungCap from "./AddNhaCungCap"
import DanhSachNhaCungCap from "./DanhSachNhaCungCap"

const NhaCungCap = ({option}) => {
    var body 
    switch (option) {
        case "list":
            body = <DanhSachNhaCungCap/>
            break;
        case "add":
            body = <AddNhaCungCap />
            break
        default:
            break;
    }
    return (
        body
    )
}

export default NhaCungCap