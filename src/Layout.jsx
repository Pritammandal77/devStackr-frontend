import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserData, setIsLoggedIn } from './features/UserProfileData';
import SideBar from './components/SideBar';
import axiosInstance from './utils/axiosInstance';
import { toast } from 'sonner';

function Layout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [currUser, setCurrUser] = useState(null);

    let user;
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                user = await axiosInstance.get("/api/v1/users/getCurrentUser");
                // console.log("current user", user)
                setCurrUser(user);
                dispatch(setCurrentUserData(user.data));
                dispatch(setIsLoggedIn(user.data.success));
                if (user.data.success) {
                    navigate('/')
                }
            } catch (err) {
                console.log("User not logged in", err.message);
                toast.error("Session expired, please log in again");
                navigate("/signup");
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currUser) {
            navigate("/")
        }
        if (!currUser) {
            dispatch(setIsLoggedIn(false));
        }

    }, [currUser]);

    // Defining the routes where we do not want Header and BottomMenu
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
            <Outlet />
            {!shouldHideOnChatPages && <BottomMenu />}
        </>
    );
}

export default Layout;


















// import React, { useEffect, useState } from 'react';
// import Header from './components/Header';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomMenu from './components/BottomMenu';
// import { useDispatch } from 'react-redux';
// import { setCurrentUserData, setIsLoggedIn } from './features/UserProfileData';
// import SideBar from './components/SideBar';
// import axiosInstance from './utils/axiosInstance';
// import { toast } from 'sonner';

// function Layout() {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             try {
//                 let user = await axiosInstance.get("/api/v1/users/getCurrentUser");
//                 console.log("current user", user)
//                 dispatch(setCurrentUserData(user.data));
//                 dispatch(setIsLoggedIn(user.data.success));
//                 if (user.data.success) {
//                     console.log("1")
//                     navigate('/')
//                 } else {
//                     console.log("2")
//                     navigate("/signin")
//                 }
//             } catch (err) {
//                 console.log("User not logged in", err.message);
//                 toast.error("Session expired, please log in again");
//                 navigate("/signup");
//             }
//         };

//         fetchCurrentUser();
//     }, []);

//     // Defining the routes where we do not want Header and BottomMenu
//     const hideOnRoutes = ['/signup', '/signin',];
//     const shouldHideLayout = hideOnRoutes.includes(location.pathname);

//     //for hiding the bottomMenu on this routes
//     const pathname = location.pathname;
//     const shouldHideOnChatPages =
//         pathname === '/chatlist' ||
//         pathname.startsWith('/chat/messages/') ||
//         pathname === '/signup' ||
//         pathname === '/signin';

//     return (
//         <>
//             {!shouldHideLayout && <Header />}
//             {!shouldHideLayout && <SideBar />}
//             <Outlet />
//             {!shouldHideOnChatPages && <BottomMenu />}
//         </>
//     );
// }

// export default Layout;













