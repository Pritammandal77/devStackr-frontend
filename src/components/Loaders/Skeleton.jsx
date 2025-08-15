import React from 'react';
import { useSelector } from 'react-redux';
import './Loading.css'

function Skeleton() {

    const mode = useSelector((state) => state.mode.mode)

    return (
        <>
            <div className={`card ${mode == 'light' ? 'bg-[#ffffff] ' : 'bg-[#0e0e0e] '}`}>
                <div className={`card__skeleton card__description h-40 md:h-45 xl:h-60 
                   ${mode == 'light' ? 'bg-[linear-gradient(90deg,#ccc_0px,rgba(229,229,229,0.9)_40px,#ccc_80px)] ' : 'bg-[linear-gradient(90deg,#444_0px,rgba(82,82,82,0.9)_40px,#444_80px)]'} `}>         </div>
                <div className={`card__skeleton card__title ${mode == 'light' ? 'bg-[linear-gradient(90deg,#ccc_0px,rgba(229,229,229,0.9)_40px,#ccc_80px)] ' : 'bg-[linear-gradient(90deg,#444_0px,rgba(82,82,82,0.9)_40px,#444_80px)]'} `}></div>
                <div className={`card__skeleton card__title ${mode == 'light' ? 'bg-[linear-gradient(90deg,#ccc_0px,rgba(229,229,229,0.9)_40px,#ccc_80px)] ' : 'bg-[linear-gradient(90deg,#444_0px,rgba(82,82,82,0.9)_40px,#444_80px)]'} `}></div>
            </div>
        </>
    );
}

export default Skeleton;
