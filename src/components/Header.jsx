import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../features/ToggleMode';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'sonner';
import Loader2 from './Loaders/Loader2';

function Header() {

  const hamburgerRef = useRef()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  const handleOpenHamburger = () => {
    hamburgerRef.current.style.display = "inline"; 
  }

  const handleCloseHamburger = () => {
    hamburgerRef.current.style.display = "none"; 
  }

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
    setIsLoading(true)
    try {
      console.log("Logging out user...");
      const res = await axiosInstance.post('/api/v1/users/logout', {
        withCredentials: true
      });
      if (res.data.statusCode == 200) {
        toast("Logged out successfully")
        location.reload();   //this will refresh the automatically website
      }
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
    } finally {
      setIsLoading(false)
    }
  };

  //it will redirect to search page ,with the searchInput url i.e => /search?query=searchInput
  const handleSearchUser = (searchInput) => {
    navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    setSearchInput("")
  };

  return (
    <>
      <header>
        <nav className={`w-[100vw] h-13  flex items-center fixed top-0 z-[50] xl:w-[100vw] right-0
          ${mode == 'light' ? 'bg-[#fdf7f4]' : 'bg-[#000] text-[#d3d3d3]'}`}>
          <ul className='w-[100%] flex items-center justify-between px-5 mx:px-0  md:justify-evenly md:gap-7'>
            <li className=''>
              <NavLink to="/home" className="flex flex-row items-center gap-2 ">
                {/* <img src="/logo1.png" alt=""
                  className='h-10 w-10 rounded-full cursor-pointer' /> */}
                <p className={`russo-one-regular text-[22px]  ${mode == 'light' ? 'text-black' : 'text-[#d3d3d3]'}`}>
                  devStackr
                </p>
              </NavLink>
            </li>
            <li className='hidden md:flex flex-row items-center gap-3 '>
              <input type="text" className={` w-[60vw] lg:w-[50vw] h-9 md:h-10 rounded-2xl px-3 text-l ${mode == 'light' ? 'bg-white text-black border-1 border-gray-600' : 'bg-[#1b1b1b] text-white'}`}
                placeholder='Enter name or username of a user...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass cursor-pointer text-2xl hover:text-blue-500" onClick={() => handleSearchUser(searchInput)}></i>
            </li>
            <li className='text-[24px] font-bold hidden md:flex xl:hidden cursor-pointer' onClick={handleOpenHamburger}>
              <HiOutlineMenuAlt3 />
            </li>
            <li className='absolute top-2 right-2 lg:right-5 text-[22px] font-bold md:hidden cursor-pointer' onClick={handleOpenHamburger}>
              <HiOutlineMenuAlt3 onClick={handleOpenHamburger} className='cursor-pointer' />
            </li>
            <li className='cursor-pointer hidden xl:flex text-[18px]'>
              <NavLink to="/chatlist">
                <i className="fa-solid fa-paper-plane"></i>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <div className={`hamburgerDiv fixed top-0 right-0 w-[60vw] md:w-[40vw] lg:w-[25vw] h-[100vh] z-[100] hidden text-[22px]
        ${mode == 'light' ? 'bg-[#FFF2EB]' : 'bg-[#0f0f0f] text-white'}`} ref={hamburgerRef}>
        <ul className='flex flex-col gap-15'>
          <li>
            <i className={`fa-solid fa-xmark p-3 cursor-pointerFF2EB] ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`} onClick={handleCloseHamburger}></i>
          </li>
          <li>
            <ul className='flex flex-col gap-3 text-[20px]'>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`}>
                <NavLink to='home' className="flex gap-3 items-center cursor-pointer" onClick={handleCloseHamburger}>
                  <i className="fa-solid fa-house"></i>
                  <p>Home</p>
                </NavLink>
              </li>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[rgb(248,197,168)]' : 'hover:bg-[#373737]'}`}>
                <NavLink to="/chatlist" className="flex gap-3 items-center cursor-pointer" onClick={handleCloseHamburger}>
                  <i className="fa-solid fa-message"></i>
                  <p>Chats</p>
                </NavLink>
              </li>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`}>
                <NavLink to="/allusers" className="flex gap-3 items-center cursor-pointer" onClick={handleCloseHamburger}>
                  <i className="fa-solid fa-users"></i>
                  <p>All users</p>
                </NavLink>
              </li>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[rgb(248,197,168)]' : 'hover:bg-[#373737]'}`}>
                <NavLink to="/updateprofile" className="flex gap-3 items-center cursor-pointer" onClick={handleCloseHamburger}>
                  <i className="fa-solid fa-user-pen"></i>
                  <p>Edit profile</p>
                </NavLink>
              </li>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[rgb(248,197,168)]' : 'hover:bg-[#373737]'}`}>
                <NavLink to="/createpost" className="flex gap-3 items-center cursor-pointer" onClick={handleCloseHamburger}>
                  <i className="fa-solid fa-plus"></i>
                  <p>Create post</p>
                </NavLink>
              </li>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[rgb(248,197,168)]' : 'hover:bg-[#373737]'}`}>
                <NavLink to="/search" className="flex gap-3 items-center cursor-pointer" onClick={handleCloseHamburger}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <p>Search User</p>
                </NavLink>
              </li>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`}
                onClick={handleMode}>
                {
                  mode == "dark" ?
                    <i className="fa-solid fa-moon"></i> :
                    <i className="fa-solid fa-sun"></i>
                }
                Mode
              </li>
              <li className="pl-2">
                <details
                  className={`group rounded-[8px] overflow-hidden ${mode === 'light' ? 'bg-[#FFF2EB]' : ' text-[#d3d3d3]'
                    }`}>
                  <summary
                    className={`flex items-center justify-between cursor-pointer px-3 text-[20px] font-medium
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

            </ul>
          </li>
        </ul>
      </div>

      {
        isLoading && <Loader2 />
      }

    </>
  );
}

export default Header;













{/* <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`}>
                <NavLink to="/signup" className="flex gap-3 items-center cursor-pointer">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Create Account
                </NavLink>
              </li>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`}>
                <NavLink to="/signin" className="flex gap-3 items-center  cursor-pointer">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  SignIn
                </NavLink>
              </li>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`}
                onClick={handleLogout}>
                <BiLogOut className='text-[22px]' />
                Logout
              </li> */}