import { Link, Outlet } from "react-router-dom"

const Home = () => {
    return <div>
        <div></div>
        <Link to="/manage/login">Login</Link>
        <Outlet />
    </div>
}

export default Home 