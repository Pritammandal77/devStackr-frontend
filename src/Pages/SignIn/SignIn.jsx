import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../features/UserProfileData';

function SignIn() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // console.log(email)

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post(
                "/api/v1/users/login", // Change URL accordingly
                {
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true // only if you're using cookies for auth
                }
            );

            console.log("Login successful:", response.data);

            if (response.data.statusCode == 200) {
                navigate('/home')
            }

        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault()
        loginUser(email, password)
    }

    return (
        <>
            <div className='bg-gray-200 w-full min-h-[100vh] flex flex-col items-center justify-center '>

                <div className='xl:bg-white xl:border-1 flex flex-row rounded-3xl w-[100vw] md:w-[70vw] lg:w-[60vw] xl:h-[65vh]' >
                    <div className='bg-gray-900 w-[50%] rounded-l-3xl p-10 text-white hidden xl:flex flex-col items-center justify-evenly' >
                        <div>
                            <h1 className='text-4xl text-center'>Welcome again at <span className='russo-one-regular text-red-400 text-5xl'>devstackr</span></h1>
                            {/* <p className='text-xl'>Where ‘Hello World’ becomes ‘Hello, friend!’</p> */}
                            {/* <p className='text-2xl'>Start your journey with those <br /> who code and care</p> */}
                        </div>
                        <img src="/loginFormImg.svg" alt="" className='h-50' />
                    </div>
                    <div className='flex flex-col items-center gap-5 w-[100%] xl:w-[50%] p-0  h-[100vh] xl:h-[65vh] bg-gray-900 xl:rounded-3xl'>
                        <div className='w-full h-[20vh] flex flex-col justify-center px-10 xl:hidden'>
                            <h1 className='text-5xl russo-one-regular text-red-400'>devstackr</h1>
                            <p className='text-3xl text-white'>Where ‘Hello World’ <br /> becomes ‘Hello friend’</p>
                            {/* <p className='text-2xl'>Start your journey with those <br /> who code and care</p> */}
                        </div>
                        <div className='w-[100vw] xl:w-[100%] h-[80vh] pt-10 xl:pt-0 flex flex-col items-center justify-center px-8 rounded-t-3xl bg-white xl:rounded-r-3xl'>
                            <h1 className='text-4xl text-center '>Login </h1>
                            <form action="" className='flex flex-col gap-5 w-[100%] md:w-[60%] xl:w-[90%]'>
                                <div className='flex flex-col'>
                                    <label htmlFor="">Email</label>
                                    <input type="text"
                                        placeholder='Enter your email'
                                        className='bg-gray-300  p-2 rounded-xl'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="">Password</label>
                                    <input type="text"
                                        placeholder='Enter your password'
                                        className='bg-gray-300  p-2 rounded-xl'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button className='bg-red-400 p-2 text-l font-bold rounded-2xl cursor-pointer'
                                    onClick={handleLogin}>
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SignIn;
