import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { FaRegListAlt } from "react-icons/fa"
import { GiLetterBomb } from "react-icons/gi"
import { RiPlayListAddFill } from "react-icons/ri"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const QuanLyKhuyenMai = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="6"><GiLetterBomb /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý khuyến mại</span>
                <ListTagToggle eventKey="6"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="6">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><FaRegListAlt /></span>
                                <span className="side-bar-item-label">Danh sách chương trình</span>
                            </div>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><RiPlayListAddFill /></span>
                                <span className="side-bar-item-label">Thêm chương trình khuyến mại</span>
                            </div>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyKhuyenMai