import ListGroup from 'react-bootstrap/ListGroup';
import TreeITem from './TreeItem';
const Tree = ({ categoryParent = [] }) => {
    var parent=[]
    
    return (<>
        {categoryParent.map((node, index) => (
            <TreeITem key={index} node={node} />
        ))}
       

    </>);
}

export default Tree;