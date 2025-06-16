import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <BottomMenu />
        </>
    );
}

export default Layout;
