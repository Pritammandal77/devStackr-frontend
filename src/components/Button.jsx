import React from 'react';

function Button({ onClick, text }) {
    return (
        <div className='h-10 w-30 lg:h-12 lg:w-35 font-semibold text-[18px] lg:text-[20px] bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-2xl cursor-pointer' onClick={onClick}>
            {text}
        </div>
    );
}

export default Button;
