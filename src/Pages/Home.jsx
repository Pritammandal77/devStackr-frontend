import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
import axios from "axios"
import Loader2 from '../components/Loaders/Loader2';
import { FormatTime } from '../utils/FormatTime';
import axiosInstance from '../utils/axiosInstance';

function Home() {

    const [isLoading, setIsLoading] = useState(false)

    const mode = useSelector((state) => state.mode.mode)
    const [allPosts, setALLPosts] = useState([])

    const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id)

    const getAllPosts = async () => {
        setIsLoading(true)
        try {
            const posts = await axiosInstance.get("/api/v1/posts/allposts", {
                withCredentials: true
            })
            setALLPosts(posts.data.data)
            console.log(posts.data.data)
            if (posts.data.data) {
                setIsLoading(false)
            }
        } catch (error) {
            console.log("Failed to fetched all posts", error)
        }
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <>
            {
                isLoading && <Loader2 />
            }
            <div className={`py-13 flex flex-col  xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center`}>
                {
                    allPosts ? (
                        allPosts.map((data, index) => (
                            <PostCard key={index}
                                authorUserId={data.author._id}
                                authorName={data.author.name}
                                authorProfilePicture={data.author.profilePicture}
                                createdAt={FormatTime(data.createdAt)}
                                postDesc={data.description}
                                postImage={data.image}
                                postVideo={data.video}
                                postId={data._id}
                                likesCount={data.likes}
                                followBtn="true"
                                isAlreadyLiked={data.likes.includes(currentUserId) && true}
                            />
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
