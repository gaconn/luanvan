import Accordion from "react-bootstrap/Accordion"
import ListItem from "./ListItem"
import ListGroup from "react-bootstrap/ListGroup"
const TreeNavBar = ({ listChild = [], handlerIDItem }) => {
    const Tree = listChild.map((item, k) => {
        if (item.listChild.length === 0) {
            return (
                <ListGroup>
                    <ListGroup.Item
                        action
                        onClick={() => {
                            handlerIDItem(item.id)
                        }}
                        key={k}
                    >
                        {item.Ten}
                    </ListGroup.Item>
                </ListGroup>
            )
        }
        if (item.listChild) {
            return (
                <Accordion defaultActiveKey="0" flush key={k}>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header
                            onClick={() => {
                                handlerIDItem(item.id)
                            }}
                        >
                            {item.Ten}
                        </Accordion.Header>
                        <Accordion.Body>
                            <ListItem listChild={item.listChild} handlerID={handlerIDItem} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        }
        return (
            <div key={k}>
                <ListItem listChild={item.listChild} handlerID={handlerIDItem} />
            </div>
        )
    })
    return <>{Tree}</>
}

export default TreeNavBar
