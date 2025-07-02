import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowersList } from '../utils/FollowUnFollowUser';
import UserCard from '../components/UserCard';
import Loader2 from '../components/Loaders/Loader2';

function FollowersList() {

    //id of the user's profile , that we are currently viewing
    const { id } = useParams();

    const [followersList, setFollowersList] = useState(null)

    //fetching the list of follwers
    const FetchFollowersList = async (id) => {
        let followers = await getFollowersList(id);
        setFollowersList(followers)
    }

    useEffect(() => {
        FetchFollowersList(id)
    }, [id]);

    // if (followersList) {
    //     console.log("followers at followers page", followersList[0].follower._id)
    // }

    return (
        <>
            <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center'>
                {
                    followersList?.length > 0 &&
                    <h1 className='self-start p-4 text-xl font-semibold'>Followers</h1>
                }

                <div className='flex flex-col items-center justify-center gap-3'>
                    {
                        followersList?.length > 0 ?
                            followersList.map((data, index) => (
                                <UserCard
                                    id={data.follower._id}    //this are the id's , of the followers
                                    key={index}
                                    profilePicture={data.follower.profilePicture}
                                    name={data.follower.name}
                                    userName={data.follower.userName}
                                    bio={data.follower.bio}
                                />
                            )) :
                            followersList?.length == 0 ?
                                (
                                    <div className='h-[90vh] w-[100vw] flex items-center justify-center'>
                                        <h1 className='text-2xl font-semibold'>No followers</h1>
                                    </div>
                                ) :
                                (
                                    <Loader2 />
                                )
                    }
                </div>

            </div>
        </>
    );
}

export default FollowersList;
