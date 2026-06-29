import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import Loader2 from '../components/Loaders/Loader2';
import axiosInstance from '../utils/axiosInstance';
import Input from '../components/Input';

function UpdateProfile() {
    const userProfileData = useSelector((state) => state.userData?.currentUserData?.data)
    const mode = useSelector((state) => state.mode.mode)
    const isLight = mode === 'light';

    const [isLoading, setIsLoading] = useState(false)

    const [profilePicture, setProfilePicture] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")
    const [about, setAbout] = useState("")
    const [githubLink, setGithubLink] = useState("")
    const [linkedinLink, setLinkedInLink] = useState("")
    const [portfolioLink, setPortfolioLink] = useState("")
    const [twitterLink, setTwitterLink] = useState("")

    const [skill, setSkill] = useState("")
    const [skills, setSkills] = useState([])

    const HandlesetAllSkill = (e, skill) => {
        e.preventDefault()
        if (!skill.trim()) return;
        setSkills((prev) => [...prev, skill])
        console.log(skills)
        setSkill("")
        console.log(skill)
    }

    const handleRemoveSkill = (e, skill, indexToRemove) => {
        e.preventDefault()
        setSkills((prev) => prev.filter((_, index) => index !== indexToRemove))
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
            setPortfolioLink(userProfileData.portfolioLink || "")
            setTwitterLink(userProfileData.twitterLink || "")
            setSkills(userProfileData.skills || [])
        }
    }, [userProfileData])

    const handleSaveUpdatedDataToDB = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("profilePicture", profilePicture);
        formData.append("coverImage", coverImage);
        formData.append("name", name);
        formData.append("userName", userName);
        formData.append("bio", bio.length > 10 ? bio : " ");
        formData.append("about", about.length > 10 ? about : " ");
        formData.append("githubLink", githubLink.length > 10 ? githubLink : " ");
        formData.append("linkedinLink", linkedinLink.length > 10 ? linkedinLink : " ");
        formData.append("portfolioLink", portfolioLink.length > 10 ? portfolioLink : " ");
        formData.append("twitterLink", twitterLink.length > 10 ? twitterLink : " ");
        formData.append("skills", JSON.stringify(skills));

        setIsLoading(true)
        try {
            console.log("updating profile")
            const res = await axiosInstance.post('/api/v1/users/updateUserAboutData', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            if (res.data.statusCode == 200) {
                toast.success('profile updated successfully!');
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Error creating post:', error.response?.data || error.message);
            setIsLoading(false)
            toast.error("error while updating profile")
        }
    }

    return (
        <>
            {isLoading && <Loader2 />}

            <div className={`w-[100vw] h-auto flex flex-col items-center gap-2 pt-15 p-3 pb-25 xl:w-[80vw] absolute right-0 transition-colors duration-300 min-h-screen ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#0B0F17]'
                }`}>
                <div className='w-[100%] md:w-[80%] lg:w-[55vw] flex flex-col gap-6 mt-4'>

                    {/* Cover Photo Segment */}
                    <div
                        className={`w-[100%] relative flex items-center justify-center h-50 md:h-60 lg:h-68 p-2 rounded-2xl bg-no-repeat bg-cover bg-center border shadow-sm ${isLight ? 'border-slate-200/80 shadow-slate-100' : 'border-slate-800/80 shadow-none'
                            }`}
                        style={{ backgroundImage: `url(${coverImage instanceof File ? URL.createObjectURL(coverImage) : coverImage ? coverImage : "/defaultbg.svg"})` }}
                    >
                        {/* <label className='absolute top-3 right-3 flex cursor-pointer transition-all active:scale-95'>
                            <i className={`fa-solid fa-pen text-sm flex items-center justify-center w-9 h-9 rounded-full shadow-md backdrop-blur-md transition-colors ${
                                isLight ? 'bg-white/90 text-slate-700 hover:bg-white' : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800'
                            }`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCoverImage(e.target.files[0])}
                                    className="hidden"
                                />
                            </i>
                        </label> */}

                        <label className='absolute top-2 right-2 cursor-pointer'>
                            <i className={`fa-solid fa-pen p-2 rounded-full ${isLight ? 'bg-white/90 text-slate-700 hover:bg-white' : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800'
                                } `} >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCoverImage(e.target.files[0])}
                                    className="hidden"
                                />
                            </i>
                        </label>

                        {/* Avatar Image Block */}
                        <div className='w-32 h-32 md:w-38 md:h-38 relative'>
                            <label className={`cursor-pointer absolute right-0.5 top-0.5 z-10 shadow-md transition-all active:scale-95 flex items-center justify-center w-8 h-8 rounded-full ${isLight ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]' : 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                                }`}>
                                <i className="fa-solid fa-pen text-[11px]"></i>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfilePicture(e.target.files[0])}
                                    className="hidden"
                                />
                            </label>
                            <img
                                src={profilePicture instanceof File ? URL.createObjectURL(profilePicture) : profilePicture ? profilePicture : "/defaultpfp.png"}
                                alt="Profile Display"
                                className={`w-32 h-32 md:w-38 md:h-38 rounded-full object-cover border-4 ring-2 ${isLight ? 'border-white ring-slate-100 shadow-md' : 'border-[#0B0F17] ring-slate-800/50 shadow-xl'
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Unified Form Frame */}
                    <div className={`w-[100%] p-5 md:p-8 rounded-2xl border transition-colors duration-300 ${isLight ? 'bg-white border-slate-200/80' : 'bg-[#0B0F17]/40 border-slate-800/80'
                        }`}>
                        <form className='flex flex-col gap-5.5' onSubmit={(e) => e.preventDefault()}>

                            <Input
                                label="name"
                                placeholder="Enter name"
                                value={name}
                                mode={mode}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                                label="username"
                                placeholder="Enter username"
                                value={userName}
                                mode={mode}
                                onChange={(e) => setUserName(e.target.value)}
                            />

                            <Input
                                label="bio"
                                isTextArea={true}
                                placeholder="Write a summary line..."
                                value={bio}
                                mode={mode}
                                onChange={(e) => setBio(e.target.value)}
                            />

                            <Input
                                label="github link"
                                placeholder="GitHub Profile URL"
                                value={githubLink}
                                mode={mode}
                                onChange={(e) => setGithubLink(e.target.value)}
                            />

                            <Input
                                label="linkedin link"
                                placeholder="LinkedIn Profile URL"
                                value={linkedinLink}
                                mode={mode}
                                onChange={(e) => setLinkedInLink(e.target.value)}
                            />

                            <Input
                                label="portfolio link"
                                placeholder="Portfolio Website URL"
                                value={portfolioLink}
                                mode={mode}
                                onChange={(e) => setPortfolioLink(e.target.value)}
                            />

                            <Input
                                label="twitter (x) link"
                                placeholder="Twitter/X Link"
                                value={twitterLink}
                                mode={mode}
                                onChange={(e) => setTwitterLink(e.target.value)}
                            />

                            <Input
                                label="about"
                                isTextArea={true}
                                placeholder="Tell your complete engineering background story..."
                                value={about}
                                mode={mode}
                                className="h-[160px]"
                                onChange={(e) => setAbout(e.target.value)}
                            />

                            {/* Skills Section */}
                            <div className='flex flex-col gap-2'>
                                <label className={`text-[13px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'
                                    }`}>
                                    skills
                                </label>
                                <div className='flex gap-3 items-center'>
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Enter skill"
                                            value={skill}
                                            mode={mode}
                                            onChange={(e) => setSkill(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className={`h-11 px-6 font-semibold tracking-wide rounded-xl cursor-pointer active:scale-95 transition-all text-sm ${isLight
                                                ? 'bg-slate-800 text-white hover:bg-slate-900'
                                                : 'bg-slate-200 text-slate-950 hover:bg-white'
                                            }`}
                                        onClick={(e) => HandlesetAllSkill(e, skill)}
                                    >
                                        Next
                                    </button>
                                </div>

                                {/* Skills Array Wrap */}
                                <div className='flex flex-wrap gap-2.5 mt-2'>
                                    {skills && skills.map((singleSkill, index) => (
                                        <div
                                            className={`pl-3.5 pr-2 py-1.5 rounded-xl flex items-center justify-center gap-2 border text-[14px] font-semibold transition-colors ${isLight
                                                    ? 'bg-slate-100 text-slate-800 border-slate-200/60'
                                                    : 'bg-slate-800/40 text-slate-200 border-slate-800/60'
                                                }`}
                                            key={index}
                                        >
                                            {singleSkill}
                                            <span
                                                className={`h-5 w-5 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-600' : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                                                    }`}
                                                onClick={(e) => handleRemoveSkill(e, singleSkill, index)}
                                            >
                                                <i className="fa-solid fa-xmark text-[11px]"></i>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main CTA Trigger */}
                            <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/20 mt-2">
                                <button
                                    className={`w-full md:w-auto px-7 py-3 font-semibold text-white rounded-xl cursor-pointer shadow-sm transition-all active:scale-[0.98] ${isLight ? 'bg-[#4F46E5] hover:bg-[#4338CA]' : 'bg-[#6366F1] hover:bg-[#4F46E5]'
                                        }`}
                                    onClick={(e) => handleSaveUpdatedDataToDB(e)}
                                >
                                    Save Changes
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
















// old design code (fully working)


// import React, { useEffect, useState } from 'react';
// import Button from '../components/Button';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { toast } from 'sonner';
// import Loader2 from '../components/Loaders/Loader2';
// import axiosInstance from '../utils/axiosInstance';

// function UpdateProfile() {

//     const userProfileData = useSelector((state) => state.userData.currentUserData.data)
//     const mode = useSelector((state) => state.mode.mode)

//     const [isLoading, setIsLoading] = useState(false)

//     //getting the previous data from api , and also setting new updated data
//     const [profilePicture, setProfilePicture] = useState("")
//     const [coverImage, setCoverImage] = useState("")
//     const [name, setName] = useState("")
//     const [userName, setUserName] = useState("")
//     const [bio, setBio] = useState("")
//     const [about, setAbout] = useState("")
//     const [githubLink, setGithubLink] = useState("")
//     const [linkedinLink, setLinkedInLink] = useState("")
//     const [portfolioLink, setPortfolioLink] = useState("")
//     const [twitterLink, setTwitterLink] = useState("")

//     //to store skills array
//     const [skill, setSkill] = useState("")
//     const [skills, setSkills] = useState([])

//     const HandlesetAllSkill = (e, skill) => {
//         e.preventDefault()
//         setSkills((prev) => [...prev, skill])
//         console.log(skills)
//         setSkill("")
//         console.log(skill)
//     }

//     const handleRemoveSkill = (e, skill,indexToRemove) => {
//         e.preventDefault()
//         setSkills((prev) => prev.filter((_, index) => index !== indexToRemove))
//     }

//     useEffect(() => {
//         if (userProfileData) {
//             setProfilePicture(userProfileData.profilePicture)
//             setCoverImage(userProfileData.coverImage)
//             setName(userProfileData.name || "")
//             setUserName(userProfileData.userName || "")
//             setBio(userProfileData.bio || "")
//             setAbout(userProfileData.about || "")
//             setGithubLink(userProfileData.githubLink || "")
//             setLinkedInLink(userProfileData.linkedinLink || "")
//             setPortfolioLink(userProfileData.portfolioLink || "")
//             setTwitterLink(userProfileData.twitterLink || "")
//             setSkills(userProfileData.skills || "")
//         }
//     }, [userProfileData])


//     const handleSaveUpdatedDataToDB = async (e) => {
//         e.preventDefault()
//         const formData = new FormData();
//         formData.append("profilePicture", profilePicture); 
//         formData.append("coverImage", coverImage);         
//         formData.append("name", name);
//         formData.append("userName", userName);
//         formData.append("bio", bio.length > 10 ? bio : " ");
//         formData.append("about", about.length > 10 ? about : " ");
//         formData.append("githubLink", githubLink.length > 10 ? githubLink : " ");
//         formData.append("linkedinLink", linkedinLink.length > 10 ? linkedinLink : " ");
//         formData.append("portfolioLink", portfolioLink.length > 10 ? portfolioLink : " ");
//         formData.append("twitterLink", twitterLink.length > 10 ? twitterLink : " ");   //without this condition , if I want to save to empty twitterLink field , it saves the previous link that I have saved.
//         formData.append("skills", JSON.stringify(skills)); // skills is an array

//         setIsLoading(true)
//         try {
//             console.log("updating profile")
//             const res = await axiosInstance.post('/api/v1/users/updateUserAboutData', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 withCredentials: true, // if you are using cookies/session
//             });
//             if (res.data.statusCode == 200) {
//                 toast.success('profile updated successfully!');
//                 setIsLoading(false)
//             }
//         } catch (error) {
//             console.error('Error creating post:', error.response?.data || error.message);
//             setIsLoading(false)
//             toast.error("error while updating profile")
//         }
//     }

//     return (
//         <>
//             {
//                 isLoading && <Loader2 />
//             }
//             <div className='w-[100vw] h-auto flex flex-col items-center gap-2 pt-15 p-3 pb-25 xl:w-[80vw] absolute right-0'>
//                 <div className='w-[100%] md:w-[80%] lg:w-[55vw] flex flex-col gap-5'>

//                     <div className='w-[100%] relative flex items-center justify-center h-50 md:h-60 lg:h-70 p-2 rounded-xl bg-no-repeat bg-cover bg-center '
//                         style={{ backgroundImage: `url(${coverImage instanceof File ? URL.createObjectURL(coverImage) : coverImage ? coverImage : "/defaultbg.svg"})` }}>
//                         <label className='absolute top-2 right-2 cursor-pointer'>
//                             <i className="fa-solid fa-pen bg-yellow-500 p-2 rounded-full " >
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={(e) => setCoverImage(e.target.files[0])}
//                                     className="hidden"
//                                 />
//                             </i>
//                         </label>

//                         <div className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 relative'>
//                             <label className="cursor-pointer p-2 bg-yellow-400 rounded-full absolute right-2 top-2 lg:right-5 lg:top-5">
//                                 <i className="fa-solid fa-pen"></i>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={(e) => setProfilePicture(e.target.files[0])}
//                                     className="hidden"
//                                 />
//                             </label>
//                             <img src={profilePicture instanceof File ? URL.createObjectURL(profilePicture) : profilePicture ? profilePicture : "/defaultpfp.png"}
//                                 alt=""
//                                 className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 rounded-full' />
//                         </div>
//                     </div>

//                     <div className='w-[100%]'>
//                         <form action="" className='flex flex-col gap-4'>
//                             <div className='flex flex-col '>
//                                 <label htmlFor="" className='text-[18px] lg:text-[20px]'>name</label>
//                                 <input type="text"
//                                     className='border-1 border-[#454141] rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
//                                     placeholder='enter name'
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-col '>
//                                 <label htmlFor="" className='text-[18px] lg:text-[20px]'>username</label>
//                                 <input type="text"
//                                     className='border-1 border-[#454141] rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
//                                     placeholder='enter name'
//                                     value={userName}
//                                     onChange={(e) => setUserName(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-col '>
//                                 <label htmlFor="" className='text-[18px] lg:text-[20px]'>bio</label>
//                                 <textarea name=""
//                                     placeholder='Enter bio'
//                                     id=""
//                                     className='border-1 border-[#454141] w-full md:w-[100%] h-[150px] text-[17px] md:text-[18px] resize-none overflow-y-auto p-3 rounded-md text-sm'
//                                     value={bio}
//                                     onChange={(e) => setBio(e.target.value)}
//                                 ></textarea>
//                             </div>
//                             <div className='flex flex-col '>
//                                 <label htmlFor="" className='text-[18px] lg:text-[20px]'>github link</label>
//                                 <input type="text"
//                                     className='border-1 border-[#454141] rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
//                                     placeholder='enter github link'
//                                     value={githubLink}
//                                     onChange={(e) => setGithubLink(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-col '>
//                                 <label htmlFor="" className='text-[18px] lg:text-[20px]'>linkedin link</label>
//                                 <input type="text"
//                                     className='border-1 border-[#454141] rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
//                                     placeholder='enter linkedin link'
//                                     value={linkedinLink}
//                                     onChange={(e) => setLinkedInLink(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-col '>
//                                 <label htmlFor="" className='text-[18px] lg:text-[20px]'>Porfolio link</label>
//                                 <input type="text"
//                                     className='border-1 border-[#454141] rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
//                                     placeholder='enter portfolio link'
//                                     value={portfolioLink}
//                                     onChange={(e) => setPortfolioLink(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-col '>
//                                 <label htmlFor="" className='text-[18px] lg:text-[20px]'>Twitter (X) link</label>
//                                 <input type="text"
//                                     className='border-1 border-[#454141] rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
//                                     placeholder='enter twitter link'
//                                     value={twitterLink}
//                                     onChange={(e) => setTwitterLink(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-col '>
//                                 <label htmlFor="" className='text-[18px] lg:text-[20px]'>About</label>
//                                 <textarea name=""
//                                     placeholder='Enter about'
//                                     id=""
//                                     className='border-1 border-[#454141] w-full md:w-[100%] h-[200px] text-[17px] md:text-[18px] resize-none overflow-y-auto p-3 rounded-md text-sm'
//                                     value={about}
//                                     onChange={(e) => setAbout(e.target.value)}
//                                 ></textarea>
//                             </div>
//                             <div className='flex flex-col '>
//                                 <label htmlFor="" className='text-[18px] lg:text-[20px]'>skills</label>
//                                 <div className='flex gap-5'>
//                                     <input type="text"
//                                         className='border-1 border-[#454141] rounded-[10px] text-[17px] md:text-[18px] px-2 py-1 '
//                                         placeholder='enter skills'
//                                         value={skill}
//                                         onChange={(e) => setSkill(e.target.value)}
//                                     />
//                                     <button className='h-10 w-30 text-[20px] bg-yellow-500 hover:bg-yellow-600 flex text-black items-center justify-center rounded-2xl cursor-pointer' onClick={(e) => HandlesetAllSkill(e, skill)}>Next</button>
//                                 </div>
//                                 <div className='flex flex-wrap gap-3 mt-5'>
//                                     {
//                                         skills && skills.map((skill, index) => (
//                                             <div className='px-2 py-1 border-1 border-gray-600 rounded-xl flex items-center justify-center gap-2' key={index}>
//                                                 {skill}
//                                                 <span className={`h-5 w-5 flex items-center justify-center rounded-full cursor-pointer ${mode == 'light' ? 'bg-gray-400 ' : 'bg-[#373737]'}`} onClick={(e) => handleRemoveSkill(e, skill, index)}>
//                                                     <i className="fa-solid fa-xmark text-[15px]"></i>
//                                                 </span>
//                                             </div>
//                                         ))
//                                     }     
//                                 </div>
//                             </div>
//                             <div>

//                                 <button className='h-12 w-40 text-[22px] font-semibold text-black bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-2xl cursor-pointer'
//                                     onClick={(e) => handleSaveUpdatedDataToDB(e)}>
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default UpdateProfile;


