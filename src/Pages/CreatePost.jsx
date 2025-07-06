import React, { useState } from 'react';
import Button from '../components/Button';
import axios from 'axios';
import Loader2 from '../components/Loaders/Loader2';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function CreatePost() {

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("")
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };


  //used to create
  const createNewPost = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('description', description); // state variable
    if (image) formData.append('image', image);  // File object
    if (video) formData.append('video', video);  // File object

    setIsLoading(true)

    try {
      console.log("Creating post")
      const res = await axiosInstance.post('/api/v1/posts/createpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // if you are using cookies/session
      });

      console.log('Post Created:', res.data.statusCode);
      if (res.data.statusCode == 201) {
        setIsLoading(false)
        toast.success('Post created successfully!');
        navigate("/home")
      }
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
    }
  }


  return (
    <>
      {
        isLoading && <Loader2 />
      }
      <div className='w-[100vw] h-auto flex flex-col items-center gap-2 p-3 py-15 xl:w-[80vw] absolute right-0' >
        <div className='w-[100%] md:w-[80%] lg:w-[60vw] p-2 mt-10'>
          <form action="" className='flex flex-col gap-5 md:p-2'>

            <div className='flex flex-col gap-2'>
              <label htmlFor="" className='text-[26px] md:text-[30px]'>Description</label>
              <textarea name=""
                placeholder='Enter the description'
                id=""
                className='border-1 w-full md:w-[100%] h-[250px] resize-none overflow-y-auto p-3 rounded-md text-sm'
                value={description}
                maxLength={800}
                onChange={(e) => setDescription(e.target.value)}></textarea>
              <p className='self-end'>{description.length}/800</p>
            </div>

            <div className='flex gap-5'>
              <div>
                <label className="cursor-pointer px-2 py-1 bg-yellow-200 text-black rounded-lg hover:bg-blue-700 transition duration-200 inline-block">
                  <i className="fa-solid fa-image"></i>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-60 h-auto rounded-lg shadow"
                  />
                )}
              </div>

              {/* this is the input field to upload video, I have commented it temporarily , bocz to upload a video on server it takes many time , thats why */}
              {/* <div>
                <label className="cursor-pointer px-2 py-1 bg-red-400 text-black rounded-lg hover:bg-blue-700 transition duration-200 inline-block">
                  <i className="fa-solid fa-video"></i>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                </label>
                {videoPreview && (
                  <video
                    src={videoPreview}
                    controls
                    className="mt-4 w-80 rounded-lg shadow"
                  />
                )}
              </div> */}

            </div>

            <button className='h-12 w-40 text-[20px] bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-2xl cursor-pointer'
              onClick={(e) => createNewPost(e)}>
              create post
            </button>
          </form>
        </div>

      </div>
    </>
  );
}

export default CreatePost;
