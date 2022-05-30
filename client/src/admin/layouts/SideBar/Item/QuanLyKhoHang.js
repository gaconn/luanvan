import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { BiAddToQueue } from "react-icons/bi"
import { BsHouseDoor } from "react-icons/bs"
import { RiStackLine, RiStackOverflowFill } from "react-icons/ri"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const QuanLyKhoHang = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="1"><BsHouseDoor /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý kho hàng</span>
                <ListTagToggle eventKey="1"><AiOutlinePlus /></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="1">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub side-1" id="side-bar-item-sub-1" key="1">
                            <div className="side-bar-item-control" >
                                <span className="side-bar-item-icon-sub"><RiStackLine /></span>
                                <span className="side-bar-item-label" >Danh sách sản phẩm trong kho</span>
                            </div>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><RiStackOverflowFill /></span>
                                <span className="side-bar-item-label">Danh sách sản phẩm xuất kho</span>
                            </div>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><BiAddToQueue /></span>
                                <span className="side-bar-item-label">Lưu kho</span>
                            </div>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyKhoHang