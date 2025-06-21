import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
import axios from "axios"
import Loader2 from '../components/Loaders/Loader2';

function Home() {

    const mode = useSelector((state) => state.mode.mode)
    const [allPosts, setALLPosts] = useState([])
    const getAllPosts = async () => {
        try {
            const posts = await axios.get("/api/v1/posts/allposts", {
                withCredentials: true
            })
            console.log("allposts", posts.data.data)
            setALLPosts(posts.data.data)
        } catch (error) {
            console.log("Failed to fetched all posts", error)
        }
    }

    //it converts mongoDB deafult time format to formatted time format
    const timeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diff = Math.floor((now - past) / 1000); // difference in seconds

        if (diff < 60) return `${diff} sec ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)} day ago`;

        return past.toLocaleDateString('en-IN'); // fallback
    }


    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <>
            <div className={`py-13 flex flex-col`}>
                {
                    allPosts ? (
                        allPosts.map((data, index) => (
                            <PostCard key={index}
                                authorName={data.author.name}
                                authorProfilePicture={data.author.profilePicture}
                                createdAt={timeAgo(data.createdAt)}
                                postDesc={data.description}
                                postImage={data.image} />
                        ))
                    ) : (
                        <Loader2 />
                    )
                }
            </div>
        </>
    );
}

export default Home;
