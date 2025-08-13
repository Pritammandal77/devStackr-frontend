import React from 'react';
import Loader1 from './Loaders/Loader1';

function FollowButton({ onClick, text, isLoading }) {
    return (
        <button className={`${text == "follow" ? "bg-blue-400 text-black" : "bg-gray-600 text-white"} h-[35px] w-[45vw] md:w-auto px-3 py-2 rounded-[10px] text-[19px] cursor-pointer flex flex-row items-center justify-center gap-2`} onClick={onClick}>
            {
                isLoading &&
                <Loader1 />
            }
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
