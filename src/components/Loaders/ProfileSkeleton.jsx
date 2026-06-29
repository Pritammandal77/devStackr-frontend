import React from 'react';
import { useSelector } from 'react-redux';

function ProfileSkeleton() {
    const mode = useSelector((state) => state.mode.mode);
    const isLight = mode === 'light';

    const pulseBgClasses = isLight 
        ? 'bg-slate-200' 
        : 'bg-slate-800/80';

    return (
        <>
            <div className="relative flex w-full animate-pulse gap-3 p-3">
                <div className={`h-12 w-12 rounded-full shrink-0 ${pulseBgClasses}`}></div>
                
                <div className="flex-1 space-y-2.5 py-1">
                    <div className={`h-4 w-2/5 rounded-md ${pulseBgClasses}`}></div>
                    <div className={`h-3 w-[90%] rounded-md ${pulseBgClasses}`}></div>
                </div>
            </div>
        </>
    );
}

export default ProfileSkeleton;