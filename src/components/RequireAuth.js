import { useLocation, Navigate, Outlet } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const auth = secureLocalStorage.getItem("auth")
    // console.log('auth',auth)
    // console.log('auth roles',auth.roles)
    // console.log('allow roles',allowedRoles)
    // console.log('allow roles include',allowedRoles.includes(2))
 
    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken
                ? <Navigate to="/unauthorized" />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;