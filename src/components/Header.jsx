import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Hamburger from './Hamburger';
import { useRef } from 'react';

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

  return (
    <>
      <header>
        <nav className='w-[100vw] h-13 bg-[#b47fd2] flex items-center fixed top-0 z-[100]'>
          <ul className='w-[100%] flex items-center justify-between px-5 mx:px-0  md:justify-evenly md:gap-7'>
            <li className='flex flex-row items-center gap-2 '>
              <NavLink to="/profile">
                <img src="/logo7.png" alt=""
                  className='h-10 w-10 rounded-full cursor-pointer' />
              </NavLink>
              <p className='russo-one-regular text-[22px] '>
                devStackr
              </p>
            </li>
            <li className='hidden md:flex flex-row items-center gap-3 '>
              <input type="text" className='bg-white w-[60vw] lg:w-[50vw] h-9 md:h-10 rounded-2xl px-3 text-l'
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

      <div className='hamburgerDiv fixed top-0 right-0 w-[60vw] md:w-[40vw] lg:w-[25vw] h-[100vh] z-[200] bg-[#ae71d1] hidden text-[22px]' ref={hamburgerRef}>
        <ul className='flex flex-col gap-15'>
          <li>
            <i className="fa-solid fa-xmark p-3 cursor-pointer hover:bg-[#b47fd2]" onClick={handleCloseHamburger}></i>
          </li>
          <li>
            <ul className='text-black flex flex-col gap-3 text-[20px]'>
              <li className='flex gap-2 items-center pl-5 hover:bg-[#b47fd2] cursor-pointer'>
                <i className="fa-solid fa-user"></i>
                <p>Account setting</p>
              </li>
              <li className='flex gap-3 items-center pl-5 hover:bg-[#b47fd2] cursor-pointer'>
                <i className="fa-solid fa-message"></i>
                <p>Messages</p>
              </li>
              <li className='flex gap-3 items-center pl-5 hover:bg-[#b47fd2] cursor-pointer'>
                <i className="fa-solid fa-user-pen"></i>
                <p>Edit profile</p>
              </li>
              <li className='flex gap-3 items-center pl-5 hover:bg-[#b47fd2] cursor-pointer'>
                <i className="fa-solid fa-message"></i>
                Messages
              </li>
              <li className='flex gap-3 items-center pl-5 hover:bg-[#b47fd2] cursor-pointer'>
                <i className="fa-solid fa-message"></i>
                Messages
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
