import React from 'react';
import { useSelector } from 'react-redux';

function Loader3() {

    const mode = useSelector((state) => state.mode.mode)

    return (
        <div className={`spinner3  ${mode == 'light' ? 'after:bg-[#fff] before:bg-[linear-gradient(0deg,_#0f93ff_0%,_#ffffff_50%)]' : 'after:bg-[#0D1117] before:bg-[linear-gradient(0deg,_#0f93ff_0%,_#0D1117_50%)]'}`}></div>
    );
}

export default Loader3;
