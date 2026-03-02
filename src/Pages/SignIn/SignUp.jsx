import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setCurrentUserData, setIsLoggedIn } from '../../features/UserProfileData';
import { toast } from 'sonner';
import axiosInstance from '../../utils/axiosInstance';
import Loader2 from '../../components/Loaders/Loader2';

function SignUp() {
    const mode = useSelector((state) => state.mode.mode)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState("")

    const registerUser = async (e, name, userName, email, password) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            console.log("creating user")
            const user = await axiosInstance.post("/api/v1/users/register",
                {
                    name,
                    userName,
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )

            console.log("Login successful:", user.data.data);

            if (user.data.statusCode == 200) {
                dispatch(setCurrentUserData(user.data.data))
                dispatch(setIsLoggedIn("true"))
                toast.success('created account successfull!');
                navigate('/home')
            }

        } catch (error) {
            console.error("Creating account failed:", error.response?.data || error.message);

            //this is 3 lines are used, to get the actual text content from the error msg
            const html = error.response.data;
            const match = html.match(/Error:(.*?)<br>/i);
            const message = match ? match[1].trim() : "Something went wrong";

            if (error.response.data) {
                toast.error(message);
            } else {
                toast.error('something went wrong');
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className='text-black w-full min-h-[100vh] flex flex-col items-center justify-center '>

                <div className={`flex flex-row rounded-3xl w-[100vw] md:w-[100vw] lg:w-[70vw] xl:h-[75vh]
                       ${mode == 'light' ? 'bg-gray-200 shadow-xl' : 'bg-[#0c0c0c] text-white'}`} >
                    <div className={`w-[50%] rounded-l-3xl p-10 text-white hidden xl:flex flex-col items-center justify-center gap-10
                           ${mode == 'light' ? 'bg-gray-900' : 'bg-[#040404]'}`}>
                        <div>
                            <h1 className='text-4xl'>Welcome to <span className='russo-one-regular text-red-400'>devstackr</span></h1>
                            <p className='text-2xl'>Where ‘hello world’ <br /> becomes ‘hello, friend!</p>
                        </div>
                        <img src="/signupFormImg.svg" alt="" className='h-70' />
                    </div>
                    <div className={`flex flex-col lg:bg-transparent items-center gap-5 w-[100%] xl:w-[50%] p-0  h-[100vh] xl:h-[75vh] xl:rounded-3xl
                        ${mode == 'light' ? 'bg-gray-900' : 'bg-[#040404]'}  `}>
                        <div className='w-full h-[20vh] flex flex-col justify-center px-10 xl:hidden'>
                            <h1 className='text-5xl russo-one-regular text-red-400'>devstackr</h1>
                            <p className='text-3xl text-white'>Where ‘Hello World’ <br /> becomes ‘Hello friend’</p>
                        </div>
                        <div className={`w-[100vw] xl:w-[100%] h-[80vh] lg:bg-transparent pt-10 xl:pt-0 flex flex-col items-center justify-center px-8 rounded-t-3xl xl:rounded-r-3xl
                           ${mode == 'light' ? 'bg-white' : 'bg-[#0f0f0f]'}  `}>
                            <h1 className='text-4xl text-center '>Create Account </h1>
                            <form action="" className='flex flex-col gap-5 w-[100%] md:w-[60%] xl:w-[90%]' onSubmit={(e) => registerUser(e, name, userName, email, password)}>
                                <div className='flex flex-col'>
                                    <label htmlFor="">Name</label>
                                    <input type="text"
                                        placeholder='Enter your name'
                                        className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="">UserName</label>
                                    <input type="text"
                                        placeholder='Enter username'
                                        className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
                                        required
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="">Email</label>
                                    <input type="text"
                                        placeholder='Enter your email'
                                        className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="">Password</label>
                                    <input type="text"
                                        placeholder='Enter your password'
                                        className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button className='bg-red-400 text-black p-2 text-l font-bold rounded-2xl cursor-pointer'>
                                    Create account
                                </button>
                                <div className='text-[16px] text-center'>
                                    <p>Already have an account?
                                        <NavLink to="/signin" className="text-blue-500"> sign in</NavLink>
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

export default SignUp;
