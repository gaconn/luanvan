import Accordion from "react-bootstrap/Accordion"
import Tree from "./Tree"
const Item = ({ categoryParent }) => {
    const Parent = categoryParent.map((item, k) => (
        <Accordion defaultActiveKey="0" key={k}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{item.Ten}</Accordion.Header>
                <Accordion.Body>
                    <Tree categoryParent={item.listChild} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    ))

    return <>{Parent}</>
}

export default Item
