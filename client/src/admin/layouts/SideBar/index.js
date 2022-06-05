import {Container, Content , List, Item} from "./SideBar.style"
import {AiOutlinePlus} from "react-icons/ai"
import {RiAccountCircleLine} from 'react-icons/ri'
import {FiSettings} from 'react-icons/fi'
import Accordion from "react-bootstrap/Accordion"
import Home from "./Item/Home"
import QuanLyKhoHang from "./Item/QuanLyKhoHang"
import QuanLyDonHang from "./Item/QuanLyDonHang"
import QuanLyNhaCungCap from "./Item/QuanLyNhaCungCap"
import QuanLyGianHang from "./Item/QuanLyGianHang"
import QuanLyDoiTra from "./Item/QuanLyDoiTra"
import QuanLyKhuyenMai from "./Item/QuanLyKhuyenMai"
import QuanLyPhuongThucThanhToan from "./Item/QuanLyPhuongThucThanhToan"
import QuanLyNguoiDung from "./Item/QuanLyNguoiDung"
import QuanLyPhanQuyen from "./Item/QuanLyPhanQuyen"
import QuanLyTheLoai from "./Item/QuanLyTheLoai"
const SideBar = () => {
    
    return (
        <>
            <Container>
            <Content>
                <Accordion defaultActiveKey="0">
                <List className="side-bar-list-1">
                    <Home/>
                    
                    <QuanLyKhoHang/>

                    <QuanLyDonHang />
                    
                    <QuanLyNhaCungCap />
                    
                    <QuanLyGianHang />
                    
                    <QuanLyDoiTra />
                    
                    <QuanLyKhuyenMai/>
                    
                    <QuanLyPhuongThucThanhToan/>
                    
                    <QuanLyNguoiDung/>
                    
                    <QuanLyPhanQuyen/>

                    <QuanLyTheLoai />
                </List>
                </Accordion>
                <List>
                    <Item>
                        <div className="side-bar-item-control">
                            <span className="side-bar-item-icon"><RiAccountCircleLine /></span>
                            <span className="side-bar-item-label">Account</span>
                            <span className="side-bar-item-icon-expand"><AiOutlinePlus/></span>    
                        </div>
                    </Item>
                    <Item>
                        <div className="side-bar-item-control">
                            <span className="side-bar-item-icon"><FiSettings /></span>
                            <span className="side-bar-item-label">Setting</span>
                            <span className="side-bar-item-icon-expand"><AiOutlinePlus/></span>
                        </div>
                    </Item>
                </List>
            </Content>
        </Container>
        </>
    )
}

export default SideBar