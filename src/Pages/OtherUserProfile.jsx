import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { FormatTime } from '../utils/FormatTime';
import FollowButton from '../components/FollowButton';
import axiosInstance from '../utils/axiosInstance';
import { followUser, getFollowersList, getFollowingsList, unFollowUser } from '../utils/FollowUnFollowUser';
import { createOrFetchChat } from '../utils/ChatAPI';
import useScrollToTop from '../utils/useScrollToTop';
import { Loader2 } from 'lucide-react';

function OtherUserProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    useScrollToTop();

    const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id);
    const mode = useSelector((state) => state.mode.mode);
    const isLight = mode === 'light';

    const [userData, setUserData] = useState(null);
    const [userPostsIds, setUserPostsIds] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [followersList, setFollowersList] = useState(null);
    const [followingsList, setFollowingsList] = useState(null);
    const [isFollowBtnClicked, setIsFollowBtnClicked] = useState(false);
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);

    let formattedAboutData, formattedBio;
    if (userData?.about) {
        formattedAboutData = userData.about.split("\r\n");
        formattedBio = userData.bio.split("\r\n");
    }

    const getUserProfileById = async (id) => {
        try {
            const res = await axiosInstance.get(`/api/v1/users/${id}`);
            setUserData(res.data.data);
            setUserPostsIds(res.data?.data?.posts);
        } catch (err) {
            console.error("Error fetching user profile:", err.message);
        }
    };

    const FetchFollowersList = async (id) => {
        const followers = await getFollowersList(id);
        setFollowersList(followers);
    };

    const FetchFollowingsList = async (id) => {
        const followings = await getFollowingsList(id);
        setFollowingsList(followings);
    };

    const getUserPostsById = async (ids) => {
        try {
            const res = await axiosInstance.post("/api/v1/posts/userpostsbyid", { postIds: ids });
            setAllPosts(res.data.data);
        } catch (error) {
            console.error("Error fetching user posts:", error.message);
        }
    };

    useEffect(() => {
        getUserProfileById(id);
        FetchFollowersList(id);
        FetchFollowingsList(id);
    }, [id]);

    useEffect(() => {
        if (userPostsIds?.length > 0) getUserPostsById(userPostsIds);
    }, [userPostsIds, followersList]);

    useEffect(() => {
        if (followersList) {
            setIsAlreadyFollowing(
                followersList.some((data) => data.follower._id.toString() === currentUserId)
            );
        }
    }, [followersList, currentUserId]);

    const handleFollow = async () => {
        setIsFollowBtnClicked(true);
        await followUser(id);
        await FetchFollowersList(id);
        setIsFollowBtnClicked(false);
    };

    const handleUnFollow = async () => {
        setIsFollowBtnClicked(true);
        await unFollowUser(id);
        await FetchFollowersList(id);
        setIsFollowBtnClicked(false);
    };

    const handleCreateChat = async (userId) => {
        const response = await createOrFetchChat(userId);
        if (response.data.data._id) {
            navigate(`/chat/messages/${response.data.data._id}`);
        }
    };

    const isOwnProfile = currentUserId === userData?._id;

    const linkClass = `text-sm font-medium flex items-center gap-1.5 transition-colors ${
        isLight ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'
    }`;

    const counterClass = `text-sm md:text-base font-semibold px-3 py-1.5 rounded-xl border border-transparent transition-colors duration-200 ${
        isLight
            ? 'bg-gray-100 hover:bg-gray-200 text-blue-600 hover:border-blue-200'
            : 'bg-[#1e1e1e] hover:bg-[#2a2a2a] text-blue-400 hover:border-blue-900'
    }`;

    return (
        <>
            {userData ? (
                <div className='w-[100vw] h-auto flex flex-col items-center gap-2 p-3 py-15 xl:w-[80vw] absolute right-0'>

                    {/* Cover Image */}
                    <div
                        className='relative w-full md:w-[80%] lg:w-[60vw] flex items-center justify-center rounded-2xl bg-no-repeat bg-cover bg-center'
                        style={{ backgroundImage: `url(${userData.coverImage || "/defaultbg.svg"})` }}
                    >
                        <div className='h-[15vh] lg:h-[27vh]' />
                    </div>

                    {/* Avatar + Action Buttons */}
                    <div className='w-full md:w-[80%] lg:w-[60vw] h-10 flex flex-row justify-between text-black px-10'>
                        <img
                            src={userData.profilePicture || "/defaultpfp.png"}
                            alt="profile"
                            className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 rounded-full relative bottom-15 md:bottom-20'
                        />
                        {/* Desktop action buttons */}
                        <div className='hidden md:flex items-center gap-3'>
                            {currentUserId && !isOwnProfile && (
                                <>
                                    <FollowButton
                                        onClick={isAlreadyFollowing ? handleUnFollow : handleFollow}
                                        text={isAlreadyFollowing ? "unfollow" : "follow"}
                                        isLoading={isFollowBtnClicked}
                                    />
                                    <button
                                        onClick={() => handleCreateChat(userData._id)}
                                        className='bg-blue-400 h-[35px] px-4 py-2 rounded-xl text-black text-sm font-semibold cursor-pointer flex items-center gap-2'
                                    >
                                        <i className="fa-regular fa-paper-plane"></i> Message
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className='w-full md:w-[80%] lg:w-[60vw] mt-5 lg:mt-20 flex flex-col gap-1.5 px-2'>
                        <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                            {userData.name}
                            {isOwnProfile && <span className='text-lg font-semibold px-3 opacity-50'>( Me )</span>}
                        </h1>
                        <p className={`text-base md:text-lg font-medium opacity-70 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                            @{userData.userName}
                        </p>

                        {formattedBio && (
                            <div className={`text-sm md:text-base mt-2 leading-relaxed max-w-2xl ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                                {formattedBio.map((line, index) => <p key={index}>{line}</p>)}
                            </div>
                        )}

                        {/* Followers / Following */}
                        <div className='flex flex-row items-center gap-4 pt-4 pb-2'>
                            <NavLink to={`/followerslist/${id}`} className="transition-transform active:scale-95">
                                <p className={counterClass}>
                                    <span className={isLight ? 'text-gray-900' : 'text-white'}>{followersList?.length ?? 0}</span> followers
                                </p>
                            </NavLink>
                            <NavLink to={`/followingslist/${id}`} className="transition-transform active:scale-95">
                                <p className={counterClass}>
                                    <span className={isLight ? 'text-gray-900' : 'text-white'}>{followingsList?.length ?? 0}</span> following
                                </p>
                            </NavLink>
                        </div>

                        {/* Mobile action buttons */}
                        <div className='md:hidden flex items-center gap-3 mb-2'>
                            {currentUserId && !isOwnProfile && (
                                <>
                                    <FollowButton
                                        onClick={isAlreadyFollowing ? handleUnFollow : handleFollow}
                                        text={isAlreadyFollowing ? "unfollow" : "follow"}
                                        isLoading={isFollowBtnClicked}
                                    />
                                    <button
                                        onClick={() => handleCreateChat(userData._id)}
                                        className='bg-blue-400 h-[35px] text-black w-[45vw] md:w-auto px-3 py-2 rounded-xl text-sm font-semibold cursor-pointer flex items-center justify-center gap-2'
                                    >
                                        <i className="fa-regular fa-paper-plane"></i> Message
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className='flex flex-wrap gap-4 mt-2 mb-4'>
                            {userData.githubLink && (
                                <a href={userData.githubLink} className={linkClass} target='_blank' rel="noreferrer">
                                    GitHub <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                                </a>
                            )}
                            {userData.linkedinLink && (
                                <a href={userData.linkedinLink} className={linkClass} target='_blank' rel="noreferrer">
                                    LinkedIn <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                                </a>
                            )}
                            {userData.portfolioLink && (
                                <a href={userData.portfolioLink} className={linkClass} target='_blank' rel="noreferrer">
                                    Portfolio <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                                </a>
                            )}
                            {userData.twitterLink && (
                                <a href={userData.twitterLink} className={linkClass} target='_blank' rel="noreferrer">
                                    Twitter <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* About */}
                    {userData?.about?.length > 1 && (
                        <div className='w-full md:w-[80%] lg:w-[60vw] mt-4 px-2'>
                            <div className={`p-4 rounded-2xl border ${isLight ? 'bg-white border-gray-200' : 'bg-[#121212] border-[#262626]'}`}>
                                <h2 className={`text-xl font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>About</h2>
                                <div className={`text-sm md:text-base leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                                    {formattedAboutData.map((line, index) => (
                                        <p key={index} className="mb-1 last:mb-0">{line}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {userData?.skills?.length >= 1 && (
                        <div className='w-full md:w-[80%] lg:w-[60vw] mt-6 flex flex-col gap-3 px-2'>
                            <h2 className={`text-xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>Skills</h2>
                            <div className='flex flex-wrap gap-2'>
                                {userData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className={`text-xs md:text-sm font-medium px-3 py-1 rounded-xl border border-transparent transition-colors ${
                                            isLight
                                                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                                : 'bg-[#1e1e1e] text-gray-200 hover:bg-[#252525] border-[#2c2c2c]'
                                        }`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Posts */}
                    {userData?.posts?.length >= 1 && (
                        <div className='w-full md:w-[80%] lg:w-[60vw] mt-10 p-2 flex flex-col gap-2'>
                            <div className='flex items-center gap-4'>
                                <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-[#4F46E5]'}`}>Posts</h2>
                                <hr className={`w-full ${isLight ? 'border-slate-300/80' : 'border-slate-800/80'}`} />
                            </div>
                            <div className='flex flex-col items-center'>
                                {allPosts.map((data, index) => (
                                    <PostCard
                                        key={index}
                                        authorUserId={data.author._id}
                                        authorName={data.author.name}
                                        authorProfilePicture={data.author.profilePicture}
                                        createdAt={FormatTime(data.createdAt)}
                                        postDesc={data.description}
                                        postImage={data.image}
                                        postVideo={data.video}
                                        likesCount={data.likes}
                                        postId={data._id}
                                        isAlreadyLiked={data.likes.includes(currentUserId)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            ) : (
                <Loader2 />
            )}
        </>
    );
}

export default OtherUserProfile;









































// Old UI

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import PostCard from '../components/PostCard';
// import { FormatTime } from '../utils/FormatTime';
// import FollowButton from '../components/FollowButton'
// import axiosInstance from '../utils/axiosInstance';
// import { followUser, getFollowersList, getFollowingsList, unFollowUser } from '../utils/FollowUnFollowUser';
// import { createOrFetchChat } from '../utils/ChatAPI';
// import useScrollToTop from '../utils/useScrollToTop';

// function OtherUserProfile() {

//     //we are getting the id of user from parameter (react router's route)
//     const { id } = useParams();
//     const navigate = useNavigate()
//     useScrollToTop();

//     const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id)

//     const mode = useSelector((state) => state.mode.mode)
//     const [userData, setUserData] = useState([])
//     const [userPostsIds, setUserPostsIds] = useState([])
//     const [allPosts, setAllPosts] = useState([])

//     const [followersList, setFollowersList] = useState(null)        //storing the followers list array
//     const [followingsList, setFollowingsList] = useState(null)
//     const [isFollowBtnClicked, setIsFollowBtnClicked] = useState(false) // to show a loader on followBtn

//     const [isAlreadyFollowing, setIsAlreadyFollowing] = useState()

//     const getUserProfileById = async (id) => {
//         try {
//             const res = await axiosInstance.get(`/api/v1/users/${id}`);
//             setUserData(res.data.data)
//             setUserPostsIds(res.data?.data?.posts)
//         } catch (err) {
//             console.error("Error fetching user profile:", err.message);
//         }
//     }

//     let formattedAboutData, formattedBio;
//     if (userData?.about) {
//         formattedAboutData = userData.about.split("\r\n");
//         formattedBio = userData.bio.split("\r\n");
//     }


//     const getUserPostsById = async (userPostsIds) => {
//         try {
//             const res = await axiosInstance.post("/api/v1/posts/userpostsbyid", {
//                 postIds: userPostsIds
//             });
//             // console.log('other user data posts', res.data.data[0]._id);
//             setAllPosts(res.data.data)
//         } catch (error) {
//             console.error("Error while fetching user posts:", error.message);
//         }
//     };

//     //fetching the list of followers
//     const FetchFollowersList = async (id) => {
//         let followers = await getFollowersList(id);
//         setFollowersList(followers)
//     }

//     const FetchFollowingsList = async (id) => {
//         let followings = await getFollowingsList(id)
//         setFollowingsList(followings)
//     }

//     useEffect(() => {
//         getUserProfileById(id);
//         FetchFollowersList(id)
//         FetchFollowingsList(id)
//         FormatTime()
//     }, [id]);

//     useEffect(() => {
//         if (userPostsIds.length > 0) {
//             getUserPostsById(userPostsIds);
//         }
//     }, [userPostsIds, followersList]);


//     const handleFollow = async () => {
//         setIsFollowBtnClicked(true)
//         await followUser(id);                 // API call
//         await FetchFollowersList(id);        // Refresh followers list
//         setIsFollowBtnClicked(false)
//     }

//     const handleUnFollow = async () => {
//         setIsFollowBtnClicked(true)
//         await unFollowUser(id);              // API call
//         await FetchFollowersList(id);        // Refresh followers list
//         setIsFollowBtnClicked(false)
//     }

//     //checking is the followerslist contains the currentUserId
//     useEffect(() => {
//         if (followersList) {
//             const isFollowing = followersList.some(
//                 (data) => data.follower._id.toString() === currentUserId
//             );
//             setIsAlreadyFollowing(isFollowing);
//         }
//     }, [followersList, currentUserId]);

//     const handleCreateChat = async (id) => {
//         const response = await createOrFetchChat(id)
//         console.log(response)
//         if (response.data.data._id) {
//             const id = response.data.data._id
//             navigate(`/chat/messages/${id}`)
//         }
//     }


//     return (
//         <>
//             {
//                 userData ? (
//                     <div className='w-[100vw] h-auto flex flex-col items-center gap-2 p-3 py-15 xl:w-[80vw] absolute right-0'>

//                         <div className='relative w-[100%] md:w-[80%] lg:w-[60vw] flex items-center justify-center text-black rounded-2xl bg-no-repeat bg-cover bg-center '
//                             style={{ backgroundImage: `url(${userData.coverImage ? userData.coverImage : "/defaultbg.svg"})` }}>
//                             <div className='h-[15vh] lg:h-[27vh] '>
//                             </div>
//                         </div>

//                         <div className='w-[100%] md:w-[80%] lg:w-[60vw] h-10  lg:text-center flex flex-row justify-between text-black px-10'>
//                             <img src={userData.profilePicture ? userData.profilePicture : "/defaultpfp.png"} alt=""
//                                 className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 rounded-full relative bottom-15 md:bottom-20' />
//                             <div className='hidden md:flex items-center justify-center gap-5'>
//                                 {
//                                     isAlreadyFollowing ?
//                                         (
//                                             currentUserId && currentUserId != userData._id &&
//                                             <FollowButton onClick={handleUnFollow} text="unfollow" isLoading={isFollowBtnClicked} />
//                                         )
//                                         :
//                                         (
//                                             currentUserId && currentUserId != userData._id &&   //means , if our currentLoggedInUserId != the otherUserId then show this followBtn
//                                             <FollowButton onClick={handleFollow} text="follow" isLoading={isFollowBtnClicked} />
//                                         )
//                                 }
//                                 {
//                                     currentUserId &&
//                                     <button className='bg-blue-400 h-[35px] px-3 py-2 rounded-[10px] text-[19px] cursor-pointer flex flex-row items-center justify-center gap-2'
//                                         onClick={() => handleCreateChat(userData._id)}>Message</button>
//                                 }
//                             </div>
//                         </div>

//                         <div className='w-[100%] md:w-[80%] lg:w-[60vw] mt-5 md:mt-10 lg:mt-20 flex flex-col gap-2 px-2'>
//                             <div className='flex flex-col '>
//                                 <h1 className='text-[22px] md:text-[28px] font-semibold'>{userData.name}{currentUserId == userData._id && <span className='text-[18px] font-semibold px-3'>( Me )</span>}</h1>
//                                 <p className='text-[16px] md:text-[20px] font-semibold'>{userData.userName}</p>
//                                 <div className='text-[16px] md:text-[18px]'>
//                                     {formattedBio?.map((line, index) => (
//                                         <p key={index}>{line}</p>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className='flex flex-row items-center  gap-5 md:gap-15 w-[80%] md:w-[50%] pt-2 pb-2 lg:py-3'>
//                                 <NavLink to={`/followerslist/${id}`}>
//                                     <p className={`text-[20px] md:text-[20px] text-blue-500 font-semibold px-2 rounded-[10px]  ${mode == 'light' ? 'bg-gray-100' : 'bg-[#1e1e1e]'}`} >{followersList ? followersList.length : 0} followers</p>
//                                 </NavLink>
//                                 <NavLink to={`/followingslist/${id}`}>
//                                     <p className={`text-[20px] md:text-[20px] text-blue-500 font-semibold  px-2 rounded-[10px]  ${mode == 'light' ? 'bg-gray-100' : 'bg-[#1e1e1e]'}`}>{followingsList ? followingsList.length : 0} following</p>
//                                 </NavLink>
//                             </div>
//                             <div className='md:hidden flex items-center gap-5'>
//                                 {
//                                     isAlreadyFollowing ?
//                                         (
//                                            currentUserId && currentUserId != userData._id &&
//                                             <FollowButton onClick={handleUnFollow} text="unfollow" isLoading={isFollowBtnClicked} />
//                                         )
//                                         :
//                                         (
//                                             currentUserId && currentUserId != userData._id &&   //means , if our currentLoggedInUserId != the otherUserId then show this followBtn
//                                             <FollowButton onClick={handleFollow} text="follow" isLoading={isFollowBtnClicked} />
//                                         )
//                                 }
//                                 {
//                                   currentUserId && currentUserId != userData._id &&
//                                     <button className='bg-blue-400 h-[35px] text-black w-[45vw] md:w-auto px-3 py-2 rounded-[10px] text-[19px] cursor-pointer flex flex-row items-center justify-center gap-2'
//                                         onClick={() => handleCreateChat(userData._id)}>
//                                         <i className="fa-regular fa-paper-plane"></i>
//                                         <span>Message</span>
//                                     </button>
//                                 }
//                             </div>
//                             <div className={`flex gap-5 mt-2 xl:mt-0`}>
//                                 {
//                                     userData.githubLink &&
//                                     <a href={userData.githubLink} className='text-[16px] text-blue-600 ' target='_blank'>
//                                         github <i className="fa-solid fa-arrow-up-right-from-square"></i>
//                                     </a>
//                                 }
//                                 {
//                                     userData.linkedinLink &&
//                                     <a href={userData.linkedinLink}
//                                         target='_blank'
//                                         className='text-[16px] text-blue-600 '>
//                                         linkedin <i className="fa-solid fa-arrow-up-right-from-square"></i>
//                                     </a>
//                                 }
//                                 {
//                                     userData.portfolioLink &&
//                                     <a href={userData.portfolioLink}
//                                         target='_blank'
//                                         className='text-[16px] text-blue-600 '>
//                                         Portfolio <i className="fa-solid fa-arrow-up-right-from-square"></i>
//                                     </a>
//                                 }
//                                 {
//                                     userData.twitterLink &&
//                                     <a href={userData.twitterLink}
//                                         target='_blank'
//                                         className='text-[16px] text-blue-600 '>
//                                         twitter <i className="fa-solid fa-arrow-up-right-from-square"></i>
//                                     </a>
//                                 }
//                             </div>
//                         </div>
//                         {
//                             userData?.about?.length > 1 &&
//                             <div className='w-[100%] md:w-[80%] lg:w-[60vw]  px-2'>
//                                 <h1 className='text-[28px] lg:text-[32px] '>About</h1>
//                                 <div className='text-[16px] md:text-[18px]'>
//                                     {formattedAboutData.map((line, index) => (
//                                         <p key={index}>{line}</p>
//                                     ))}
//                                 </div>
//                             </div>
//                         }

//                         {
//                             userData?.skills?.length >= 1 &&
//                             <div className='w-[100%] md:w-[80%] lg:w-[60vw] flex flex-col gap-2 px-2'>
//                                 <h1 className='text-[28px] lg:text-[32px]'>Skills</h1>
//                                 <div className='flex flex-wrap gap-3'>
//                                     {
//                                         userData.skills && userData.skills.map((skill, index) => (
//                                             <span className={`px-3 py-1 rounded-xl  ${mode == 'light' ? 'bg-gray-300 ' : 'bg-[#1e1e1e]'}`} key={index}>{skill}</span>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         }

//                         {
//                             userData?.posts?.length >= 1 &&
//                             <div className='w-[100%] md:w-[80%] lg:w-[60vw] flex flex-col gap-2'>
//                                 <h1 className='text-[28px] lg:text-[32px] px-2'>Posts</h1>
//                                 <div className='flex flex-col items-center '>
//                                     {
//                                         allPosts && allPosts.map((data, index) => (
//                                             <PostCard key={index}
//                                                 authorUserId={data.author._id}
//                                                 authorName={data.author.name}
//                                                 authorProfilePicture={data.author.profilePicture}
//                                                 createdAt={FormatTime(data.createdAt)}
//                                                 postDesc={data.description}
//                                                 postImage={data.image}
//                                                 postVideo={data.video}
//                                                 likesCount={data.likes}
//                                                 postId={data._id}
//                                                 isAlreadyLiked={data.likes.includes(currentUserId) && true}
//                                             />
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         }

//                     </div>
//                 ) : (
//                     <Loader2 />
//                 )
//             }
//         </>
//     );
// }

// export default OtherUserProfile;
