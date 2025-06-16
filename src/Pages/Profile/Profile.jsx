import React from 'react';
import FollowButton from '../../components/followButton';

function Profile() {
    return (
        <>
            <div className='w-[100vw] h-auto flex flex-col items-center gap-2 p-3 py-15'>

                <div className='relative w-[100%] md:w-[80%] lg:w-[60vw] flex items-center justify-center text-black rounded-2xl bg-no-repeat bg-cover bg-center'
                    style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBCqzpMOSFb3X7dZurLvJN7DvSmPoBPIHEA&s')" }}>
                    <div className='40% h-[15vh] lg:h-[23vh] '>

                    </div>
                </div>

                <div className='w-[100%] md:w-[80%] lg:w-[60vw] h-10  lg:text-center flex flex-row justify-between text-black px-10'>
                    <img src="/myNewDp.jpg" alt=""
                        className='w-30 h-30 md:w-40 md:h-40 lg:h-50 lg:w-50 rounded-full relative bottom-15 md:bottom-20' />
                    <FollowButton/>
                </div>

                <div className='w-[100%] md:w-[80%] lg:w-[60vw] p-2 mt-5 lg:mt-20'>
                    <h1 className='text-[22px] md:text-[28px] font-semibold'>Pritam Mandal</h1>
                    <p className='text-[20px]'>Full Stack Developer Intern @ GharPadharo MongoDB | Express.js | React.js | Node.js IT 3rd Year Student</p>
                    <div className='flex flex-row items-center gap-10 md:gap-15 w-[90%] md:w-[50%] py-5'>
                        <p className='text-[18px] md:text-[20px] border-[2px] border-[#ba88d6] py-1 px-2 rounded-[10px]' >499 followers</p>
                        <p className='text-[18px] md:text-[20px] border-[2px] border-[#ba88d6] py-1 px-2 rounded-[10px]'>198 following</p>
                    </div>
                </div>

                <div className='w-[100%] md:w-[80%] lg:w-[60vw]  p-2 '>
                    <h1 className='text-[28px] lg:text-[32px]'>About</h1>
                    <p className='text-[16px] md:text-[18px]'>
                        I'm Pritam Mandal, a B.Sc. IT 2nd-year student and passionate frontend developer, currently transitioning into full-stack development. I’ve built several projects using React.js, Tailwind CSS, and Redux Toolkit, and I’m actively learning backend technologies like Node.js, Express.js, MongoDB, and Firebase. My goal is to become a top 1% full-stack developer by 2026 and land a job with a 5–7 LPA+ package. I’ve created apps like DevStackr (a developer community platform), Zeno-AI (an AI chatbot + voice assistant), and MetaMart (an eCommerce app), and I love building modern, responsive web applications that solve real-world problems.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Profile;
