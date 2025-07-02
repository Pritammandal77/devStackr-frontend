import React, { useEffect } from 'react';
import Header from './components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setCurrentUserData, setIsLoggedIn } from './features/UserProfileData';
import SideBar from './components/SideBar';
import axiosInstance from './utils/axiosInstance';

function Layout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await axiosInstance.get("/api/v1/users/getCurrentUser", {
                    withCredentials: true,
                });

                console.log("get request data at layout.jsx", res.data)
                dispatch(setCurrentUserData(res.data))
                if (res.data.statusCode == 200) {
                    dispatch(setIsLoggedIn("true"))
                    // navigate("/")
                }
            } catch (err) {
                console.log("User not logged in", err.message);
                navigate("/signup")
            }
        };

        getUserData();
    }, []);



    const location = useLocation();

    // Define the routes where you DON'T want Header and BottomMenu
    const hideOnRoutes = ['/signup', '/signin',];

    const shouldHideLayout = hideOnRoutes.includes(location.pathname);

    return (
        <>
            {!shouldHideLayout && <Header />}
            {!shouldHideLayout && <SideBar />}
            {/* <SideBar /> */}
            <Outlet />
            {!shouldHideLayout && <BottomMenu />}
        </>
    );
}

export default Layout;
