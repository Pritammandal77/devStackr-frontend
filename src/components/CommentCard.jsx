import React from 'react';
import { FormatTime } from '../utils/FormatTime';

function CommentCard({index, profilePicture, userId, name, createdAt, userName, comment, currentUserId, setIsMenuVisible, isMenuVisible, handleDeleteComment, commentId}) {
    return (
        <div key={index} className='relative flex flex-col border-1 border-gray-500 p-2 rounded-2xl w-full'>
            <div className='flex gap-3'>
                <div className='min-w-10'>
                    <img src={profilePicture}
                        alt=""
                        className='h-10 w-10 rounded-full cursor-pointer'
                        onClick={() => {
                            navigate(`/user/${userId}`);
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <div>
                        <p className='text-[17px]'>
                            {name}
                            <span className='text-[13px] ml-4 text-gray-600'>~{FormatTime(createdAt)}</span>
                        </p>
                        <p className='text-[14px] text-gray-600'>{userName}</p>
                    </div>
                    <p>{comment}</p>
                </div>
            </div>

            {
                currentUserId == userId &&
                <div className='absolute right-1 top-1 w-35 flex flex-col' onClick={(e) => setIsMenuVisible((prev) => prev == false ? true : false)}>
                    <i className="fa-solid fa-ellipsis-vertical font-bold p-2 cursor-pointer self-end"></i>
                    {
                        isMenuVisible &&
                        <p className='absolute top-7 px-1 border-1 border-gray-500 flex items-center justify-center rounded-md cursor-pointer hover:text-blue-400'
                            onClick={() => handleDeleteComment(commentId)}>
                            delete comment
                        </p>
                    }
                </div>
            }


        </div>
    );
}

export default CommentCard;
