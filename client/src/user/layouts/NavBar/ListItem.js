const ListItem = ({ listChild = [], handlerID }) => {
    console.log(listChild)
    const listChildItem= listChild.map((item, k) => {
       return ( <li key={k} onClick={()=>{ handlerID(item.id)}}> {item.Ten}</li>)
    })
    return (
        <>
            {
                listChildItem
            }
        </>
    );
}

export default ListItem;