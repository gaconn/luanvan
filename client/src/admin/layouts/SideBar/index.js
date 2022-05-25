import {Container, Content , List, Item} from "./SideBar.style"
import {AiOutlineEdit, AiOutlineHome, AiOutlinePlus} from "react-icons/ai"
import {GiBuyCard, GiHumanPyramid, GiLetterBomb, GiTrade} from 'react-icons/gi'
import {RiAccountCircleLine, RiFolderUserLine, RiPlayListAddFill, RiStackOverflowFill} from 'react-icons/ri'
import {FiSettings} from 'react-icons/fi'
import { Link } from "react-router-dom"
import Accordion from "react-bootstrap/Accordion"
import ListTagToggle from "./ListTagToggle"
import { useState } from "react"
import {BsCardChecklist, BsHouseDoor,} from 'react-icons/bs'
import {RiStackLine} from 'react-icons/ri'
import {BiAddToQueue, BiUserPlus} from 'react-icons/bi'
import { FaClipboardList, FaHandsHelping, FaRegListAlt, FaRegMoneyBillAlt, FaUserAlt, FaUserTie } from "react-icons/fa"
import {IoStorefrontOutline}from 'react-icons/io5'
import { MdOutlineCategory, MdOutlineProductionQuantityLimits, MdOutlineSell } from "react-icons/md"
import IconTagToggle from "./IconTagToggle"
const SideBar = () => {
    return (
        <Container>
            <Content>
                <Accordion defaultActiveKey="0">
                <List className="side-bar-list-1">
                    <Item>
                        <div className="side-bar-item-control">
                            <span className="side-bar-item-icon"><AiOutlineHome /></span>
                            <span className="side-bar-item-label"><Link to="/manage/home">Home</Link></span>
                        </div>
                    </Item>
                    
                    <Item>
                        <div className="side-bar-item-control">
                            <IconTagToggle eventKey="1"><BsHouseDoor /></IconTagToggle>
                            <span className="side-bar-item-label">Quản lý kho hàng</span>
                            <ListTagToggle eventKey="1"><AiOutlinePlus /></ListTagToggle>
                        </div>
                        <Accordion.Collapse eventKey="1">
                            <div className="side-bar-item-expand-list">
                                <List>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><RiStackLine /></span>
                                            <span className="side-bar-item-label">Danh sách sản phẩm trong kho</span>
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
                    <Item>
                        <div className="side-bar-item-control">
                            <IconTagToggle eventKey="3"><GiHumanPyramid /></IconTagToggle>
                            <span className="side-bar-item-label">Quản lý nhà cung cấp</span>
                            <ListTagToggle eventKey="3"><AiOutlinePlus/></ListTagToggle>
                        </div>
                        <Accordion.Collapse eventKey="3">
                            <div className="side-bar-item-expand-list">
                                <List>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><BsCardChecklist /></span>
                                            <span className="side-bar-item-label">Danh sách nhà cung cấp</span>   
                                        </div>
                                    </Item>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><FaHandsHelping /></span>
                                            <span className="side-bar-item-label">Thêm nhà cung cấp</span>   
                                        </div>
                                    </Item>
                                </List>
                            </div>
                        </Accordion.Collapse>
                    </Item>
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
                    <Item>
                        <div className="side-bar-item-control">
                            <IconTagToggle eventKey="5"><GiTrade /></IconTagToggle>
                            <span className="side-bar-item-label">Quản lý đổi trả</span>
                            <ListTagToggle eventKey="5"><AiOutlinePlus/></ListTagToggle>
                        </div>
                        <Accordion.Collapse eventKey="5">
                            <div className="side-bar-item-expand-list">
                                <List>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><FaClipboardList /></span>
                                            <span className="side-bar-item-label">Danh sách đổi trả</span>
                                        </div>
                                    </Item>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><RiPlayListAddFill /></span>
                                            <span className="side-bar-item-label">Thêm đơn đổi trả</span>
                                        </div>
                                    </Item>
                                </List>
                            </div>
                        </Accordion.Collapse>
                    </Item>
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
                    <Item>
                        <div className="side-bar-item-control">
                            <IconTagToggle eventKey="7"><FaRegMoneyBillAlt /></IconTagToggle>
                            <span className="side-bar-item-label">Phương thức thanh toán</span>
                            <ListTagToggle eventKey="7"><AiOutlinePlus/></ListTagToggle>
                        </div>
                        <Accordion.Collapse eventKey="7">
                            <div className="side-bar-item-expand-list">
                                <List>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><FaRegListAlt /></span>
                                            <span className="side-bar-item-label">Danh sách phương thức thanh toán</span>
                                        </div>
                                    </Item>
                                </List>
                            </div>
                        </Accordion.Collapse>
                    </Item>
                    <Item>
                        <div className="side-bar-item-control">
                            <IconTagToggle eventKey="8"><FaUserAlt /></IconTagToggle>
                            <span className="side-bar-item-label">Quản lý người dùng</span>
                            <ListTagToggle eventKey="8"><AiOutlinePlus/></ListTagToggle>
                        </div>
                        <Accordion.Collapse eventKey="8">
                            <div className="side-bar-item-expand-list">
                                <List>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><RiFolderUserLine /></span>
                                            <span className="side-bar-item-label">Danh sách người dùng</span>
                                        </div>
                                    </Item>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><BiUserPlus /></span>
                                            <span className="side-bar-item-label">Thêm người dùng</span>
                                        </div>
                                    </Item>
                                </List>
                            </div>
                        </Accordion.Collapse>
                    </Item>
                    <Item>
                        <div className="side-bar-item-control">
                            <IconTagToggle eventKey="9"><FaUserTie /></IconTagToggle>
                            <span className="side-bar-item-label">Quản lý phân quyền</span>
                            <ListTagToggle eventKey="9"><AiOutlinePlus/></ListTagToggle>
                        </div>
                        <Accordion.Collapse eventKey="9">
                            <div className="side-bar-item-expand-list">
                                <List>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><FaClipboardList /></span>
                                            <span className="side-bar-item-label">Danh sách phân quyền</span>
                                        </div>
                                    </Item>
                                    <Item className="side-bar-item-sub">
                                        <div className="side-bar-item-control">
                                            <span className="side-bar-item-icon-sub"><AiOutlineEdit /></span>
                                            <span className="side-bar-item-label">Thêm phân quyền</span>
                                        </div>
                                    </Item>
                                </List>
                            </div>
                        </Accordion.Collapse>
                    </Item>
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
    )
}

export default SideBar