import React from 'react';
import './Loading.css';

function Loader1() {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-opacity-80 z-[10]"
            role="status"
            aria-live="polite"
        >
            <div className="loader">
                <span>&lt;</span>
                <span>LOADING</span>
                <span>/&gt;</span>
            </div>
        </div>
    );
}

export default Loader1;
