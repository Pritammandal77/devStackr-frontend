import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import FollowButton from '../components/followButton';
import PostCard from '../components/PostCard';
import { FormatTime } from '../utils/FormatTime';
import axiosInstance from '../utils/axiosInstance';
import { followUser, getFollowersList, getFollowingsList, unFollowUser } from '../utils/FollowUnFollowUser';

function OtherUserProfile() {

    //we are getting the id of user from parameter (react router's route)
    const { id } = useParams();

    const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id)

    const [userData, setUserData] = useState([])
    const [userPostsIds, setUserPostsIds] = useState([])
    const [allPosts, setAllPosts] = useState([])

    const [followersList, setFollowersList] = useState(null)        //storing the followers list array
    const [followingsList, setFollowingsList] = useState(null)

    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState()

    const getUserProfileById = async (id) => {
        try {
            const res = await axiosInstance.get(`/api/v1/users/${id}`);
            setUserData(res.data.data)
            setUserPostsIds(res.data?.data?.posts)
        } catch (err) {
            console.error("Error fetching user profile:", err.message);
        }
    }

    const getUserPostsById = async (userPostsIds) => {
        try {
            const res = await axiosInstance.post("/api/v1/posts/userpostsbyid", {
                postIds: userPostsIds
            });
            // console.log('other user data posts', res.data.data[0]._id);
            setAllPosts(res.data.data)
        } catch (error) {
            console.error("Error while fetching user posts:", error.message);
        }
    };

    //fetching the list of followers
    const FetchFollowersList = async (id) => {
        let followers = await getFollowersList(id);
        // console.log("sfdgesgergserdgrsgrg", followers)
        setFollowersList(followers)
    }

    const FetchFollowingsList = async (id) => {
        let followings = await getFollowingsList(id)
        // console.log("following list", followings)
        setFollowingsList(followings)
    }

    useEffect(() => {
        getUserProfileById(id);
        FetchFollowersList(id)
        FetchFollowingsList(id)
        FormatTime()
    }, [id]);

    useEffect(() => {
        if (userPostsIds.length > 0) {
            getUserPostsById(userPostsIds);
        }
    }, [userPostsIds, followersList]);


    const handleFollow = async () => {
        await followUser(id);                 // API call
        await FetchFollowersList(id);        // Refresh followers list
    }

    const handleUnFollow = async () => {
        await unFollowUser(id);              // API call
        await FetchFollowersList(id);        // Refresh followers list
    }

    //checking is the followerslist contains the currentUserId
    useEffect(() => {
        if (followersList) {
            const isFollowing = followersList.some(
                (data) => data.follower._id.toString() === currentUserId
            );
            setIsAlreadyFollowing(isFollowing);
        }
    }, [followersList, currentUserId]);


    return (
        <>
            {
                userData ? (
                    <div className='w-[100vw] h-auto flex flex-col items-center gap-2 p-3 py-15 xl:w-[80vw] absolute right-0'>

                        <div className='relative w-[100%] md:w-[80%] lg:w-[60vw] flex items-center justify-center text-black rounded-2xl bg-no-repeat bg-cover bg-center '
                            style={{ backgroundImage: `url(${userData.coverImage ? userData.coverImage : "/defaultbg.svg"})` }}>
                            <div className='40% h-[15vh] lg:h-[23vh] '>
                            </div>
                        </div>

                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] h-10  lg:text-center flex flex-row justify-between text-black px-10'>
                            <img src={userData.profilePicture ? userData.profilePicture : "/defaultpfp.png"} alt=""
                                className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 rounded-full relative bottom-15 md:bottom-20' />
                            {
                                isAlreadyFollowing ?
                                    (
                                        currentUserId != userData._id &&
                                        <FollowButton onClick={handleUnFollow} text="unfollow" />
                                    )
                                    :
                                    (
                                        currentUserId != userData._id &&   //means , if our currentLoggedInUserId != the otherUserId then show this followBtn
                                        <FollowButton onClick={handleFollow} text="follow" />
                                    )
                            }
                        </div>

                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] p-2 mt-5 lg:mt-20'>
                            <h1 className='text-[22px] md:text-[28px] font-semibold'>{userData.name}</h1>
                            <p className='text-[16px] md:text-[20px] font-semibold'>{userData.userName}</p>
                            <p className='text-[20px]'>{userData.bio}</p>
                            <div className='flex flex-row items-center gap-10 md:gap-15 w-[90%] md:w-[50%] py-5'>
                                <NavLink to={`/followerslist/${id}`}>
                                    <p className='text-[18px] md:text-[20px] text-blue-500 font-semibold py-1 px-2 rounded-[10px]' >{followersList ? followersList.length : 0} followers</p>
                                </NavLink>
                                <NavLink to={`/followingslist/${id}`}>
                                    <p className='text-[18px] md:text-[20px] text-blue-500 font-semibold py-1 px-2 rounded-[10px]'>{followingsList ? followingsList.length : 0} following</p>
                                </NavLink>
                            </div>
                            <div className='flex gap-5'>
                                {
                                    userData.githubLink &&
                                    <a href={userData.githubLink} className='text-[16px] text-blue-600 ' target='_blank'>
                                        github <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                }
                                {
                                    userData.linkedinLink &&
                                    <a href={userData.linkedinLink}
                                        target='_blank'
                                        className='text-[16px] text-blue-600 '>
                                        linkedin <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                }
                            </div>
                        </div>
                        {
                            userData.about &&
                            <div className='w-[100%] md:w-[80%] lg:w-[60vw]  p-2 '>
                                <h1 className='text-[28px] lg:text-[32px]'>About</h1>
                                <p className='text-[16px] md:text-[18px]'>
                                    {userData.about}
                                </p>
                            </div>
                        }

                        {
                            userData.skills &&
                            <div className='w-[100%] md:w-[80%] lg:w-[60vw] p-2 flex flex-col gap-2'>
                                <h1 className='text-[28px] lg:text-[32px]'>Skills</h1>
                                <div className='flex flex-wrap gap-3'>
                                    {
                                        userData.skills && userData.skills.map((skill, index) => (
                                            <span className='px-3 py-1 border-2 border-gray-500 rounded-xl' key={index}>{skill}</span>
                                        ))
                                    }
                                </div>
                            </div>
                        }

                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] p-2 flex flex-col gap-2'>
                            <h1 className='text-[28px] lg:text-[32px]'>Posts</h1>
                            <div className='flex flex-col items-center '>
                                {
                                    allPosts && allPosts.map((data, index) => (
                                        <PostCard key={index}
                                            authorName={data.author.name}
                                            authorProfilePicture={data.author.profilePicture}
                                            createdAt={FormatTime(data.createdAt)}
                                            postDesc={data.description}
                                            postImage={data.image}
                                            likesCount={data.likes}
                                            postId={data._id}
                                            threeDot="true"
                                            isAlreadyLiked={data.likes.includes(currentUserId) && true}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader2 />
                )
            }
        </>
    );
}

export default OtherUserProfile;
