import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import axiosInstance from '../utils/axiosInstance';
import { setMode } from '../features/ToggleMode';

import { 
  Home, 
  User, 
  PlusSquare, 
  Users, 
  UserCog, 
  Send, 
  Settings, 
  ChevronDown, 
  Sun, 
  Moon, 
  LogOut,
  UserPlus,
  LogIn,
  SearchCheckIcon
} from 'lucide-react';

function SideBar() {
    const userData = useSelector((state) => state.userData?.currentUserData?.data);
    const mode = useSelector((state) => state.mode.mode);
    const dispatch = useDispatch();

    const handleMode = () => {
        if (mode === "light") {
            dispatch(setMode("dark"));
        } else if (mode === "dark") {
            dispatch(setMode("light"));
        }
    };

    // Apply strict professional background/foreground styles to the document body matching our color spaces
    if (mode === "dark") {
        document.body.style.backgroundColor = "#0B0F17";
        document.body.style.color = "#F1F5F9";
    } else if (mode === "light") {
        document.body.style.backgroundColor = "#F8FAFC";
        document.body.style.color = "#0F172A";
    }

    const handleLogout = async () => {
        if (userData?.isLoggedIn === "false") {
            toast.error("You are already logged out !");
            return;
        }
        try {
            console.log("Logging out user...");
            await axiosInstance.post('/api/v1/users/logout', {
                withCredentials: true
            });
            toast.success("Logout successfully");
        } catch (error) {
            console.error('Logout error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to log out");
        }
    };

    const isLight = mode === 'light';
    
    // Dynamic background and text classes for the premium theme
    const sidebarClasses = isLight 
        ? 'bg-[#F8FAFC]/90 border-r border-slate-200/80 backdrop-blur-md text-[#0F172A]' 
        : 'bg-[#0B0F17]/95 border-r border-slate-800/80 backdrop-blur-md text-[#F1F5F9]';

    const textPrimary = isLight ? 'text-slate-800' : 'text-slate-200';
    const textMuted = isLight ? 'text-slate-500' : 'text-slate-400';
    const dividerColor = isLight ? 'border-slate-200/80' : 'border-slate-800/60';

    const getLinkClass = ({ isActive }) => {
        const baseClass = "group flex items-center gap-3.5 px-4.5 py-3 rounded-xl font-medium text-[15px] transition-all duration-200 ease-in-out cursor-pointer w-full";
        if (isActive) {
            return `${baseClass} ${
                isLight 
                    ? 'bg-[#E0E7FF] text-[#4F46E5] shadow-sm font-semibold' 
                    : 'bg-[#1E293B] text-[#6366F1] shadow-sm font-semibold border-l-2 border-[#6366F1]'
            }`;
        }
        return `${baseClass} ${
            isLight 
                ? 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900' 
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100'
        }`;
    };

    return (
        <div className={`w-[20vw] pt-18 h-[100vh] fixed top-0 left-0 z-[40] hidden xl:flex flex-col justify-between py-6 px-4 shadow-sm transition-colors duration-300 ${sidebarClasses}`}>
            <nav className="w-full flex flex-col justify-between h-full">
                
                {/* Upper Navigation Elements */}
                <div className="flex flex-col gap-5 w-full">
                    
                    {/* User Profile Header Segment */}
                    {userData && (
                        <div className="flex flex-col gap-4">
                            <NavLink 
                                to="/profile" 
                                className="flex items-center gap-3 p-1.5 rounded-xl transition-all duration-200 hover:bg-slate-200/30 dark:hover:bg-slate-800/40"
                            >
                                <div className="relative shrink-0">
                                    <img 
                                        src={userData.profilePicture ? userData.profilePicture : "/defaultpfp.png"} 
                                        alt="Avatar"
                                        className="h-12 w-12 rounded-full object-cover ring-2 ring-[#6366F1]/30" 
                                        onError={(e) => { e.target.src = "/defaultpfp.png"; }}
                                    />
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0B0F17]" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <p className={`text-[15px] font-bold truncate ${textPrimary}`}>
                                        {userData.name ? userData.name : "User"}
                                    </p>
                                    <p className={`text-[13px] font-medium truncate ${textMuted}`}>
                                        @{userData.userName ? userData.userName : "User@123"}
                                    </p>
                                </div>
                            </NavLink>
                            <hr className={`border-t ${dividerColor}`} />
                        </div>
                    )}

                    {/* Navigation Items */}
                    <ul className="flex flex-col gap-1 w-full">
                        <li>
                            <NavLink to="/home" className={getLinkClass}>
                                <Home className="h-5 w-5 shrink-0" />
                                <span>Home</span>
                            </NavLink>
                        </li>

                        {userData && (
                            <>
                                <li>
                                    <NavLink to="/profile" className={getLinkClass}>
                                        <User className="h-5 w-5 shrink-0" />
                                        <span>Profile</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/createpost" className={getLinkClass}>
                                        <PlusSquare className="h-5 w-5 shrink-0" />
                                        <span>New Post</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/allusers" className={getLinkClass}>
                                        <Users className="h-5 w-5 shrink-0" />
                                        <span>All Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/updateprofile" className={getLinkClass}>
                                        <UserCog className="h-5 w-5 shrink-0" />
                                        <span>Edit Profile</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/chatlist" className={getLinkClass}>
                                        <Send className="h-5 w-5 shrink-0 -rotate-12" />
                                        <span>Chats</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/search" className={getLinkClass}>
                                        <SearchCheckIcon className="h-5 w-5 shrink-0 -rotate-12" />
                                        <span>Explore</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {}
                {/* Lower Action & Config Utilities */}
                <div className="flex flex-col gap-2 w-full pt-4 border-t border-slate-200/80 dark:border-slate-800/60">
                    <ul className="flex flex-col gap-1 w-full">
                        <li>
                            <details className="group rounded-xl overflow-hidden w-full transition-all duration-300">
                                <summary className={`flex items-center justify-between cursor-pointer py-3 px-4.5 text-[15px] font-medium rounded-xl transition duration-200 ${
                                    isLight 
                                        ? 'bg-[#FFF2EB] text-slate-700 hover:bg-[#f8c5a8]/60' 
                                        : 'bg-slate-900/60 text-[#d3d3d3] hover:bg-slate-800/80'
                                }`}>
                                    <span className="flex gap-3.5 items-center">
                                        <Settings className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400 group-hover:text-indigo-500" />
                                        <span>Account Settings</span>
                                    </span>
                                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-180 text-slate-500" />
                                </summary>

                                <ul className="pl-9 pr-2 py-2 flex flex-col gap-1.5 text-[14px]">
                                    {!userData && (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/signup"
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                                                            isActive
                                                                ? isLight ? 'bg-[#fcd4bc] text-slate-950 font-medium' : 'bg-[#1E293B] text-slate-100 font-medium'
                                                                : isLight ? 'text-slate-600 hover:bg-[#f8c5a8]/40' : 'text-slate-400 hover:bg-slate-800/40'
                                                        }`
                                                    }
                                                >
                                                    <UserPlus className="h-4 w-4" />
                                                    <span>Create Account</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/signin"
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                                                            isActive
                                                                ? isLight ? 'bg-[#fcd4bc] text-slate-950 font-medium' : 'bg-[#1E293B] text-slate-100 font-medium'
                                                                : isLight ? 'text-slate-600 hover:bg-[#f8c5a8]/40' : 'text-slate-400 hover:bg-slate-800/40'
                                                        }`
                                                    }
                                                >
                                                    <LogIn className="h-4 w-4" />
                                                    <span>Log In</span>
                                                </NavLink>
                                            </li>
                                        </>
                                    )}
                                    {userData && (
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                                    isLight 
                                                        ? 'text-rose-600 hover:bg-rose-50' 
                                                        : 'text-rose-400 hover:bg-rose-950/30'
                                                }`}
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Log Out</span>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </details>
                        </li>

                        {/* Theme Dark/Light Toggler Button */}
                        <li>
                            <button 
                                className={`flex gap-3.5 items-center w-full px-4.5 py-3 rounded-xl cursor-pointer text-[15px] font-medium transition duration-200 ${
                                    isLight 
                                        ? 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-950' 
                                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100'
                                }`}
                                onClick={handleMode}
                            >
                                {isLight ? (
                                    <>
                                        <Sun className="h-5 w-5 shrink-0 text-amber-500 animate-pulse" />
                                        <span>Light Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="h-5 w-5 shrink-0 text-indigo-400" />
                                        <span>Dark Mode</span>
                                    </>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default SideBar;