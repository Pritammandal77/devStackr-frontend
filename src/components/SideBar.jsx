import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiLogOut } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { setMode } from '../features/ToggleMode';
import axios from 'axios';
import { toast } from 'sonner';
import axiosInstance from '../utils/axiosInstance';

function SideBar() {
    const userData = useSelector((state) => state.userData?.currentUserData?.data)

    const mode = useSelector((state) => state.mode.mode)

    const dispatch = useDispatch()

    const handleMode = () => {
        if (mode === "light") {
            dispatch(setMode("dark"))
        } else if (mode === "dark") {
            dispatch(setMode("light"))
        }
    }

    if (mode == "dark") {
        document.body.style.backgroundColor = "#0D1117"
        document.body.style.color = "#fff"
    }
    if (mode == "light") {
        document.body.style.backgroundColor = "#fff"
        document.body.style.color = "#000"
    }

    const handleLogout = async () => {
        if (userData.isLoggedIn == "false") {
            toast.error("You are already logged out !")
        }
        try {
            console.log("Logging out user...");
            const res = await axiosInstance.post('/api/v1/users/logout', {
                withCredentials: true
            });
            console.log('User logged out:', res.data);
        } catch (error) {
            console.error('Logout error:', error.response?.data || error.message);
        }
    };

    return (
        <div className={`w-[20vw] h-[100vh] fixed top-0 left-0 z-[40] hidden xl:flex 
        ${mode == 'light' ? 'bg-[#fdf7f4]' : 'bg-[#000] text-[#d3d3d3]'}`}>
            <nav className='w-[100%]'>
                <ul className='flex flex-col gap-3 text-[20px] w-[100%] py-15 px-5'>
                    {
                        userData &&
                        <li className=''>
                            <NavLink to="/profile" className="flex items-center gap-2 pb-4 pt-2">
                                <img src={userData.profilePicture ? userData.profilePicture : "/defaultpfp.png"} alt=""
                                    className='h-15 w-15 rounded-full' />
                                <div className='flex flex-col '>
                                    <p className='text-[19px] font-semibold'>{userData.name ? userData.name : "User"}</p>
                                    <p className='text-[16px]'>{userData.userName ? userData.userName : "User@123"}</p>
                                </div>
                            </NavLink>
                            <hr className='text-[#535353] ' />
                        </li>
                    }
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `flex gap-3 items-center cursor-pointer rounded-[8px]
                             ${isActive ? (mode === 'light' ? 'bg-[#fcd4bc]' : 'bg-[#1f1f1f]') : ''} 
                             ${mode === 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`
                        }
                    >
                        <li className="flex gap-2 items-center pl-5 cursor-pointer">
                            <i className="fa-solid fa-house"></i>
                            <p>Home</p>
                        </li>
                    </NavLink>
                    <NavLink to="/profile"
                        className={({ isActive }) =>
                            `flex gap-3 items-center cursor-pointer rounded-[8px]
                             ${isActive ? (mode === 'light' ? 'bg-[#fcd4bc]' : 'bg-[#1f1f1f]') : ''} 
                             ${mode === 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`
                        }
                    >
                        <li className={`flex gap-2 items-center pl-5  cursor-pointer `}>
                            <i className="fa-solid fa-user"></i>
                            <p>Profile</p>
                        </li>
                    </NavLink>
                    <NavLink to="/createpost"
                        className={({ isActive }) =>
                            `flex gap-3 items-center cursor-pointer rounded-[8px]
                             ${isActive ? (mode === 'light' ? 'bg-[#fcd4bc]' : 'bg-[#1f1f1f]') : ''} 
                             ${mode === 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`
                        }
                    >
                        <li className={`flex gap-2 items-center pl-5  cursor-pointer `}>
                            <i className="fa-solid fa-square-plus"></i>
                            <p>New Post</p>
                        </li>
                    </NavLink>
                    <NavLink to="/allusers" className={({ isActive }) =>
                        `flex gap-3 items-center cursor-pointer rounded-[8px]
                             ${isActive ? (mode === 'light' ? 'bg-[#fcd4bc]' : 'bg-[#1f1f1f]') : ''} 
                             ${mode === 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`
                    }
                    >
                        <li className={`flex gap-2 items-center pl-5  cursor-pointer `}>
                            <i className="fa-solid fa-users"></i>
                            <p>All users</p>
                        </li>
                    </NavLink>
                    <NavLink to="/updateprofile"
                        className={({ isActive }) =>
                            `flex gap-3 items-center cursor-pointer rounded-[8px]
                             ${isActive ? (mode === 'light' ? 'bg-[#fcd4bc]' : 'bg-[#1f1f1f]') : ''} 
                             ${mode === 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`
                        }
                    >
                        <li className={`flex gap-2 items-center pl-5  cursor-pointer `}>
                            <i className="fa-solid fa-user-pen"></i>
                            <p>Edit profile</p>
                        </li>
                    </NavLink>
                    <NavLink to="/chatlist"
                        className={({ isActive }) =>
                            `flex gap-3 items-center cursor-pointer rounded-[8px]
                             ${isActive ? (mode === 'light' ? 'bg-[#fcd4bc]' : 'bg-[#1f1f1f]') : ''} 
                             ${mode === 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`
                        }
                    >
                        <li className={`flex gap-2 items-center pl-5  cursor-pointer `}>
                            <i className="fa-solid fa-paper-plane"></i>
                            <p>Chats</p>
                        </li>
                    </NavLink>
                    <li className="pl-2">
                        <details
                            className={`group rounded-[8px] overflow-hidden ${mode === 'light' ? 'bg-[#FFF2EB]' : 'bg-[#000] text-[#d3d3d3]'
                                }`}>
                            <summary
                                className={`flex items-center justify-between cursor-pointer py-2 px-3 text-[20px] font-medium
                                            ${mode === 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}
                                            transition duration-200 rounded-[8px]`}>
                                <span className="flex gap-2 items-center">
                                    <i className="fa-solid fa-gear"></i>
                                    <p>Account Settings</p>
                                </span>
                                <i className="fa-solid fa-chevron-down group-open:rotate-180 transition duration-300"></i>
                            </summary>

                            <ul className="pl-8 py-2 flex flex-col gap-2 text-[17px]">
                                <li>
                                    <NavLink
                                        to="/signup"
                                        className={({ isActive }) =>
                                            `block px-2 py-1 rounded ${isActive
                                                ? mode === 'light'
                                                    ? 'bg-[#fcd4bc]'
                                                    : 'bg-[#1f1f1f]'
                                                : ''
                                            } ${mode === 'light'
                                                ? 'hover:bg-[#f8c5a8]'
                                                : 'hover:bg-[#373737]'
                                            }`
                                        }
                                    >
                                        Create Account
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/signin"
                                        className={({ isActive }) =>
                                            `block px-2 py-1 rounded ${isActive
                                                ? mode === 'light'
                                                    ? 'bg-[#fcd4bc]'
                                                    : 'bg-[#1f1f1f]'
                                                : ''
                                            } ${mode === 'light'
                                                ? 'hover:bg-[#f8c5a8]'
                                                : 'hover:bg-[#373737]'
                                            }`
                                        }
                                    >
                                        Log In
                                    </NavLink>
                                </li>
                                <li
                                    onClick={handleLogout}
                                    className={`block px-2 py-1 rounded cursor-pointer ${mode === 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'
                                        }`}
                                >
                                    Log Out
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`}>
                        <input
                            type="checkbox"
                            id="react-option"
                            value=""
                            className="hidden peer"
                            required=""
                            onClick={handleMode}
                        />

                        <label
                            htmlFor="react-option"
                            className="flex z-10 items-center peer relative justify-center w-7 h-7 shadow-lg duration-300 [box-shadow:1px_1px_0px_1px_#eab92d] border-2 border-gray-800 peer-checked:border-2 peer-checked:border-gray-800 rounded-lg cursor-pointer text-neutral-50 peer-checked:[box-shadow:1px_1px_0px_1px_#075985] peer-checked:hover:[box-shadow:1px_1px_0px_1px_#1e1e1e] hover:[box-shadow:1px_1px_0px_1px_#1e1e1e]"
                        >
                        </label>

                        <svg
                            className="absolute stroke-sky-600 w-8 h-[16px] duration-300 peer-checked:opacity-100 opacity-0"
                            height="100"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 100 100"
                            width="100"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                className="svg-stroke-primary"
                                d="M82.1,61.2a31.9,31.9,0,0,1-12.4,2.4A33.3,33.3,0,0,1,36.4,30.3a31.9,31.9,0,0,1,2.4-12.4A33.3,33.3,0,1,0,82.1,61.2Z"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                            ></path>
                        </svg>

                        <svg
                            className="absolute stroke-red-500 w-7 h-[16px] duration-300 peer-checked:opacity-0 opacity-100"
                            height="100"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 100 100"
                            width="100"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                className="svg-stroke-primary"
                                d="M50,18v3.6m0,56.8V82M82,50H78.4M21.6,50H18M72.6,72.6l-2.5-2.5M29.9,29.9l-2.5-2.5m45.2,0-2.5,2.5M29.9,70.1l-2.5,2.5M64.2,50A14.2,14.2,0,1,1,50,35.8,14.3,14.3,0,0,1,64.2,50Z"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                            ></path>
                        </svg>
                        Mode
                    </li>
                </ul>
            </nav>
        </div >
    );
}

export default SideBar;
