import React from 'react';
import FollowButton from './followButton';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader3 from './Loaders/Loader3';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function PostCard({ authorUserId, authorName, authorProfilePicture, createdAt, postDesc, postImage, postId, likesCount, threeDot, followBtn, isAlreadyLiked }) {

    const navigate = useNavigate()

    const [postLikesData, setPostLikesData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //storing the value isPostLiked
    const [isLiked, setIsLiked] = useState(isAlreadyLiked);

    const likeAPost = async (postId) => {
        setIsLoading(true)
        try {
            const response = await axios.put("/api/v1/posts/likes", { postId: postId })
            console.log("like data at post card", response.data.data)
            setPostLikesData(response.data.data)
            if (isLiked == true) {
                setIsLiked(false)
            } else {
                setIsLiked(true)
            }
        } catch (error) {
            console.log("Failed to like the posts", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className='w-[100vw] h-auto flex flex-col items-center p-2'>

                <div className='w-[100%] md:w-[80%] lg:w-[40vw] flex flex-col gap-3 p-2 border-1 border-gray-600 rounded-[5px]'>

                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2 items-center'>
                            <img src={authorProfilePicture} alt=""
                                className='h-10 w-10 rounded-full cursor-pointer'
                                onClick={() => {
                                    navigate(`/user/${authorUserId}`);     // Navigate
                                }}
                            />
                            <div className='flex flex-col '>
                                <p className='text-[18px]'>{authorName}</p>
                                <p className='text-[15px]'>{createdAt}</p>
                            </div>
                        </div>

                        {threeDot && <i className="fa-solid fa-ellipsis-vertical font-bold p-4 cursor-pointer"></i>}
                        {followBtn && <FollowButton />}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>{postDesc}</p>
                        {
                            postImage && <img src={postImage} alt="" className='w-[100%] md:w-[100%] lg:w-[45vw] rounded-[5px]' />
                        }
                    </div>

                    <div className='flex flex-row w-full'>
                        <div className='w-[50%] flex items-center justify-center gap-2 pl-5 relative'>
                            <div className='absolute left-5'>
                                {isLoading && <Loader3 />}
                            </div>
                            <i className={`fa-solid fa-thumbs-up cursor-pointer like-icon ${isLiked && "text-white bg-blue-600 p-2 rounded-full"}`} onClick={() => likeAPost(postId)}></i>
                            {/* <p>{likesCount.length}</p> */}
                            <p>{postLikesData ? postLikesData.likesCount : likesCount.length}</p>
                        </div>
                        <div className='w-[50%] flex items-center justify-center gap-2 pl-5 '>
                            <i className="fa-solid fa-comment"></i>
                            <p>231</p>
                        </div>
                    </div>
                    <div className=''>
                        <hr className='w-[80%] text-gray-300 self-center mt-2 mx-auto' />
                        <div className='flex flex-col gap-2'>
                            <textarea name=""
                                placeholder='Add a comment...'
                                id=""
                                className='mt-4 border-1 w-full md:w-[100%] h-[100px] text-[17px] md:text-[18px] resize-none overflow-y-auto p-3 rounded-md text-sm border-gray-500'
                            ></textarea>
                            <button className='h-8 w-25 text-[16px] text-gray-200 bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-xl cursor-pointer'>Comment</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default PostCard;
