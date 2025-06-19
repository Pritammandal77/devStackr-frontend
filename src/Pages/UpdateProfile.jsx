import React, { useState } from 'react';
import Button from '../components/Button';

function UpdateProfile() {

    const [skill, setSkill] = useState("")

    const [allSkill, setAllSkill] = useState([])
    console.log("outer", allSkill)

    const HandlesetAllSkill = (e, skill) => {
        e.preventDefault()
        setAllSkill((prev) => [...prev, skill])
        console.log(allSkill)
        setSkill("")
    }

    return (
        <>
            <div className='w-[100vw] h-auto flex flex-col items-center gap-2 pt-15 p-3 pb-25'>
                <div className='w-[100%] md:w-[80%] lg:w-[60vw] flex flex-col gap-5'>

                    <div className='w-[100%] relative flex items-center justify-center h-50 md:h-60 lg:h-70 p-2 rounded-xl bg-amber-300 bg-no-repeat bg-cover bg-center ' style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFO5nGHwr6l9X7SW4un6F74Ho4o1QjGF2IA&s)` }}>
                        <i class="fa-solid fa-pen absolute top-2 right-2 p-2  bg-yellow-400 rounded-full"></i>
                        <div className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 relative'>
                            <i className="fa-solid fa-pen p-2 bg-yellow-400 rounded-full absolute right-2 top-2 lg:right-5 lg:top-5 cursor-pointer"></i>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGmbVlXYi1BEuOw7ySL36qCQ7BvT5jqzxvg&s" alt=""
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
                                />
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>bio</label>
                                <textarea name=""
                                    placeholder='Enter bio'
                                    id=""
                                    className='border-1 w-full md:w-[100%] h-[150px] text-[17px] md:text-[18px] resize-none overflow-y-auto p-3 rounded-md text-sm'
                                ></textarea>
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>github link</label>
                                <input type="text"
                                    className='border-1 rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
                                    placeholder='enter github link'
                                />
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>linkedin link</label>
                                <input type="text"
                                    className='border-1 rounded-[10px] text-[17px] md:text-[18px] px-2 py-1'
                                    placeholder='enter linkedin link'
                                />
                            </div>
                            <div className='flex flex-col '>
                                <label htmlFor="" className='text-[18px] lg:text-[20px]'>About</label>
                                <textarea name=""
                                    placeholder='Enter about'
                                    id=""
                                    className='border-1 w-full md:w-[100%] h-[200px] text-[17px] md:text-[18px] resize-none overflow-y-auto p-3 rounded-md text-sm'
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
                                        allSkill && allSkill.map((skill, index) => (
                                            <span className='px-2 py-1 border-1 border-gray-600 rounded-xl' key={index}>{skill}</span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <Button text="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateProfile;
