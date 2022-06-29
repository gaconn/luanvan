import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
const ItemCate = ({category}) => {
    console.log(category)
    return (
    <>
        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header >Hello</Accordion.Header>
                <Accordion.Body>
                    <ListGroup>
                        <ListGroup.Item action href=''></ListGroup.Item>
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>);
}

export default ItemCate;