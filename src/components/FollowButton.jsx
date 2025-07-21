import React from 'react';

function FollowButton({ onClick, text }) {
    return (
        <button className={`${text == "follow" ? "bg-blue-400" : "bg-gray-600 text-white"} h-[35px] w-[45vw] px-3 py-2 rounded-[10px] text-[19px] cursor-pointer flex flex-row items-center justify-center gap-2`} onClick={onClick}>
            {
                text == "follow" ?
                    <i className="fa-solid fa-user-plus"></i>
                    :
                    <i className="fa-solid fa-heart-crack"></i>
            }
            {text}
        </button>
    );
}

export default FollowButton;
