import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.userData); // or state.userData.isLoggedIn
    console.log("isloggedin", isLoggedIn)

    const navigate = useNavigate();

    useEffect(() => {
        // setTimeout(() => {
            if (!isLoggedIn) {
                console.log("jhwgjgjc")
                navigate("/signin")
            }
        // }, 5000);
    }, [isLoggedIn]);

    return children;
};

export default ProtectedRoute;
