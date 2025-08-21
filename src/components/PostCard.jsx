import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader3 from './Loaders/Loader3';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { createComment, deleteComment, getCurrentPostComments } from '../utils/CommentAPIs';
import { toast } from 'sonner';
import { FormatTime } from '../utils/FormatTime';
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';
import Loader2 from './Loaders/Loader2';
import ReactPlayer from 'react-player'
import CustomVideoPlayer from './CustomVideoPlayer';

function PostCard({ authorUserId, authorName, authorProfilePicture, createdAt, postDesc, postImage, postVideo, postId, likesCount, followBtn, isAlreadyLiked }) {

    const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id)
    const mode = useSelector((state) => state.mode.mode)

    const navigate = useNavigate()

    const [isCommentSectionVisiblem, setIsCommentSectionVisible] = useState(false) //to set , comment section will be visible or not

    const [isMenuVisible, setIsMenuVisible] = useState(false) // to hide and show the dropdown menu on the posts i.e, delete post btn's etc

    const [visibleCommentMenu, setVisibleCommentMenu] = useState(null);  //to hide or visible the commentmenu i.e, delete comment btn ,etc.

    const [postLikesData, setPostLikesData] = useState(false)
    const [isLiking, setIsLiking] = useState(false) //to track loading status of liking a post

    const [isLoading, setIsLoading] = useState(false)

    //storing the value isPostLiked
    const [isLiked, setIsLiked] = useState(isAlreadyLiked);

    const likeAPost = async (postId) => {
        setIsLiking(true)
        try {
            const response = await axiosInstance.put("/api/v1/posts/likes", { postId: postId })
            setPostLikesData(response.data.data)
            if (isLiked == true) {
                setIsLiked(false)
            } else {
                setIsLiked(true)
            }
        } catch (error) {
            console.log("Failed to like the posts", error)
        } finally {
            setIsLiking(false)
        }
    }

    const [commentText, setCommentText] = useState("")   //to store comment from input
    const [allComments, setAllComments] = useState(false)
    const [isNewCommentAdded, setIsNewCommentAdded] = useState(false)     // I have created this state, to only recall the handleGetCurrentPostComments() in the useEffect , whenever a user adds a new comment.

    // to create a comment
    const handleComment = async (postId, commentText) => {
        setIsNewCommentAdded(true)
        setIsLoading(true)
        try {
            const payload = {
                postId,
                commentText
            };
            const response = await createComment(payload)
            // console.log("response", response)

            if (response?.statusCode == 200) {
                toast.success("commented successfully")
            }

        } catch (error) {
            console.log("error while creating comment", error)
        } finally {
            setIsNewCommentAdded(false)
            setCommentText("")
            setIsLoading(false)
        }
    }

    //to fetch comments of each posts by the postIds
    const handleGetCurrentPostComments = async (postId) => {
        const response = await getCurrentPostComments(postId)
        if (response) {
            setAllComments(response.data.data)
        }
    }

    //to delete a comment
    const handleDeleteComment = async (id) => {
        try {
            setIsLoading(true)
            const response = await deleteComment(id)
            if (response.data.statusCode == 200) {
                toast.success("comment deleted successfully")
                handleGetCurrentPostComments(postId)  //after successfully deleting a comment , we are refetching the comments
            }
        } catch (error) {
            console.log("error while deleting the comment", error)
        } finally {
            setIsLoading(false)
        }

    }

    //when a user adds a new comment, we are calling the function again & again
    useEffect(() => {
        handleGetCurrentPostComments(postId)
    }, [isNewCommentAdded]);

    //to delete a post
    const handleDeletePost = async (postId) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.delete(`/api/v1/posts/deletepost/${postId}`)
            // console.log(res.data?.statusCode)
            if (res.data?.statusCode == 200) {
                toast.success("post deleted successfully")
            }
        } catch (error) {
            console.log("error while deleting a post", error)
        } finally {
            // location.reload();
            setIsLoading(false) // reloading the website after deleting a post , because after deleting a post , it still appear in the website ,until we refresh the page.
        }
    }

    return (
        <>
            <div className='w-[100vw] h-auto flex flex-col items-center p-2 text-[17px] lg:text-[20px] xl:text-[15px]'>

                <div className={`w-[100%] md:w-[80%] lg:w-[70vw] xl:w-[40vw] flex flex-col gap-3 p-2 border-1 border-gray-600 rounded-[5px] ${mode == 'light' ? 'bg-[#ffffff] ' : 'bg-[#0e0e0e] '}`}>

                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2 items-center'>
                            <img src={authorProfilePicture ? authorProfilePicture : "/defaultpfp.png"} alt=""
                                className='h-10 w-10 lg:h-12 lg:w-12 rounded-full cursor-pointer'
                                onClick={() => {
                                    navigate(`/user/${authorUserId}`);     
                                }}
                            />
                            <div className='flex flex-col '>
                                <p className='text-[18px]'>{authorName}</p>
                                <p className='text-[15px]'>{createdAt}</p>
                            </div>
                        </div>

                        {
                            currentUserId == authorUserId &&
                            <div className='relative w-35 flex flex-col' onClick={(e) => setIsMenuVisible((prev) => prev == false ? true : false)}>
                                <i className="fa-solid fa-ellipsis-vertical font-bold p-4 cursor-pointer self-end"></i>
                                {
                                    isMenuVisible &&
                                    <div className={`absolute top-10 border-1 flex flex-col gap-1 items-start justify-center rounded-md cursor-pointer
                                                 ${mode == 'light' ? 'bg-white border-gray-500 ' : 'bg-[#000] text-[#d3d3d3] border-gray-700'}`}>
                                        <p className={`flex gap-2 items-center p-2 w-full ${mode == 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-800'}`}
                                            onClick={() => navigate(`/editpost/${postId}`)}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            <span>Edit post</span>
                                        </p>
                                        <p className={`flex gap-2 items-center p-2 w-full ${mode == 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-800'}`}
                                            onClick={() => handleDeletePost(postId)}>
                                            <i className="fa-solid fa-trash"></i>
                                            <span>delete post</span>
                                        </p>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>{postDesc}</p>
                        {
                            postImage && <img src={postImage} alt="image" className='w-[100%] md:w-[100%]  lg:w-[70vw] xl:w-[40vw] rounded-[5px]' />
                        }
                        {
                            postVideo &&
                            <video 
                            src={postVideo} 
                            alt="video" 
                            className='w-[100%] md:w-[100%]  lg:w-[70vw] xl:w-[40vw] rounded-[5px]'
                            controls
                            autoPlay
                            muted
                            playsInline
                            ></video>
                            // <CustomVideoPlayer
                            //     videoSrc={postVideo}
                            // />
                        }
                    </div>

                    <div className='flex flex-row w-full h-12'>
                        <div className='w-[50%] flex items-center justify-center gap-2 pl-5 relative'>
                            <div className='absolute left-5'>
                                {isLiking && <Loader3 />}
                            </div>
                            <i className={`fa-solid fa-thumbs-up cursor-pointer like-icon ${isLiked && "text-white bg-blue-600 p-2 rounded-full"}`} onClick={() => likeAPost(postId)}></i>
                            {/* <p>{likesCount.length}</p> */}
                            <p>{postLikesData ? postLikesData.likesCount : likesCount.length}</p>
                        </div>
                        <div className='w-[50%] flex items-center justify-center gap-2 pl-5' onClick={() => setIsCommentSectionVisible((prev) => prev == false ? true : false)}>
                            <i className="fa-solid fa-comment cursor-pointer"></i>
                            <p>{allComments.length > 0 ? allComments.length : "0"}</p>
                        </div>
                    </div>

                    {
                        isCommentSectionVisiblem &&
                        <div className=' h-auto flex flex-col gap-3 commentDiv z-[5] mt-5'>
                            <div className={`flex flex-col gap-2 border-1 p-2 rounded-xl ${mode == 'light' ? 'border-gray-400 ' : 'border-gray-800'}`}>
                                <textarea name=""
                                    placeholder='Add a comment...'
                                    id=""
                                    required
                                    maxLength={400}
                                    className='w-full md:w-[100%] min-h-[40px] text-[15px] md:text-[16px] border-0 focus:outline-none resize-none overflow-y-hidden border-gray-500 placeholder-gray-500'
                                    value={commentText}
                                    onChange={(e) => {
                                        setCommentText(e.target.value);
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }
                                    }
                                ></textarea>
                                <div className='flex items-center justify-between'>
                                    <button className='h-8 w-25 text-[16px] text-gray-200 bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-xl cursor-pointer'
                                        onClick={() => handleComment(postId, commentText)}>Comment</button>
                                    <p className='self-end'>{commentText.length}/400</p>
                                </div>

                            </div>

                            <div className=''>
                                {
                                    allComments.length > 0 &&
                                    <p className='text-[18px] md:text-[19px] font-bold'>Comments</p>
                                }
                                <div className='w-full h-auto flex flex-col gap-3 items-center justify-center'>
                                    {
                                        allComments &&
                                        allComments.map((data, index) => (
                                            <div key={index} className={`relative flex flex-col border-1 p-2 rounded-2xl w-full   ${mode == 'light' ? 'border-gray-400 ' : 'border-gray-800'}`}>
                                                <div className='flex gap-3'>
                                                    <div className='min-w-10'>
                                                        <img src={data.user.profilePicture || "defaultpfp.png"}
                                                            alt=""
                                                            className='h-10 w-10 rounded-full cursor-pointer'
                                                            onClick={() => {
                                                                navigate(`/user/${data.user._id}`);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col gap-1'>
                                                        <div>
                                                            <p className='text-[17px]'>
                                                                {data.user.name}
                                                                <span className='text-[13px] ml-4 text-gray-600'>~{FormatTime(data.createdAt)}</span>
                                                            </p>
                                                            <p className='text-[14px] text-gray-600'>{data.user.userName}</p>
                                                        </div>
                                                        <p>{data.comment}</p>
                                                    </div>
                                                </div>

                                                {
                                                    currentUserId == data.user._id &&
                                                    <div className='absolute right-1 top-1  flex flex-col'>
                                                        <i
                                                            className="fa-solid fa-ellipsis-vertical font-bold p-2 cursor-pointer self-end"
                                                            onClick={() => setVisibleCommentMenu((prev) => prev === data._id ? null : data._id)}
                                                        ></i>
                                                        {
                                                            visibleCommentMenu === data._id && (
                                                                <div className={`border-1 w-40 absolute top-7 right-3 z-[30] flex items-center justify-center rounded-md cursor-pointer ${mode == 'light' ? 'bg-white border-gray-500 ' : 'bg-[#000] text-[#d3d3d3] border-gray-700'}`}>
                                                                    <p
                                                                        className={`flex gap-2 items-center hover:bg-gray-300 p-2 w-full  ${mode == 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-800'}`}
                                                                        onClick={() => {
                                                                            handleDeleteComment(data._id);
                                                                            setVisibleCommentMenu(null); // Close menu after deletion
                                                                        }}
                                                                    >
                                                                        <i className="fa-solid fa-trash text-[15px]"></i>
                                                                        <span className='text-[15px]'>delete comment</span>

                                                                    </p>
                                                                </div>

                                                            )
                                                        }
                                                    </div>
                                                }

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    }

                </div>
            </div>
            {
                isLoading && <Loader2 />
            }
        </>
    );
}

export default PostCard;











// props for commentCard, if I use the seperate component for it
// <CommentCard
//     key={index}
//     profilePicture={data.user.profilePicture}
//     userId={data.user._id}
//     name={data.user.name}
//     createdAt={data.createdAt}
//     userName={data.user.userName}
//     comment={data.comment}
//     commentId={data._id}
//     currentUserId={currentUserId}
//     setIsMenuVisible={setIsMenuVisible}
//     isMenuVisible={isMenuVisible}
//     handleDeleteComment={handleDeleteComment}
// />