import { useAuth } from "../components/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.role;
    console.log(role)
    // if (role === 'admin') {
    //     // Authenticated and admin, redirect to homepage
    //     window.location.href = "/";
    //     return null;
    // }

    if (!isAuthenticated) {
        // Not authenticated, redirect to login
        window.location.href = "http://localhost:5173"
        return;
    }


    // Authenticated and not admin, allow access
    return <Outlet />;
};

export default ProtectedRoute;
