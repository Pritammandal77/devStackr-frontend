import React, { useState } from 'react';
import { NavLink, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Hamburger from './Hamburger';
import { useRef } from 'react';
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../features/ToggleMode';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'sonner';
import Loader2 from './Loaders/Loader2';

function Header() {

  const hamburgerRef = useRef()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState("")
  const [searchInput, setSearchInput] = useState(null)

  console.log(searchInput)

  const handleOpenHamburger = () => {
    console.log("Hello")
    // hamburgerDiv.style.display = "inline"
    hamburgerRef.current.style.display = "inline"; // Step 2
  }

  const handleCloseHamburger = () => {
    // hamburgerDiv.style.display = "none"
    hamburgerRef.current.style.display = "none"; // Step 3
  }

  const mode = useSelector((state) => state.mode.mode)
  console.log(mode)

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
      console.log('User logged out:', res.data);
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
  };

  return (
    <>
      <header>
        <nav className={`w-[100vw] h-13  flex items-center fixed top-0 z-[50] xl:w-[100vw] right-0
          ${mode == 'light' ? 'bg-[#f9ded1]' : 'bg-[#000] text-[#d3d3d3]'}`}>
          <ul className='w-[100%] flex items-center justify-between px-5 mx:px-0  md:justify-evenly md:gap-7'>
            <li className='flex flex-row items-center gap-2 '>
              <NavLink to="/home">
                {/* <img src="/logo1.png" alt=""
                  className='h-10 w-10 rounded-full cursor-pointer' /> */}
                <p className={`russo-one-regular text-[22px]  ${mode == 'light' ? 'text-black' : 'text-[#d3d3d3]'}`}>
                  devStackr
                </p>
              </NavLink>
            </li>
            <li className='hidden md:flex flex-row items-center gap-3 '>
              <input type="text" className={` w-[60vw] lg:w-[50vw] h-9 md:h-10 rounded-2xl px-3 text-l ${mode == 'light' ? 'bg-white text-black border-1 border-gray-600' : 'bg-[#2e2e2e] text-white'}`}
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
              <i className="fa-solid fa-paper-plane"></i>
            </li>
          </ul>
        </nav>
      </header>

      <div className={`hamburgerDiv fixed top-0 right-0 w-[60vw] md:w-[40vw] lg:w-[25vw] h-[100vh] z-[200] hidden text-[22px]
        ${mode == 'light' ? 'bg-[#FFF2EB]' : 'bg-[#0f0f0f] text-white'}`} ref={hamburgerRef}>
        <ul className='flex flex-col gap-15'>
          <li>
            <i className={`fa-solid fa-xmark p-3 cursor-pointerFF2EB] ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`} onClick={handleCloseHamburger}></i>
          </li>
          <li>
            <ul className='flex flex-col gap-3 text-[20px]'>
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`}>
                <i className="fa-solid fa-user"></i>
                <p>Account setting</p>
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
              <li className={`flex gap-2 items-center pl-5  cursor-pointer  ${mode == 'light' ? 'hover:bg-[#f8c5a8]' : 'hover:bg-[#373737]'}`}>
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
