import React from 'react';
import { useSelector } from 'react-redux';

function Loader2() {

    const mode = useSelector((state) => state.mode.mode)

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-opacity-80 z-[200]"
            role="status"
            aria-live="polite"
        >
            <div>
                <div className="loader2"></div>
            </div>
        </div>
    );
}

export default Loader2;
