import { Container, Content } from "./FilterContainer.style";
import Accordion from "react-bootstrap/Accordion"
import AccordionToggler from "../AccordionToggler";
import {GrFilter} from "react-icons/gr"
import Button from "react-bootstrap/Button"
import { useState } from "react";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const FilterContainer = ({children}) => {
    const [status, setStatus] = useState(0)
    return (
        <Container>
            <Content>                
                <Accordion defaultActiveKey= "0">
                    <Accordion.Collapse eventKey="filter-1">
                    {
                        children
                    }
                    </Accordion.Collapse>
                    <Button className="filter-search" variant="success">
                        Tìm kiếm
                    </Button>
                    <Button className="filter-unsearch" variant="warning">
                        Bỏ tìm kiếm
                    </Button>
                    <AccordionToggler eventKey="filter-1">
                        <Button className="filter-toggle-button float-end" variant="primary">
                            {status ===0 ?<span>Hiện công cụ tìm kiếm</span> :
                                <span>Ẩn công cụ tìm kiếm</span>
                            }
                        </Button>
                    </AccordionToggler>

                    
                </Accordion>
            </Content>
        </Container>
    )
}

export default FilterContainer