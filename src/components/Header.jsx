import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Hamburger from './Hamburger';
import { useRef } from 'react';
import { BiLogOut } from "react-icons/bi";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../features/ToggleMode';

function Header() {


  // const hamburgerDiv = document.querySelector(".hamburgerDiv")
  const hamburgerRef = useRef()

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

  return (
    <>
      <header>
        <nav className={`w-[100vw] h-13  flex items-center fixed top-0 z-[100]
          ${mode == 'light' ? 'bg-[#FFF2EB]' : 'bg-[#000] text-[#d3d3d3]'}`}>
          <ul className='w-[100%] flex items-center justify-between px-5 mx:px-0  md:justify-evenly md:gap-7'>
            <li className='flex flex-row items-center gap-2 '>
              <NavLink to="/profile">
                <img src="/logo1.png" alt=""
                  className='h-10 w-10 rounded-full cursor-pointer' />
              </NavLink>
              <p className={`russo-one-regular text-[22px]  ${mode == 'light' ? 'text-black' : 'text-[#d3d3d3]'}`}>
                devStackr
              </p>
            </li>
            <li className='hidden md:flex flex-row items-center gap-3 '>
              <input type="text" className='bg-white border-1 w-[60vw] lg:w-[50vw] h-9 md:h-10 rounded-2xl px-3 text-l'
                placeholder='search...'
              />
              <i className="fa-solid fa-magnifying-glass text-2xl"></i>
            </li>
            <li className='text-[24px] font-bold hidden md:flex cursor-pointer' onClick={handleOpenHamburger}>
              <HiOutlineMenuAlt3 />
            </li>
            <li className='absolute top-2 right-2 lg:right-5 text-[22px] font-bold md:hidden cursor-pointer' onClick={handleOpenHamburger}>
              <HiOutlineMenuAlt3 onClick={handleOpenHamburger} className='cursor-pointer' />
            </li>
          </ul>
        </nav>
      </header>

      <div className={`hamburgerDiv fixed top-0 right-0 w-[60vw] md:w-[40vw] lg:w-[25vw] h-[100vh] z-[200] hidden text-[22px]
        ${mode == 'light' ? 'bg-[#FFF2EB]' : 'bg-[#0f0f0f] text-white'}`} ref={hamburgerRef}>
        <ul className='flex flex-col gap-15'>
          <li>
            <i className="fa-solid fa-xmark p-3 cursor-pointer hover:bg-[#FFF2EB]" onClick={handleCloseHamburger}></i>
          </li>
          <li>
            <ul className='flex flex-col gap-3 text-[20px]'>
              <li className='flex gap-2 items-center pl-5 hover:bg-[#FFF2EB] cursor-pointer'>
                <i className="fa-solid fa-user"></i>
                <p>Account setting</p>
              </li>
              <li className='flex gap-3 items-center pl-5 hover:bg-[#FFF2EB] cursor-pointer'>
                <i className="fa-solid fa-message"></i>
                <p>Messages</p>
              </li>
              <li className='flex gap-3 items-center pl-5 hover:bg-[#FFF2EB] cursor-pointer'>
                <NavLink to="/updateprofile" className="flex gap-3 items-center hover:bg-[#FFF2EB] cursor-pointer" onClick={handleCloseHamburger}>
                  <i className="fa-solid fa-user-pen"></i>
                  <p>Edit profile</p>
                </NavLink>
              </li>
              <li className='pl-5 hover:bg-[#FFF2EB] cursor-pointer'>
                <NavLink to="/signup" className="flex gap-3 items-center hover:bg-[#FFF2EB] cursor-pointer">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Create Account
                </NavLink>
              </li>
              <li className='pl-5 hover:bg-[#FFF2EB] cursor-pointer'>
                <NavLink to="/signin" className="flex gap-3 items-center hover:bg-[#FFF2EB] cursor-pointer">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  SignIn
                </NavLink>
              </li>
              <li className='flex gap-3 items-center pl-5 hover:bg-[#FFF2EB] cursor-pointer'>
                <BiLogOut className='text-[22px]' />
                Logout
              </li>
              <li className='flex gap-3 items-center pl-5 hover:bg-[#FFF2EB] cursor-pointer'>
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
    </>
  );
}

export default Header;
