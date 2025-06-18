import React, { useEffect } from 'react';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setUserData } from './features/UserProfileData';

function Layout() {

    const dispatch = useDispatch()

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await axios.get("/api/v1/users/getCurrentUser", {
                    withCredentials: true,
                });

                console.log("get request data at layout.jsx", res.data)
                dispatch(setUserData(res.data))
            } catch (err) {
                console.log("User not logged in", err.message);
            }
        };

        getUserData();
    }, []);



    const location = useLocation();

    // Define the routes where you DON'T want Header and BottomMenu
    const hideOnRoutes = ['/signup', '/signin'];

    const shouldHideLayout = hideOnRoutes.includes(location.pathname);

    return (
        <>
            {!shouldHideLayout && <Header />}
            <Outlet />
            {!shouldHideLayout && <BottomMenu />}
        </>
    );
}

export default Layout;
