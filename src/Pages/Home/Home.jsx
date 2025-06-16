import React from 'react';
import PostCard from '../../components/PostCard';

function Home() {
    return (
        <>
            <div className='py-13 flex flex-col'>
                <PostCard />
                <PostCard />
            </div>
        </>
    );
}

export default Home;
