import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { getPostById } from '../utils/PostsAPI';
import { useEffect } from 'react';
import { useState } from 'react';

function EditPost() {
    const postId = useParams()

    console.log(postId.id)

    const getpost = async (postId) => {
        console.log("postId",typeof postId.id)
        const post = await getPostById(postId.id)
        console.log("post at edit post page", post && post)
    }

    useEffect(() => {
        getpost(postId)
    }, []);

    return (
        <>
            <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0 justify-center items-center'>
                <div className='w-[90%] lg:w-[80%] h-[80vh] flex flex-col items-center justify-center '>
                    <div className='flex flex-col gap-2 w-[100%]'>
                        <label htmlFor="" className='text-[26px] md:text-[30px]'>Edit post description</label>
                        <textarea name=""
                            placeholder='Enter the description'
                            id=""
                            className='border-1 w-full md:w-[100%] h-[250px] resize-none overflow-y-auto p-3 rounded-md text-sm'
                            maxLength={800}
                        // onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <p className='self-end'>
                            {/* {description.length} */}
                            /800</p>
                    </div>
                    <div className='self-end'>
                        <Button text={"Edit post"} />
                    </div>
                </div>

            </div>
        </>
    );
}

export default EditPost;
