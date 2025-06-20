import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function BottomMenu() {

    const mode = useSelector((state) => state.mode.mode)

    return (
        <>
            <nav className={`w-[100vw] fixed bottom-0 h-12 flex items-center justify-center z-[100]
                ${mode == 'light' ? 'bg-[#FFF2EB] text-black' : 'bg-[#000] text-[#d3d3d3]'}`}>
                <ul className='w-[100%] lg:w-[60%] flex flex-row items-center justify-evenly text-[22px] '>
                    <li>
                        <NavLink to="/allusers"
                            className={({ isActive }) => (isActive && "text-[#3f0064] font-bold border-b-3 rounded-xl p-1")}>
                            <i className="fa-solid fa-users"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search"
                            className={({ isActive }) => (isActive && "text-[#3f0064] font-bold border-b-3 rounded-xl p-1")}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </NavLink>
                    </li>
                    <li className=' h-10 w-10 rounded-full flex items-center justify-center'>
                        <NavLink to="/createpost"
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${mode == 'light' ? 'bg-[#b9a59a] text-black' : 'bg-[#1d1d1d] text-[#ffffff]'}`}>
                            <i className="fa-solid fa-plus"></i>
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink to='home'
                            className={({ isActive }) => (isActive && "text-[#3f0064] font-bold border-b-3 rounded-xl p-1")}>
                            <i className="fa-solid fa-house"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile"
                            className={({ isActive }) => (isActive && "text-[#3f0064] font-bold border-b-3 rounded-xl p-1")}>
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
