import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PostCard from '../components/PostCard';
import Loader2 from '../components/Loaders/Loader2';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormatTime } from '../utils/FormatTime';
import axiosInstance from '../utils/axiosInstance';
import { getFollowersList, getFollowingsList } from '../utils/FollowUnFollowUser';
import useScrollToTop from '../utils/useScrollToTop.js';
import Skeleton from '../components/Loaders/Skeleton.jsx';

function Profile() {

    const currentUserData = useSelector((state) => state.userData?.currentUserData.data)
    const mode = useSelector((state) => state.mode.mode)

    useScrollToTop();

    //the aboutdata text is coming in raw format , so we are formatting it
    let formattedAboutData, formattedBio;
    if (currentUserData?.about) {
        formattedAboutData = currentUserData.about.split("\r\n");
        formattedBio = currentUserData.bio.split("\r\n");
    }
    const [posts, setPosts] = useState(null)

    const [followersList, setFollowersList] = useState(null)
    const [followingsList, setFollowingsList] = useState(null)

    useEffect(() => {
        const getUserPosts = async () => {
            try {
                const res = await axiosInstance.get("/api/v1/posts/getCurrentUserPosts", {
                    withCredentials: true,
                });
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


    return (
        <>
            {
                currentUserData ? (
                    <div className='w-[100vw] h-auto flex flex-col items-center gap-2 p-3 py-18 xl:w-[80vw] absolute right-0'>

                        <div className='relative w-[100%] md:w-[80%] lg:w-[60vw] flex items-center justify-center text-black rounded-2xl bg-no-repeat bg-cover bg-center '
                            style={{ backgroundImage: `url(${currentUserData.coverImage ? currentUserData.coverImage : "/defaultbg.svg"})` }}>
                            <div className='h-[15vh] lg:h-[27vh] '>
                            </div>
                        </div>

                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] h-10  lg:text-center flex flex-row justify-between text-black px-10'>
                            <img src={currentUserData.profilePicture ? currentUserData.profilePicture : "/defaultpfp.png"} alt=""
                                className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 rounded-full relative bottom-15 md:bottom-20' />
                            <NavLink to="/updateprofile" className="flex gap-3 items-center justify-center cursor-pointer bg-blue-400 h-8 w-8 rounded-full">
                                <i className="fa-solid fa-pen"></i>
                            </NavLink>
                        </div>

                        {/* --- START OF REDESIGNED PROFILE CONTENT SEGMENT --- */}
                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] mt-5 lg:mt-20 flex flex-col gap-1.5'>
                            <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${mode === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {currentUserData.name}
                            </h1>
                            <p className={`text-base md:text-lg font-medium opacity-70 ${mode === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                @{currentUserData.userName}
                            </p>

                            {formattedBio && (
                                <div className={`text-sm md:text-base mt-2 leading-relaxed max-w-2xl ${mode === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                    {formattedBio.map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}
                                </div>
                            )}

                            {/* Followers & Following Counters */}
                            <div className='flex flex-row items-center gap-4 pt-4 pb-2'>
                                <NavLink to={`/followerslist/${currentUserData._id}`} className="transition-transform active:scale-95">
                                    <p className={`text-sm md:text-base font-semibold px-3 py-1.5 rounded-xl border border-transparent transition-colors duration-200 ${mode === 'light'
                                        ? 'bg-gray-100 hover:bg-gray-200 text-blue-600 hover:border-blue-200'
                                        : 'bg-[#1e1e1e] hover:bg-[#2a2a2a] text-blue-400 hover:border-blue-900'
                                        }`}>
                                        <span className={mode === 'light' ? 'text-gray-900' : 'text-white'}>{followersList ? followersList.length : "0"}</span> followers
                                    </p>
                                </NavLink>
                                <NavLink to={`/followingslist/${currentUserData._id}`} className="transition-transform active:scale-95">
                                    <p className={`text-sm md:text-base font-semibold px-3 py-1.5 rounded-xl border border-transparent transition-colors duration-200 ${mode === 'light'
                                        ? 'bg-gray-100 hover:bg-gray-200 text-blue-600 hover:border-blue-200'
                                        : 'bg-[#1e1e1e] hover:bg-[#2a2a2a] text-blue-400 hover:border-blue-900'
                                        }`}>
                                        <span className={mode === 'light' ? 'text-gray-900' : 'text-white'}>{followingsList ? followingsList.length : "0"}</span> following
                                    </p>
                                </NavLink>
                            </div>

                            {/* Social Links Layout */}
                            <div className='flex flex-wrap gap-4 mt-2 mb-4'>
                                {currentUserData.githubLink && (
                                    <a href={currentUserData.githubLink} className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'}`} target='_blank' rel="noreferrer">
                                        GitHub <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                                    </a>
                                )}
                                {currentUserData.linkedinLink && (
                                    <a href={currentUserData.linkedinLink} className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'}`} target='_blank' rel="noreferrer">
                                        LinkedIn <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                                    </a>
                                )}
                                {currentUserData.portfolioLink && (
                                    <a href={currentUserData.portfolioLink} className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'}`} target='_blank' rel="noreferrer">
                                        Portfolio <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                                    </a>
                                )}
                                {currentUserData.twitterLink && (
                                    <a href={currentUserData.twitterLink} className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'}`} target='_blank' rel="noreferrer">
                                        Twitter <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* About Section */}
                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] mt-4'>
                            {currentUserData.about && currentUserData.about.length > 1 && (
                                <div className={`p-4 rounded-2xl border ${mode === 'light' ? 'bg-white border-gray-200' : 'bg-[#121212] border-[#262626]'}`}>
                                    <h2 className={`text-xl font-bold mb-2 ${mode === 'light' ? 'text-gray-900' : 'text-white'}`}>About</h2>
                                    <div className={`text-sm md:text-base leading-relaxed ${mode === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                        {formattedAboutData.map((line, index) => (
                                            <p key={index} className="mb-1 last:mb-0">{line}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Skills Section */}
                        {currentUserData.skills && currentUserData.skills.length >= 1 && (
                            <div className='w-[100%] md:w-[80%] lg:w-[60vw] mt-6 flex flex-col gap-3'>
                                <h2 className={`text-xl font-bold ${mode === 'light' ? 'text-gray-900' : 'text-white'}`}>Skills</h2>
                                <div className='flex flex-wrap gap-2'>
                                    {currentUserData.skills.map((skill, index) => (
                                        <span
                                            className={`text-xs md:text-sm font-medium px-3 py-1 rounded-xl border border-transparent transition-colors ${mode === 'light'
                                                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                                : 'bg-[#1e1e1e] text-gray-200 hover:bg-[#252525] border-[#2c2c2c]'
                                                }`}
                                            key={index}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}


                        <div className='w-[100%] md:w-[80%] lg:w-[60vw] mt-10 p-2 flex flex-col gap-2'>
                            <div className='flex items-center gap-4'>
                                <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${mode === 'light' ? 'text-gray-900' : 'text-[#4F46E5]'}`}>Posts</h2>
                                <hr className={`w-[100%] md:w-[80%] lg:w-[60vw] ${mode === 'light' ? 'border-slate-300/80' : 'border-slate-800/80'}`} />
                            </div>
                            <div className='flex flex-col items-center '>
                                {
                                    posts != null ? posts.map((data, index) => (
                                        <PostCard key={index}
                                            authorUserId={data.author._id}
                                            authorName={data.author.name}
                                            authorProfilePicture={data.author.profilePicture}
                                            createdAt={FormatTime(data.createdAt)}
                                            postDesc={data.description}
                                            postImage={data.image}
                                            postVideo={data.video}
                                            likesCount={data.likes}
                                            postId={data._id}
                                            isAlreadyLiked={data.likes.includes(currentUserData._id) && true}
                                        />
                                    )) : posts?.length == 0 ? (
                                        <div>
                                            No Posts Found
                                        </div>
                                    ) : (
                                        <div className='w-full px-3 pt-6 flex flex-col xl:w-[80vw] xl:absolute right-0 items-center justify-center xl:justify-center xl:items-center'>
                                            <div className='w-[100vw] px-3 md:w-[80vw] xl:w-[50vw] flex flex-col gap-2'>
                                                <Skeleton />
                                                <Skeleton />
                                                <Skeleton />
                                                <Skeleton />
                                            </div>
                                        </div>
                                    )
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


