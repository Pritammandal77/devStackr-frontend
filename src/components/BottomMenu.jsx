import React from 'react';
import { NavLink } from 'react-router-dom';

function BottomMenu() {
    return (
        <>
            <nav className='w-[100vw] fixed bottom-0 h-12 bg-[#ba88d6] flex items-center justify-center '>
                <ul className='w-[100%] lg:w-[60%] flex flex-row items-center justify-evenly text-[22px] '>
                    <li>
                        <NavLink to="/allusers"
                            className={({ isActive }) => (isActive ? "text-[#3f0064] font-bold border-b-3 rounded-xl p-1" : "text-black p-1")}>
                            <i className="fa-solid fa-users"></i>
                        </NavLink>
                    </li>
                    <li>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </li>
                    <li className='bg-[#9941cc] h-10 w-10 rounded-full flex items-center justify-center'>
                        <i className="fa-solid fa-plus"></i>
                    </li>
                    <li className=''>
                        <NavLink to='home'
                            className={({ isActive }) => (isActive ? "text-[#3f0064] font-bold border-b-3 rounded-xl p-1" : "text-black p-1")}>
                            <i className="fa-solid fa-house"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile"
                            className={({ isActive }) => (isActive ? "border-2 border-[#3f0064] rounded-full flex items-center justify-center" : "border-2 border-[#ba88d6] rounded-full flex items-center justify-center")}>
                            <img src="/myNewDp.jpg" alt=""
                                className='h-9 w-9 rounded-full' />
                        </NavLink>

                    </li>
                </ul>
            </nav>
        </>
    );
}

export default BottomMenu;
