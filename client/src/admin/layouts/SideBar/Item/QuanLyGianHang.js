import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { IoStorefrontOutline } from "react-icons/io5"
import { MdOutlineCategory, MdOutlineProductionQuantityLimits, MdOutlineSell } from "react-icons/md"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const QuanLyGianHang = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="4"><IoStorefrontOutline /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý gian hàng</span>
                <ListTagToggle eventKey="4"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="4">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><MdOutlineProductionQuantityLimits /></span>
                                <span className="side-bar-item-label">Danh sách sản phẩm</span>
                            </div>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><MdOutlineSell /></span>
                                <span className="side-bar-item-label">Danh sách sản phẩm giảm giá</span>
                            </div>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><MdOutlineCategory /></span>
                                <span className="side-bar-item-label">Danh sách danh mục</span>
                            </div>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyGianHang