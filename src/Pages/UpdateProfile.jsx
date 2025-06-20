import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UpdateProfile() {

    const userProfileData = useSelector((state) => state.userData.userData.data)

    console.log("User data at update page", userProfileData)

    //getting the previous data from api , and also setting new updated data
    const [profilePicture, setProfilePicture] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")
    const [about, setAbout] = useState("")
    const [githubLink, setGithubLink] = useState("")
    const [linkedinLink, setLinkedInLink] = useState("")

    //to store skills array
    const [skill, setSkill] = useState("")
    const [skills, setSkills] = useState([])

    const HandlesetAllSkill = (e, skill) => {
        e.preventDefault()
        setSkills((prev) => [...prev, skill])
        console.log(skills)
        setSkill("")
    }

    useEffect(() => {
        if (userProfileData) {
            setProfilePicture(userProfileData.profilePicture)
            setCoverImage(userProfileData.coverImage)
            setName(userProfileData.name || "")
            setUserName(userProfileData.userName || "")
            setBio(userProfileData.bio || "")
            setAbout(userProfileData.about || "")
            setGithubLink(userProfileData.githubLink || "")
            setLinkedInLink(userProfileData.linkedinLink || "")
            setSkills(userProfileData.skills || "")
        }
    }, [userProfileData])


    const handleSaveUpdatedDataToDB = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("profilePicture", profilePicture); // if it's a File
        formData.append("coverImage", coverImage);         // if it's a File
        formData.append("name", name);
        formData.append("userName", userName);
        formData.append("bio", bio);
        formData.append("about", about);
        formData.append("githubLink", githubLink);
        formData.append("linkedinLink", linkedinLink);
        formData.append("skills", JSON.stringify(skills)); // skills is an array
        try {
            console.log("updating profile")
            const res = await axios.post('/api/v1/users/updateUserAboutData', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // if you are using cookies/session
            });
            console.log('Data updated:', res.data);
        } catch (error) {
            console.error('Error creating post:', error.response?.data || error.message);
        }
    }


    return (
        <>
            <div className='w-[100vw] h-auto flex flex-col items-center gap-2 pt-15 p-3 pb-25'>
                <div className='w-[100%] md:w-[80%] lg:w-[60vw] flex flex-col gap-5'>

                    <div className='w-[100%] relative flex items-center justify-center h-50 md:h-60 lg:h-70 p-2 rounded-xl bg-amber-300 bg-no-repeat bg-cover bg-center '
                        style={{ backgroundImage: `url(${coverImage instanceof File ? URL.createObjectURL(coverImage) : coverImage})` }}>
                        <label className='absolute top-2 right-2 cursor-pointer'>
                            <i className="fa-solid fa-pen bg-yellow-500 p-2 rounded-full " >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCoverImage(e.target.files[0])}
                                    className="hidden"
                                />
                            </i>
                        </label>

                        <div className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 relative'>
                            <label className="cursor-pointer p-2 bg-yellow-400 rounded-full absolute right-2 top-2 lg:right-5 lg:top-5">
                                <i className="fa-solid fa-pen"></i>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfilePicture(e.target.files[0])}
                                    className="hidden"
                                />
                            </label>
                            <img src={profilePicture instanceof File ? URL.createObjectURL(profilePicture) : profilePicture}
                                alt=""
                                className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 rounded-full' />
                        </div>
                    </div>

                    <div className='w-[100%]'>
                        <form action="" className='flex flex-col gap-4'>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>name</label>
                                <input type="text"
                                    className='border-1 rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
                                    placeholder='enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>username</label>
                                <input type="text"
                                    className='border-1 rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
                                    placeholder='enter name'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>bio</label>
                                <textarea name=""
                                    placeholder='Enter bio'
                                    id=""
                                    className='border-1 w-full md:w-[100%] h-[150px] text-[17px] md:text-[18px] resize-none overflow-y-auto p-3 rounded-md text-sm'
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>github link</label>
                                <input type="text"
                                    className='border-1 rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
                                    placeholder='enter github link'
                                    value={githubLink}
                                    onChange={(e) => setGithubLink(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>linkedin link</label>
                                <input type="text"
                                    className='border-1 rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
                                    placeholder='enter linkedin link'
                                    value={linkedinLink}
                                    onChange={(e) => setLinkedInLink(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>About</label>
                                <textarea name=""
                                    placeholder='Enter about'
                                    id=""
                                    className='border-1 w-full md:w-[100%] h-[200px] text-[17px] md:text-[18px] resize-none overflow-y-auto p-3 rounded-md text-sm'
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>skills</label>
                                <div className='flex gap-5'>
                                    <input type="text"
                                        className='border-1 rounded-[10px] text-[17px] md:text-[18px] px-2 py-1 '
                                        placeholder='enter skills'
                                        value={skill}
                                        onChange={(e) => setSkill(e.target.value)}
                                    />
                                    <button className='h-10 w-30 text-[20px] bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center rounded-2xl cursor-pointer' onClick={(e) => HandlesetAllSkill(e, skill)}>Next</button>
                                </div>
                                <div className='flex flex-wrap gap-3 mt-5'>
                                    {
                                        skills && skills.map((skill, index) => (
                                            <span className='px-2 py-1 border-1 border-gray-600 rounded-xl' key={index}>{skill}</span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>

                                <button className='h-12 w-40 text-[20px] bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-2xl cursor-pointer'
                                    onClick={(e) => handleSaveUpdatedDataToDB(e)}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateProfile;


