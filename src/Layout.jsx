import React, { useEffect } from 'react';
import Header from './components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setCurrentUserData, setIsLoggedIn } from './features/UserProfileData';
import SideBar from './components/SideBar';
import axiosInstance from './utils/axiosInstance';
import { toast } from 'sonner';

function Layout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await axiosInstance.get("/api/v1/users/getCurrentUser");
                console.log("current user", user)
                dispatch(setCurrentUserData(user.data));
                dispatch(setIsLoggedIn("true"));
                if(user.data.success){
                    navigate('/')
                }
                // if(!user.data.success){
                //     navigate("/signin")
                // }
            } catch (err) {
                console.log("User not logged in", err.message);
                toast.error("Session expired, please log in again");
                navigate("/signup");
            }
        };

        fetchCurrentUser();
    }, []);



    // Define the routes where you DON'T want Header and BottomMenu
    const hideOnRoutes = ['/signup', '/signin',];
    const shouldHideLayout = hideOnRoutes.includes(location.pathname);

    //for hiding the bottomMenu on this routes
    const pathname = location.pathname;
    const shouldHideOnChatPages =
        pathname === '/chatlist' ||
        pathname.startsWith('/chat/messages/') ||
        pathname === '/signup' ||
        pathname === '/signin';


    return (
        <>
            {!shouldHideLayout && <Header />}
            {!shouldHideLayout && <SideBar />}
            {/* <SideBar /> */}
            <Outlet />
            {!shouldHideOnChatPages && <BottomMenu />}
        </>
    );
}

export default Layout;





// const dispatch = useDispatch()
// const navigate = useNavigate()

// useEffect(() => {
//     const getUserData = async () => {
//         try {
//             const res = await axiosInstance.get("/api/v1/users/getCurrentUser", {
//                 withCredentials: true,
//             });

//             console.log("get request data at layout.jsx", res.data)
//             dispatch(setCurrentUserData(res.data))
//             if (res.data.statusCode == 200) {
//                 dispatch(setIsLoggedIn("true"))
//                 // navigate("/")
//             }
//         } catch (err) {
//             console.log("User not logged in", err.message);
//             navigate("/signup")
//         }
//     };

//     getUserData();
// }, []);


// useEffect(() => {
//     const refreshAccessToken = async () => {
//         try {
//             const res = await API.post("/refresh-token");
//             const newAccessToken = res.data.accessToken;
//             localStorage.setItem("accessToken", newAccessToken);
//         } catch (err) {
//             console.log("Refresh failed. Maybe login again.");
//         }
//     };

//     refreshAccessToken(); // call once on load
// }, []);