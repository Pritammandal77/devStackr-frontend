import React from 'react';
import PostCard from '../../components/PostCard';
import { useSelector } from 'react-redux';

function Home() {

    const mode = useSelector((state) => state.mode.mode)

    return (
        <>
            <div className={`py-13 flex flex-col
                 ${mode == 'light' ? 'bg-[#ffffff]' : 'bg-[#000] text-[#d3d3d3]'}`}>
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </>
    );
}

export default Home;
