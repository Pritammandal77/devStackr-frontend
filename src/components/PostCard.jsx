import React from 'react';
import FollowButton from './followButton';

function PostCard({authorName, authorProfilePicture,createdAt, postDesc, postImage}) {

    console.log("name at card component", authorName )

    return (
        <>
            <div className='w-[100vw] h-auto flex flex-col items-center p-2'>

                <div className='w-[100%] md:w-[80%] lg:w-[45vw] flex flex-col gap-3 p-2 border-1 border-gray-600 rounded-[5px]'>

                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2 items-center'>
                            <img src={authorProfilePicture} alt=""
                                className='h-10 w-10 rounded-full'
                            />
                            <div className='flex flex-col '>
                                <p className='text-[20px]'>{authorName}</p>
                                <p className='text-[16px]'>{createdAt}</p>
                            </div>
                        </div>
                        <FollowButton />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>{postDesc}</p>
                        <img src={postImage} alt=""
                            className='w-[100%] md:w-[100%] lg:w-[45vw] rounded-[5px]' />
                    </div>

                    <div className='flex flex-row w-full'>
                        <div className='w-[50%] flex items-center justify-center gap-2 pl-5 '>
                            <i className="fa-solid fa-thumbs-up"></i>
                            <p>345</p>
                        </div>
                        <div className='w-[50%] flex items-center justify-center gap-2 pl-5 '>
                            <i className="fa-solid fa-comment"></i>
                            <p>231</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostCard;
