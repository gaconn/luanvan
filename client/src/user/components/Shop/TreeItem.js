import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Tree from './Tree';
const TreeITem = ({ node }) => {
    const hasChild = (node.listChild && node.listChild.length > 0) ? true : false;
    return (<>
        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header >{node.Ten}</Accordion.Header>
                <Accordion.Body>
                    {hasChild && <Tree categoryParent={node.listChild} />}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>);
}

export default TreeITem;