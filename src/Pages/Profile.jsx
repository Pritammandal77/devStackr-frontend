import React, { useEffect } from 'react';
import FollowButton from '../components/followButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import PostCard from '../components/PostCard';
import Loader1 from '../components/Loaders/Loader1';
import Loader2 from '../components/Loaders/Loader2';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormatTime } from '../utils/FormatTime';
import axiosInstance from '../utils/axiosInstance';
import { getFollowersList, getFollowingsList } from '../utils/FollowUnFollowUser';

function Profile() {

    const currentUserData = useSelector((state) => state.userData?.currentUserData.data)
    const mode = useSelector((state) => state.mode.mode)

    const [posts, setPosts] = useState([])

    const [followersList, setFollowersList] = useState(null)
    const [followingsList, setFollowingsList] = useState(null)

    useEffect(() => {
        const getUserPosts = async () => {
            try {
                const res = await axiosInstance.get("/api/v1/posts/getCurrentUserPosts", {
                    withCredentials: true,
                });
                // console.log("get user posts", res.data.data)
                setPosts(res.data.data)
            } catch (err) {
                console.log("User not logged ,we can't fetch posts", err.message);
            }
        };

        getUserPosts();
    }, []);


    const handleFetchFollowerList = async (id) => {
        let followers = await getFollowersList(id);
        setFollowersList(followers)
    }

    const handleFetchFollowingList = async (userId) => {
        let following = await getFollowingsList(userId)
        setFollowingsList(following)
    }

    useEffect(() => {
        handleFetchFollowerList(currentUserData?._id)
        handleFetchFollowingList(currentUserData?._id)
    }, [currentUserData]);

    // if (followersList) {
    //     console.log("follower list at my profile", followersList)
    // }

    // if (followingsList) {
    //     console.log("followings list at my profile", followingsList)
    // }

    return (
        <>
            {
                currentUserData ? (
                    <div className='w-[100vw] h-auto flex flex-col items-center gap-2 p-3 py-15 xl:w-[80vw] absolute right-0'>

                        <div className='relative w-[100%] md:w-[80%] lg:w-[60vw] flex items-center justify-center text-black rounded-2xl bg-no-repeat bg-cover bg-center '
                            style={{ backgroundImage: `url(${currentUserData.coverImage ? currentUserData.coverImage : "/defaultbg.svg"})` }}>
                            <div className='40% h-[15vh] lg:h-[23vh] '>
                            </div>
                        </div>

                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] h-10  lg:text-center flex flex-row justify-between text-black px-10'>
                            <img src={currentUserData.profilePicture ? currentUserData.profilePicture : "/defaultpfp.png"} alt=""
                                className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 rounded-full relative bottom-15 md:bottom-20' />
                        </div>

                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] p-2 mt-5 lg:mt-20'>
                            <h1 className='text-[22px] md:text-[28px] font-semibold'>{currentUserData.name}</h1>
                            <p className='text-[16px] md:text-[20px] font-semibold'>{currentUserData.userName}</p>
                            <p className='text-[20px]'>{currentUserData.bio}</p>
                            <div className='flex flex-row items-center gap-10 md:gap-15 w-[90%] md:w-[50%] pt-4 pb-2 lg:py-5'>
                                <NavLink to={`/followerslist/${currentUserData._id}`}>
                                    <p className={`text-[18px] md:text-[20px] text-blue-500 font-semibold border-1 px-2 rounded-[10px]  ${mode == 'light' ? 'bg-gray-300' : 'bg-[#1e1e1e]'}`} >{followersList ? followersList.length : "0"} followers</p>
                                </NavLink>
                                <NavLink to={`/followingslist/${currentUserData._id}`}>
                                    <p className={`text-[18px] md:text-[20px] text-blue-500 font-semibold border-1 px-2 rounded-[10px]  ${mode == 'light' ? 'bg-gray-300' : 'bg-[#1e1e1e]'}`}>{followingsList ? followingsList.length : "0"} following</p>
                                </NavLink>
                            </div>
                            <div className='flex gap-5 mt-2'>
                                {
                                    currentUserData.githubLink &&
                                    <a href={currentUserData.githubLink} className='text-[16px] text-blue-600 ' target='_blank'>
                                        github <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                }

                                {
                                    currentUserData.linkedinLink &&
                                    <a href={currentUserData.linkedinLink}
                                        target='_blank'
                                        className='text-[16px] text-blue-600 '>
                                        linkedin <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                }
                            </div>
                        </div>

                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] px-2 '>
                            <h1 className='text-[28px] lg:text-[32px]'>About</h1>
                            <p className='text-[16px] md:text-[18px]'>
                                {currentUserData.about}
                            </p>
                        </div>

                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] p-2 flex flex-col gap-2'>
                            <h1 className='text-[28px] lg:text-[32px]'>Skills</h1>
                            <div className='flex flex-wrap gap-3'>
                                {
                                    currentUserData.skills && currentUserData.skills.map((skill, index) => (
                                        <span className='px-3 py-1 border-2 border-gray-500 rounded-xl' key={index}>{skill}</span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] p-2 flex flex-col gap-2'>
                            <h1 className='text-[28px] lg:text-[32px]'>Posts</h1>
                            <div className='flex flex-col items-center '>
                                {
                                    posts && posts.map((data, index) => (
                                        <PostCard key={index}
                                            authorName={data.author.name}
                                            authorProfilePicture={data.author.profilePicture}
                                            createdAt={FormatTime(data.createdAt)}
                                            postDesc={data.description}
                                            postImage={data.image}
                                            likesCount={data.likes}
                                            postId={data._id}
                                            threeDot="true"
                                            isAlreadyLiked={data.likes.includes(currentUserData._id) && true}
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

export default Profile;


