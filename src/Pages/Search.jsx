import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import Loader2 from '../components/Loaders/Loader2';
import UserCard from '../components/UserCard';
import { useSearchParams } from 'react-router-dom';

function Search() {
    const mode = useSelector((state) => state.mode.mode);
    const isLight = mode === 'light';

    const [input, setInput] = useState("");
    const [searchedUsers, setSearchedUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const searchUser = async (searchInputValue) => {
        if (!searchInputValue.trim()) return;
        setIsLoading(true);
        try {
            setSearchParams({ query: searchInputValue });
            const res = await axiosInstance.get("/api/v1/users/searchuser", {
                params: {
                    userToSearch: searchInputValue.trim()
                }
            });
            setSearchedUsers(res.data.data);
        } catch (error) {
            console.log("error occurred while searching a user", error);
        } finally {
            setIsLoading(false);
            setInput("");
        }
    };

    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setInput(query);
            searchUser(query);
        }
    }, [searchParams]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchUser(input);
        }
    };

    return (
        <div className={`min-h-screen mt-10 pt-20 py-6 px-4 md:py-10 flex flex-col xl:w-[80vw] xl:absolute right-0 transition-colors duration-200 ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#0B0F17]'
            }`}>
            {/* Search Bar Input Container */}
            <div className='w-full max-w-2xl mx-auto mb-6 flex items-center justify-center h-16'>
                <div className={`relative w-full flex items-center rounded-2xl border transition-all duration-200 focus-within:ring-2 ${isLight
                    ? 'bg-white border-slate-200 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 shadow-sm'
                    : 'bg-[#1E293B]/40 border-slate-800/80 focus-within:ring-indigo-500/30 focus-within:border-indigo-500 shadow-none'
                    }`}>
                    <input
                        type="text"
                        className={`w-full h-12 pl-4 pr-14 border-none bg-transparent rounded-2xl focus:outline-none text-[15px] font-medium tracking-wide ${isLight ? 'text-slate-900 placeholder-slate-400' : 'text-slate-100 placeholder-slate-500'
                            }`}
                        placeholder='Search name or username...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={() => searchUser(input)}
                        className={`absolute right-1.5 h-9 w-9 flex items-center justify-center rounded-xl text-[16px] transition-all duration-200 active:scale-95 ${isLight
                            ? 'bg-[#4F46E5] text-white hover:bg-indigo-700 shadow-sm shadow-indigo-500/20'
                            : 'bg-[#6366F1] text-white hover:bg-indigo-500 shadow-none'
                            }`}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>

            {/* Content Results Wrapper */}
            <div className='w-full max-w-2xl mx-auto flex flex-col items-center gap-4'>
                {isLoading && (
                    <div className="py-12">
                        <Loader2 />
                    </div>
                )}

                {/* 1. INITIAL LANDING STATE (Showcase Native Products) */}
                {!isLoading && searchedUsers === null && (
                    <div className="w-full flex flex-col gap-3 mt-2">
                        <p className={`text-[11px] font-semibold uppercase tracking-widest px-1 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                            Useful for devs like you
                        </p>

                        {[
                            {
                                href: "https://roomio.living",
                                icon: "fa-solid fa-house-chimney",
                                iconBg: isLight ? "bg-indigo-50" : "bg-indigo-500/10",
                                iconColor: isLight ? "text-[#4F46E5]" : "text-indigo-400",
                                heading: "Moving to a new city for your job?",
                                desc: "Find a verified roommate near your office — filter by city, budget, and lifestyle. No awkward Facebook groups.",
                                chips: ["Pune", "Hyderabad", "Bangalore", "Real-time chat"],
                                ctaBg: "bg-[#4F46E5]",
                            },
                            {
                                href: "https://notexahub.vercel.app",
                                icon: "fa-solid fa-note-sticky",
                                iconBg: isLight ? "bg-emerald-50" : "bg-emerald-500/10",
                                iconColor: isLight ? "text-emerald-600" : "text-emerald-400",
                                heading: "Exams coming up?",
                                desc: "Get handwritten and digital notes from students who already cleared your subjects. Or sell yours and earn.",
                                chips: ["Buy notes", "Sell notes", "AI study assistant"],
                                ctaBg: "bg-emerald-600",
                            },
                        ].map(({ href, icon, iconBg, iconColor, heading, desc, chips, ctaBg }) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className={`w-full p-5 rounded-2xl border transition-all duration-200 flex gap-3 items-start group ${isLight ? 'bg-white border-slate-200/80 shadow-sm hover:border-slate-300' : 'bg-[#1E293B]/20 border-slate-800/80 hover:border-slate-700'
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-[20px] shrink-0 ${iconBg} ${iconColor}`}>
                                    <i className={icon}></i>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-[15px] font-semibold mb-1 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>{heading}</p>
                                    <p className={`text-[13px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{desc}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {chips.map(c => (
                                            <span key={c} className={`text-[11px] px-2.5 py-1 rounded-full border ${isLight ? 'border-slate-200 text-slate-500 bg-slate-50' : 'border-slate-700 text-slate-400 bg-slate-800/30'
                                                }`}>{c}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <span className={`shrink-0 text-[13px] font-medium px-3 py-1.5 rounded-lg text-white transition-opacity group-hover:opacity-90 ${ctaBg}`}>
                                    Try it →
                                </span>
                            </a>
                        ))}
                    </div>
                )}

                {/* 2. MATCHED USERS VIEW */}
                {!isLoading && searchedUsers?.length > 0 &&
                    searchedUsers.map((data, index) => (
                        <UserCard
                            key={index}
                            id={data._id}
                            profilePicture={data.profilePicture}
                            name={data.name}
                            userName={data.userName}
                            bio={data.bio}
                            isFollowBtnVisible={false}
                        />
                    ))
                }

                {/* 3. EXPLICIT EMPTY RESULT VIEW */}
                {!isLoading && searchedUsers?.length === 0 && (
                    <div className='h-[40vh] flex flex-col items-center justify-center text-center px-4'>
                        <div className={`p-4 rounded-2xl mb-3 text-[22px] ${isLight ? 'bg-slate-100 text-slate-400' : 'bg-slate-800/40 text-slate-500'}`}>
                            <i className="fa-solid fa-user-xmark"></i>
                        </div>
                        <h2 className={`text-[15px] font-medium max-w-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            No users found with this name or username.
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;


































// old UI code (fully working)


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axiosInstance from '../utils/axiosInstance';
// import Loader2 from '../components/Loaders/Loader2';
// import UserCard from '../components/UserCard';
// import { useSearchParams } from 'react-router-dom';

// function Search() {

//     const mode = useSelector((state) => state.mode.mode);

//     const [input, setInput] = useState("");
//     const [searchedUsers, setSearchedUsers] = useState(null);
//     const [isLoading, setIsLoading] = useState(false)

//     const [searchParams, setSearchParams] = useSearchParams();

//     const searchUser = async (input) => {
//         setIsLoading(true)
//         try {
//             setSearchParams({ query: input }); // put in URL
//             const res = await axiosInstance.get("/api/v1/users/searchuser", {
//                 params: {
//                     userToSearch: input.trim()
//                 }
//             });
//             setSearchedUsers(res.data.data);
//         } catch (error) {
//             console.log("error occurred while searching a user", error);
//         } finally {
//             setIsLoading(false)
//             setInput("")
//         }
//     };

//     // On mount, check URL query param
//     useEffect(() => {
//         const query = searchParams.get("query");
//         if (query) {
//             setInput(query);
//             searchUser(query);
//         }
//     }, [searchParams]);


//     return (
//         <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0'>
//             <div className='flex items-center justify-center gap-2 h-20 md:hidden'>
//                 <div className='flex items-center justify-center gap-2 border-1 rounded-full'>
//                     <input
//                         type="text"
//                         className='w-[77vw] border-0 focus:outline-none px-2 lg:w-[50vw]'
//                         placeholder='enter name or username'
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                     />
//                     <i
//                         className={`fa-solid fa-magnifying-glass text-xl cursor-pointer p-2 rounded-full ${mode == 'light' ? 'bg-[#f9ded1]' : 'bg-[#242424] text-[#d3d3d3]'}`}
//                         onClick={() => searchUser(input)}
//                     ></i>
//                 </div>
//             </div>

//             <div className='flex flex-col w-full items-center gap-3 md:mt-5'>
//                 {searchedUsers?.length > 0 &&
//                     searchedUsers.map((data, index) => (
//                         <UserCard
//                             key={index}
//                             id={data._id}
//                             profilePicture={data.profilePicture}
//                             name={data.name}
//                             userName={data.userName}
//                             bio={data.bio}
//                             isFollowBtnVisible={false}
//                         />
//                     ))}
//                 {
//                     searchedUsers?.length == 0 &&
//                     <div className='h-[70vh] flex items-center justify-center'>
//                         <h1 className='text-[18px]'>No users found with this name or username !!</h1>
//                     </div>
//                 }
//                 {
//                     isLoading && <Loader2 />
//                 }
//             </div>
//         </div>
//     );
// }

// export default Search;