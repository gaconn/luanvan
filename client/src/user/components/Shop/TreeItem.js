
import Accordion from 'react-bootstrap/Accordion';
import ItemCate from './Item';
const TreeITem = ({ node }) => {
    const hasChild = (node.listChild && node.listChild.length > 0) ? true : false;
    return (<>
        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header ><a href=''>{node.Ten}</a></Accordion.Header>
                <Accordion.Body>
                    {hasChild && <ItemCate categoryParent={node.listChild} />}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>);
}

export default TreeITem;