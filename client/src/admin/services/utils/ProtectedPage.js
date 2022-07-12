import { Navigate, Outlet, useLocation } from "react-router-dom"

const ProtectedPage = () => {
    let location = useLocation()
    if(!localStorage.getItem("USER_NAME")) {
        return <Navigate to='auth' state={{from: location}} replace />
    }
    if(!localStorage.getItem('USER_LEVEL') || localStorage.getItem('USER_LEVEL') > 3) {
        return <Navigate to={'permission-denied'} replace/>
    }
    return <Outlet />
}

export default ProtectedPage