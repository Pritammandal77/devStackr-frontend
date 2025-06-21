// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.userData); // or state.userData.isLoggedIn
    console.log("isloggedin", isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;
