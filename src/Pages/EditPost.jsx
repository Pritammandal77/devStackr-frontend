import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { editPost, getPostById } from '../utils/PostsAPI';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import Loader2 from '../components/Loaders/Loader2';

function EditPost() {
    const postId = useParams()

    const [previosPostData, setPreviosPostData] = useState([])
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const getpost = async (postId) => {
        const post = await getPostById(postId.id)
        setPreviosPostData(post.data.data[0])
        setDescription(post?.data?.data[0]?.description)
    }

    useEffect(() => {
        getpost(postId)
    }, []);

    const handleEditPost = async (postId, description) => {
        try {
            setIsLoading(true)
            const response = await editPost(postId, description)
            if (response.data.statusCode == 200) {
                toast.success("post updated successfully")
                navigate("/home")
            }
        } catch (error) {
            console.log("error while editing a post")
        }finally{
            setIsLoading(false)
        }

    }

    return (
        <>
            <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0 justify-center items-center'>
                <div className='w-[90%] lg:w-[80%] h-[80vh] flex flex-col gap-2 items-center justify-center '>
                    <div className='flex flex-col gap-2 w-[100%]'>
                        <label htmlFor="" className='text-[26px] md:text-[30px]'>Edit post description</label>
                        <textarea name=""
                            placeholder='Enter the description'
                            id=""
                            className='border-1 w-full md:w-[100%] h-[250px] text-[17px] resize-none overflow-y-auto p-3 rounded-md text-sm'
                            maxLength={800}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <p className='self-end'>
                            {previosPostData ? previosPostData?.description?.length : "0"}
                            /800</p>
                    </div>
                    <div className='self-end'>
                        <Button
                            text={"Edit post"}
                            onClick={() => handleEditPost(previosPostData._id, description)}
                        />
                    </div>
                </div>

            </div>
            {
                isLoading && <Loader2/>
            }
        </>
    );
}

export default EditPost;
