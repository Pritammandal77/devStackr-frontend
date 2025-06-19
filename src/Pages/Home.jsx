import React, { useEffect } from 'react';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
import axios from "axios"

function Home() {

    const mode = useSelector((state) => state.mode.mode)

    return (
        <>
            <div className={`py-13 flex flex-col`}>
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </>
    );
}

export default Home;
