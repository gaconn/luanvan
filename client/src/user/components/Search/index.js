import { Container, Input, Icon } from "./Search.style";
import {AiOutlineSearch} from "react-icons/ai"
import "./Search.style.css"
const Search = ({key, onKeyChange}) => {
    return <Container>
        <Input placeholder="Nhập tên sản phẩm" value={key} onChange={onKeyChange}/>
        <Icon>
            <AiOutlineSearch/>
        </Icon>
    </Container>
}

export default Search