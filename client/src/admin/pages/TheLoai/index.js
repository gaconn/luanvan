import AddTheLoai from "./AddTheLoai";
import DanhSachTheLoai from "./DanhSachTheLoai";
import UpdateTheLoai from "./UpdateTheLoai";

const TheLoai = ({option}) => {
    var body
    switch (option) {
        case 'list':
              body= <DanhSachTheLoai />  
            break;
        case 'update': 
            body= <UpdateTheLoai />
            break
        case 'add':
            body= <AddTheLoai/>
            break
        default:
            break;
    }
    return (
        body
    )
}

export default TheLoai