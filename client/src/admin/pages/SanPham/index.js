import React from 'react'
import DanhSachSanPham from "./DanhSachSanPham"
import ThemSanPham from "./ThemSanPham"

const SanPham = ({option}) => {
    var body 
    switch (option) {
        case "list":
            body=<DanhSachSanPham />
            break;
        case "add":
            body = <ThemSanPham />
            break
        default:
            break;
    }
  return (
    body
  )
}

export default SanPham