import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowingsList } from '../utils/FollowUnFollowUser';
import { useEffect } from 'react';
import UserCard from '../components/UserCard';
import Loader2 from '../components/Loaders/Loader2';

function FollowingsList() {

    const { id } = useParams();

    const [followingsList, setFollowingsList] = useState()

    const handleFetchFollowingList = async (id) => {
        let followings = await getFollowingsList(id)
        setFollowingsList(followings)
    }

    useEffect(() => {
        handleFetchFollowingList(id)
    }, []);

    if (followingsList) {
        console.log("followings at followers page", followingsList.length)
    }

    return (
        <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center'>
            {
                followingsList?.length > 0 &&
                <h1 className='self-start p-4 text-xl font-semibold'>Followings</h1>
            }
            <div className='flex flex-col items-center justify-center gap-3'>
                {
                    followingsList?.length > 0 ?
                        followingsList.map((data, index) => (
                            <UserCard
                                id={data.following._id}    //this are the id's , of the followers
                                key={index}
                                profilePicture={data.following.profilePicture}
                                name={data.following.name}
                                userName={data.following.userName}
                                bio={data.following.bio}
                                isFollowBtnVisible={false}
                            />
                        )) :
                        followingsList?.length == 0 ?
                            (
                                <div className='h-[90vh] w-[100vw] flex items-center justify-center'>
                                    <h1 className='text-2xl font-semibold'>No Following</h1>
                                </div>
                            ) :
                            (
                                <Loader2 />
                            )
                }
            </div>

        </div>
    );
}

export default FollowingsList;
