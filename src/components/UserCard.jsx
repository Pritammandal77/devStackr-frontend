import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserCard({ profilePicture, name, userName, bio, id, isFollowBtnVisible }) {

    const navigate = useNavigate()
    const currentUserData = useSelector((state) => state.userData?.currentUserData.data)

    return (
        <div
            onClick={() => {
                navigate(`/user/${id}`);
            }}
            className='w-[90%] md:w-[80%] lg:w-[55vw] xl:w-[45vw] h-25 flex items-center gap-2 border-1 border-gray-600 rounded-2xl relative px-2'>
            <div className='h-25 flex items-center justify-center w-[25%] md:w-[20%] lg:w-[20%] xl:w-[15%]'>
                <img src={profilePicture ? profilePicture : "/defaultpfp.png"}
                    alt="sorry , the image can't be loaded"
                    className='h-19 w-19 md:h-20 md:w-20 rounded-full'
                />
            </div>
            <div className='flex flex-col justify-between w-[60%] lg:w-[35%]'>
                <p className='text-[18px] font-semibold'>{name} <span>{currentUserData._id == id && "(Me)"}</span></p>
                <p className='text-[16px]'>{userName}</p>
            </div>
            <div className='hidden lg:flex flex-col h-[100%] w-[35%] truncate justify-center '>
                <p className='text-[16px] hidden lg:inline h-10 truncate p-2 text-left' >{bio}</p>
                {
                    isFollowBtnVisible && <FollowButton />
                }

            </div>
            {
                isFollowBtnVisible && <div className='lg:hidden absolute top-2 right-2 bg-blue-400 h-8 w-8 flex items-center justify-center rounded-full'>
                    <i className="fa-solid fa-user-plus text-black"></i>
                </div>
            }
        </div>
    );
}

export default UserCard;
