import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function BottomMenu() {
    const mode = useSelector((state) => state.mode.mode);
    const currentUserData = useSelector((state) => state.userData?.currentUserData?.data);
    const isLight = mode === 'light';

    // Premium theme-aligned navigation styles
    const menuClasses = isLight 
        ? 'bg-[#F8FAFC]/90 text-slate-600 border-t border-slate-200/80 shadow-sm' 
        : 'bg-[#0B0F17]/90 text-slate-400 border-t border-slate-800/80 shadow-none';

    const getLinkClass = ({ isActive }) => {
        const baseClass = "transition-all duration-200 ease-in-out flex items-center justify-center p-2 rounded-xl text-[20px]";
        if (isActive) {
            return `${baseClass} ${
                isLight ? 'text-[#4F46E5] scale-110 font-bold' : 'text-[#6366F1] scale-110 font-bold'
            }`;
        }
        return `${baseClass} ${
            isLight ? 'hover:text-slate-900 text-slate-500' : 'hover:text-slate-100 text-slate-400'
        }`;
    };

    return (
        <nav className={`w-[100vw] fixed bottom-0 h-16 flex items-center justify-center z-[300] xl:hidden backdrop-blur-lg transition-colors duration-300 ${menuClasses}`}>
            <ul className='w-full max-w-[500px] flex flex-row items-center justify-between px-6'>
                
                {/* Home */}
                <li>
                    <NavLink to="/home" className={getLinkClass}>
                        <i className="fa-solid fa-house"></i>
                    </NavLink>
                </li>

                {/* Search */}
                <li>
                    <NavLink to="/search" className={getLinkClass}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </NavLink>
                </li>

                {/* Create Action Button (Centered Pill) */}
                <li>
                    <NavLink 
                        to="/createpost"
                        className={({ isActive }) => `h-9 w-9 rounded-xl flex items-center justify-center shadow-sm text-[18px] transition-all duration-200 active:scale-95 ${
                            isActive
                                ? 'bg-[#4F46E5] text-white' 
                                : isLight 
                                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                                    : 'bg-slate-400 text-slate-950 hover:bg-white'
                        }`}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </NavLink>
                </li>

                {/* Chats */}
                <li>
                    <NavLink to="/chatlist" className={getLinkClass}>
                        <i className="fa-solid fa-message"></i>
                    </NavLink>
                </li>

                {/* Profile Avatar Container */}
                <li className='flex items-center justify-center'>
                    <NavLink 
                        to="/profile"
                        className={({ isActive }) => `rounded-full p-0.5 transition-all duration-200 ${
                            isActive 
                                ? isLight ? 'ring-2 ring-[#4F46E5]' : 'ring-2 ring-[#6366F1]' 
                                : 'ring-1 ring-transparent'
                        }`}
                    >
                        <img 
                            src={currentUserData?.profilePicture ? currentUserData.profilePicture : "/defaultpfp.png"} 
                            alt="Avatar"
                            className={`h-8 w-8 rounded-full object-cover transition-all ${
                                isLight ? 'border border-white shadow-sm' : 'border border-[#0B0F17]'
                            }`} 
                            onError={(e) => { e.target.src = "/defaultpfp.png"; }}
                        />
                    </NavLink>
                </li>

            </ul>
        </nav>
    );
}

export default BottomMenu;