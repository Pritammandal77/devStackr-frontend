import React from 'react';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';

function Layout() {

    const location = useLocation();

    // Define the routes where you DON'T want Header and BottomMenu
    const hideOnRoutes = ['/signup', '/register'];

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
