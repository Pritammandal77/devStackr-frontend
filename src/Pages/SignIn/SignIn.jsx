import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axiosInstance from '../../utils/axiosInstance';
import Loader2 from '../../components/Loaders/Loader2';
import { useSelector } from 'react-redux';

function SignIn() {

    const mode = useSelector((state) => state.mode.mode)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)


    const loginUser = async (email, password) => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.post(
                "/api/v1/users/login",
                {
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            // console.log("Login successful:", response.data);

            if (response.data.success) {
                toast.success('login successfull!');
                window.location.reload();
                navigate("/");
            }

        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);

            //this is 3 lines are used, to get the actual text content from the error msg
            const html = error.response.data;
            const match = html.match(/Error:(.*?)<br>/i);
            const message = match ? match[1].trim() : "Something went wrong";

            if (error.message) {
                toast.error(message);
            } else {
                toast.error('something went wrong');
            }

        } finally {
            setIsLoading(false)
        }
    };

    const handleLogin = (e) => {
        e.preventDefault()
        loginUser(email, password)
    }

    const loginWithGuestAccount = () => {
        try {
            let email = import.meta.env.VITE_GUEST_ACCOUNT_EMAIL;
            let password = import.meta.env.VITE_GUEST_ACCOUNT_PASSWORD;
            loginUser(email, password)
        } catch (error) {
            toast.error("login failed via guest account")
        }
    }

    return (
        <>
            <div className='w-full text-black min-h-[100vh] flex flex-col items-center justify-center '>

                <div className={` flex flex-row rounded-3xl w-[100vw] md:w-[100vw] lg:w-[60vw] xl:h-[65vh]
                    ${mode == 'light' ? 'bg-gray-200 shadow-xl' : 'bg-[#0f0f0f] text-white'}`} >
                    <div className={` w-[50%] rounded-l-3xl p-10 text-white hidden xl:flex flex-col items-center justify-evenly  
                          ${mode == 'light' ? 'bg-gray-900' : 'bg-[#040404]'}`} >
                        <div>
                            <h1 className='text-4xl text-center'>Welcome again at <span className='russo-one-regular text-red-400 text-5xl'>devstackr</span></h1>
                            {/* <p className='text-xl'>Where ‘Hello World’ becomes ‘Hello, friend!’</p> */}
                        </div>
                        <img src="/loginFormImg.svg" alt="" className='h-50' />
                    </div>
                    <div className={`flex flex-col lg:bg-transparent items-center gap-5 w-[100%] xl:w-[50%] p-0  h-[100vh] xl:h-[65vh]  xl:rounded-3xl
                           ${mode == 'light' ? 'bg-gray-900' : 'bg-[#040404]'}`}>
                        <div className='w-full h-[20vh] flex flex-col justify-center px-10 xl:hidden'>
                            <h1 className='text-5xl russo-one-regular text-red-400'>devstackr</h1>
                            <p className='text-3xl text-white'>Where ‘hello world’ <br /> becomes ‘hello friend’</p>
                        </div>
                        <div className={`w-[100vw] lg:bg-transparent xl:w-[100%] h-[80vh] pt-10 xl:pt-0 flex flex-col items-center justify-center px-8 rounded-t-3xl xl:rounded-r-3xl
                              ${mode == 'light' ? 'bg-white' : 'bg-[#0f0f0f]'}
                           `}>
                            <h1 className='text-4xl text-center '>Login </h1>
                            <form action="" className='flex flex-col gap-5 w-[100%] md:w-[60%] xl:w-[90%]' onSubmit={handleLogin}>
                                <div className='flex flex-col'>
                                    <label htmlFor="">Email</label>
                                    <input type="text"
                                        placeholder='Enter your email'
                                        className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="">Password</label>
                                    <input type="text"
                                        placeholder='Enter your password'
                                        className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button className='bg-red-400 text-black p-2 text-l font-bold rounded-2xl cursor-pointer'
                                >
                                    Login
                                </button>
                                <div className='text-[16px] text-center'>
                                    <p>Do not have a account?
                                        <NavLink to="/signup" className="text-blue-500"> create account</NavLink>
                                    </p>
                                </div>
                                <div className='text-[16px] text-center ' onClick={() => loginWithGuestAccount()}>
                                    <p className=''>login with a
                                        <span className='text-blue-600'> Guest account </span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {
                isLoading && <Loader2 />
            }
        </>
    );
}

export default SignIn;
