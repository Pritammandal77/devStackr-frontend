import React from 'react';

function Button(props) {
    return (
        <div className='h-12 w-40 text-[20px] bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-2xl cursor-pointer'>
            {props.text}
        </div>
    );
}

export default Button;
