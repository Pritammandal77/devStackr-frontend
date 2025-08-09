import React from 'react';
import { useSelector } from 'react-redux';

function ProfileSkeleton() {

    const mode = useSelector((state) => state.mode.mode)


    return (
        <>
            <div className="relative flex w-[100%] animate-pulse gap-2 p-2 pl-2">
                <div className={`h-12 w-12 rounded-full ${mode == 'light' ? 'bg-slate-400 ' : 'bg-[#292828] '}`}></div>
                <div className="flex-1">
                    <div className={`mb-1 h-5 w-3/5 rounded-lg text-lg ${mode == 'light' ? 'bg-slate-400 ' : 'bg-[#292828] '}`}></div>
                    <div className={`h-5 w-[95%] rounded-lg text-sm ${mode == 'light' ? 'bg-slate-400 ' : 'bg-[#292828] '}`}></div>
                </div>
                {/* <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div> */}
            </div>
        </>
    );
}

export default ProfileSkeleton;
