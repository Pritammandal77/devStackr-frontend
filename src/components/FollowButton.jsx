import React from 'react';

function FollowButton({onClick}) {
    return (
        <button className='bg-blue-500 text-white h-[35px] w-[100px] px-3 py-2 rounded-[10px] text-[19px] cursor-pointer flex flex-row items-center justify-center gap-2' onClick={onClick}>
            <i className="fa-solid fa-user-plus text-[18px]"></i>
            follow
        </button>
    );
}

export default FollowButton;
