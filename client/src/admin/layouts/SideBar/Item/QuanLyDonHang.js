import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { BsCardChecklist } from "react-icons/bs"
import { GiBuyCard } from "react-icons/gi"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const quanLyDonHang = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="2"><GiBuyCard /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý đơn hàng</span>
                <ListTagToggle eventKey="2"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="2">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><BsCardChecklist /></span>
                                <span className="side-bar-item-label">Danh sách đơn hàng</span>   
                            </div>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default quanLyDonHang