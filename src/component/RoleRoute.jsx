import { Navigate } from "react-router-dom";
import { getUser } from "../utilits/auth";


const RoleRoute = ({ allowedRoles, children }) => {
    const user = getUser();
    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RoleRoute;
