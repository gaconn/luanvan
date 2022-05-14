import { Link, Outlet } from "react-router-dom"

const Home = () => {
    return <div>
        <Link to="/manage/login">Login</Link>
        <Outlet />
    </div>
}

export default Home 