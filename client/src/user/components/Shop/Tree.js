import Button from "react-bootstrap/Button"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
const Tree = ({ categoryParent }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()
    const handlerID = (id) => {
        const params = new URLSearchParams({ IDTheLoai: id }).toString()
        if (location.pathname !== "Shop") {
            navigate("?" + params)
        } else setSearchParams(params)
    }
    const listChild = categoryParent.map((item, k) => (
        <div className="mx-auto" key={k}>
            <Button
                variant="outline-secondary"
                style={{ width: 200 }}
                onClick={() => handlerID(item.id)}
            >
                {item.Ten}
            </Button>
        </div>
    ))

    return <>{listChild}</>
}

export default Tree
