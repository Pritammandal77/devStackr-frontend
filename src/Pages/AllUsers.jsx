import React from 'react';
import axios from "axios"
import { useEffect } from 'react';
import { useState } from 'react';
import FollowButton from '../components/followButton';
import Loader2 from '../components/Loaders/Loader2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function Allusers() {

    const [allUsers, setAllUsers] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getAllUsers = async () => {
        try {
            const users = await axiosInstance.get("/api/v1/users/allusers")
            console.log(users.data)
            setAllUsers(users.data.data)
        } catch (error) {
            console.log("error while fethching all users")
        }
    }

    useEffect(() => {
        getAllUsers()
    }, []);


    return (
        <>
            <div className='py-20 w-[100vw] xl:w-[80vw] absolute right-0 flex flex-col items-center gap-5'>
                {
                    allUsers.length >= 1 ? (
                        allUsers.map((data, index) => (
                            <div key={index}
                                onClick={() => {
                                    // dispatch(setOtherUserData(data));  // Store in Redux
                                    navigate(`/user/${data._id}`);     // Navigate
                                }}
                                className='w-[90%] md:w-[80%] lg:w-[55vw] xl:w-[45vw] h-25 flex items-center gap-2 border-1 border-gray-600 rounded-2xl relative px-2'>
                                <div className='h-25 flex items-center justify-center w-[25%] md:w-[20%] lg:w-[20%] xl:w-[15%]'>
                                    <img src={data.profilePicture}
                                        alt="sorry , the image can't be loaded"
                                        className='h-19 w-19 md:h-20 md:w-20 rounded-full'
                                    />
                                </div>
                                <div className='flex flex-col justify-between w-[60%] lg:w-[35%]'>
                                    <p className='text-[18px] font-semibold'>{data.name}</p>
                                    <p className='text-[16px]'>{data.userName}</p>
                                </div>
                                <div className='hidden lg:flex flex-col h-[100%] w-[35%] truncate justify-center '>
                                    <p className='text-[16px] hidden lg:inline h-10 truncate p-2 text-left' >{data.bio}</p>
                                    {/* <button className='bg-blue-400 h-8 px-2 py-1 text-[16px] rounded-[8px] font-semibold lg:w-[80%] cursor-pointer'>
                                        Follow
                                    </button> */}
                                    <FollowButton />
                                </div>
                                <div className='lg:hidden absolute top-2 right-2 bg-blue-400 h-8 w-8 flex items-center justify-center rounded-full'>
                                    <i className="fa-solid fa-user-plus text-black"></i>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Loader2 />
                    )
                }
            </div>
        </>
    );
}

export default Allusers;
