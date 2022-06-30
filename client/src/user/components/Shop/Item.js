import ListGroup from 'react-bootstrap/ListGroup';


const ItemCate = ({ categoryParent=[]}) => {
  
    return (
        <>
        {
            categoryParent.map((categories,index)=>(
                <ListGroup key={index}>
                <ListGroup.Item action href=''>{categories.Ten}</ListGroup.Item>
            </ListGroup>
            ))
        }
           
        </>);
}

export default ItemCate;