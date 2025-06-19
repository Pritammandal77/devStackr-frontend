import React, { useState } from 'react';
import Button from '../components/Button';

function CreatePost() {

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("")
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file)
    setImagePreview(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  console.log(description)

  return (
    <>
      <div className='w-[100vw] h-auto flex flex-col items-center gap-2 p-3 py-15 '>
        <div className='w-[100%] md:w-[80%] lg:w-[60vw] p-2 mt-10'>
          <form action="" className='flex flex-col gap-5 md:p-2'>

            <div className='flex flex-col gap-2'>
              <label htmlFor="" className='text-[26px] md:text-[30px]'>Description</label>
              <textarea name="" 
              placeholder='Enter the description' 
              id="" 
              className='border-1 w-full md:w-[100%] h-[250px] resize-none overflow-y-auto p-3 rounded-md text-sm'
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
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

              {/* Video Upload */}
              <div>
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
              </div>

            </div>

            <Button text="create post" />
          </form>
        </div>

      </div>
    </>
  );
}

export default CreatePost;
