import ListGroup from "react-bootstrap/ListGroup"
const ListItem = ({ listChild = [], handlerID }) => {
    const listChildItem = listChild.map((item, k) => {
        //    return ( <li key={k} onClick={()=>{ handlerID(item.id)}}> {item.Ten}</li>)
        return (
            <ListGroup key={k}>
                {" "}
                <ListGroup.Item
                    action
                    onClick={() => {
                        handlerID(item.id)
                    }}
              
                >
                    {item.Ten}
                </ListGroup.Item>
            </ListGroup>
        )
    })
    return <>{listChildItem}</>
}

export default ListItem
