import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader2 from '../components/Loaders/Loader2';
import axiosInstance from '../utils/axiosInstance';
import UserCard from '../components/UserCard';

function Allusers() {

    const [allUsers, setAllUsers] = useState([])

    const getAllUsers = async () => {
        try {
            const users = await axiosInstance.get("/api/v1/users/allusers")
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
            <div className='py-20 w-[100vw] xl:w-[80vw] absolute right-0 flex flex-col items-center justify-center gap-5'>
                <h1 className='w-[90%] md:w-[80%] lg:w-[50vw] xl:w-[45vw] text-xl font-semibold'>All users</h1>
                {
                    allUsers?.length >= 1 ? (
                        allUsers.map((data, index) => (
                            <UserCard
                                key={index}
                                id={data._id}
                                profilePicture={data.profilePicture}
                                name={data.name}
                                userName={data.userName}
                                bio={data.bio}
                                isFollowBtnVisible={false} />
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
