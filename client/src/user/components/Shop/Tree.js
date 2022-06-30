import ListGroup from 'react-bootstrap/ListGroup';
import TreeITem from './TreeItem';
const Tree = ({ categoryParent = [] }) => {
    return (<>
        {categoryParent.map((node, index) => (
            <TreeITem key={index} node={node} />
        ))}
       

    </>);
}

export default Tree;