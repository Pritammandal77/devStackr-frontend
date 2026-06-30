import React, { useState } from 'react';
import { User, Mail, Lock, AtSign, Eye, EyeOff, Sparkles, ArrowRight, Cpu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axiosInstance from '../../utils/axiosInstance';
import { setCurrentUserData, setIsLoggedIn } from '../../features/UserProfileData';

function SignUp() {
    const mode = useSelector((state) => state.mode.mode);
    const isLight = mode === 'light';
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTypingPassword, setIsTypingPassword] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axiosInstance.post(
                "/api/v1/users/register",
                { name, userName, email, password },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            if (res.data?.statusCode === 200) {
                dispatch(setCurrentUserData(res.data.data));
                dispatch(setIsLoggedIn("true"));
                toast.success('Account created successfully!');
                navigate('/home');
            }
        } catch (error) {
            let message = "Something went wrong";
            if (error.response?.data && typeof error.response.data === 'string') {
                const match = error.response.data.match(/Error:(.*?)<br>/i);
                message = match ? match[1].trim() : "Unable to register";
            } else if (error.message) {
                message = error.message;
            }
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass = `w-full h-11 pl-4 pr-4 rounded-xl text-sm font-medium outline-none border transition-all
    ${isLight
            ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100'
            : 'bg-[#1c2230] border-slate-800 text-slate-200 focus:bg-[#11141A] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50'}`;

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden
      ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#0B0F17] text-slate-100'}`}
        >
            {/* Background blobs */}
            {!isLight && (
                <>
                    <div className="absolute -top-40 -left-40 h-[40vw] w-[40vw] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-40 -right-40 h-[30vw] w-[30vw] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                </>
            )}

            {/* Main card */}
            <div className={`w-full max-w-5xl rounded-3xl overflow-hidden border flex flex-col xl:flex-row shadow-2xl relative z-10 min-h-[680px]
        ${isLight ? 'bg-white border-slate-200/90' : 'bg-[#11141A]/70 backdrop-blur-md border-slate-800/80'}`}
            >

                {/* Left panel */}
                <div className={`w-full xl:w-1/2 p-10 hidden xl:flex flex-col justify-between relative overflow-hidden
          ${isLight ? 'bg-slate-900 text-white' : 'bg-[#06080C] text-white border-r border-slate-800/40'}`}
                >
                    <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl" />
                    <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />

                    <div className="relative z-10 flex items-center gap-2">
                        <p className={`russo-one-regular text-[22px]  ${mode == 'light' ? 'text-indigo-700' : 'text-indigo-500'}`}>
                            devStackr
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-center py-8">
                        <div className="w-full max-w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-indigo-500/5 flex items-center justify-center relative">
                            <div className="absolute inset-2 rounded-full border border-dashed border-indigo-500/20 animate-[spin_40s_linear_infinite]" />
                            <div className="absolute inset-8 rounded-full border border-indigo-500/10" />
                            <div className="p-6 rounded-2xl bg-slate-950/40 border border-indigo-500/20 backdrop-blur-md text-[11px] font-mono leading-relaxed space-y-1.5 text-slate-300/80 w-[240px]">
                                <p className="text-indigo-400">{"const developer = {"}</p>
                                <p className="pl-4">name: <span className="text-emerald-400">"Pritam Mandal"</span>,</p>
                                <p className="pl-4">role: <span className="text-emerald-400">"Fullstack Dev"</span>,</p>
                                <p className="pl-4">skills: [<span className="text-amber-400">"React", "Next.js"</span>],</p>
                                <p className="pl-4">{"code: () => {}"} <span className="text-sky-400">"Happy friendship"</span></p>
                                <p className="text-indigo-400">{"}"}</p>
                            </div>
                            <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-[10px] font-extrabold font-mono tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">READY</span>
                            <span className="absolute bottom-6 left-2 p-2 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
                                <Cpu className="h-4 w-4" />
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10 space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Where <span className="text-indigo-400 font-mono">'hello_world'</span> <br /> becomes 'hello, friend!'
                        </h2>
                        <p className="text-xs text-slate-400 font-medium">
                            Join thousands of engineers deploying code, discussing ideas, and networking with absolute performance.
                        </p>
                    </div>
                </div>

                {/* Right form */}
                <div className="w-full xl:w-1/2 p-6 sm:p-10 flex flex-col justify-center min-h-[550px]">

                    {/* Mobile logo */}
                    <div className="xl:hidden mb-8 space-y-2">
                        <div className="flex items-center gap-2">
                            <p className={`russo-one-regular text-[22px]  ${mode == 'light' ? 'text-indigo-700' : 'text-indigo-500'}`}>
                                devStackr
                            </p>
                        </div>
                        <h2 className="text-2xl font-extrabold tracking-tight">Where 'Hello World' becomes 'Hello friend'</h2>
                    </div>

                    <div className="w-full max-w-md mx-auto space-y-6">
                        <div className="space-y-1.5 text-center xl:text-left">
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Create Account</h1>
                            <p className={`text-xs sm:text-sm font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                Let's get started with your developer portfolio setup
                            </p>
                        </div>

                        <form onSubmit={registerUser} className="space-y-4">

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold tracking-wider uppercase opacity-80 flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5 text-indigo-500" /> Full Name
                                </label>
                                <input type="text" placeholder="e.g. John Doe" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold tracking-wider uppercase opacity-80 flex items-center gap-1.5">
                                    <AtSign className="h-3.5 w-3.5 text-indigo-500" /> Username
                                </label>
                                <input type="text" placeholder="e.g. john_doe" required value={userName} onChange={(e) => setUserName(e.target.value)} className={inputClass} />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold tracking-wider uppercase opacity-80 flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5 text-indigo-500" /> Email Address
                                </label>
                                <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold tracking-wider uppercase opacity-80 flex items-center gap-1.5">
                                    <Lock className="h-3.5 w-3.5 text-indigo-500" /> Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        required
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setIsTypingPassword(e.target.value.length > 0); }}
                                        className={`${inputClass} pr-11`}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-500 transition-colors">
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {isTypingPassword && (
                                <div className="flex gap-1.5 pt-1 items-center">
                                    <div className={`h-1.5 flex-1 rounded-full ${password.length >= 4 ? 'bg-amber-500' : 'bg-slate-700'}`} />
                                    <div className={`h-1.5 flex-1 rounded-full ${password.length >= 8 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                                    <div className={`h-1.5 flex-1 rounded-full ${password.length >= 12 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                                    <span className="text-[10px] font-bold text-slate-400 tracking-wide ml-1.5">
                                        {password.length >= 12 ? 'Excellent' : password.length >= 8 ? 'Strong' : 'Weak'}
                                    </span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
                            >
                                {isLoading ? <span>Creating account...</span> : <><span>Create account</span><ArrowRight className="h-4 w-4" /></>}
                            </button>

                            <p className="text-xs sm:text-sm text-center pt-3 font-semibold">
                                <span className="opacity-70">Already have an account?</span>
                                <NavLink to="/signin" className="text-indigo-500 hover:text-indigo-400 hover:underline ml-1">Sign In</NavLink>
                            </p>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SignUp;






































// OLD UI ( fully working )


// import axios from 'axios';
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { setCurrentUserData, setIsLoggedIn } from '../../features/UserProfileData';
// import { toast } from 'sonner';
// import axiosInstance from '../../utils/axiosInstance';
// import Loader2 from '../../components/Loaders/Loader2';

// function SignUp() {
//     const mode = useSelector((state) => state.mode.mode)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [name, setName] = useState("")
//     const [userName, setUserName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const [isLoading, setIsLoading] = useState("")

//     const registerUser = async (e, name, userName, email, password) => {
//         e.preventDefault()
//         setIsLoading(true)
//         try {
//             console.log("creating user")
//             const user = await axiosInstance.post("/api/v1/users/register",
//                 {
//                     name,
//                     userName,
//                     email,
//                     password
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     withCredentials: true
//                 }
//             )

//             console.log("Login successful:", user.data.data);

//             if (user.data.statusCode == 200) {
//                 dispatch(setCurrentUserData(user.data.data))
//                 dispatch(setIsLoggedIn("true"))
//                 toast.success('created account successfull!');
//                 navigate('/home')
//             }

//         } catch (error) {
//             console.error("Creating account failed:", error.response?.data || error.message);

//             //this is 3 lines are used, to get the actual text content from the error msg
//             const html = error.response.data;
//             const match = html.match(/Error:(.*?)<br>/i);
//             const message = match ? match[1].trim() : "Something went wrong";

//             if (error.response.data) {
//                 toast.error(message);
//             } else {
//                 toast.error('something went wrong');
//             }
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <>
//             <div className='text-black w-full min-h-[100vh] flex flex-col items-center justify-center '>

//                 <div className={`flex flex-row rounded-3xl w-[100vw] md:w-[100vw] lg:w-[70vw] xl:h-[75vh]
//                        ${mode == 'light' ? 'bg-gray-200 shadow-xl' : 'bg-[#0c0c0c] text-white'}`} >
//                     <div className={`w-[50%] rounded-l-3xl p-10 text-white hidden xl:flex flex-col items-center justify-center gap-10
//                            ${mode == 'light' ? 'bg-gray-900' : 'bg-[#040404]'}`}>
//                         <div>
//                             <h1 className='text-4xl'>Welcome to <span className='russo-one-regular text-red-400'>devstackr</span></h1>
//                             <p className='text-2xl'>Where ‘hello world’ <br /> becomes ‘hello, friend!</p>
//                         </div>
//                         <img src="/signupFormImg.svg" alt="" className='h-70' />
//                     </div>
//                     <div className={`flex flex-col lg:bg-transparent items-center gap-5 w-[100%] xl:w-[50%] p-0  h-[100vh] xl:h-[75vh] xl:rounded-3xl
//                         ${mode == 'light' ? 'bg-gray-900' : 'bg-[#040404]'}  `}>
//                         <div className='w-full h-[20vh] flex flex-col justify-center px-10 xl:hidden'>
//                             <h1 className='text-5xl russo-one-regular text-red-400'>devstackr</h1>
//                             <p className='text-3xl text-white'>Where ‘Hello World’ <br /> becomes ‘Hello friend’</p>
//                         </div>
//                         <div className={`w-[100vw] xl:w-[100%] h-[80vh] lg:bg-transparent pt-10 xl:pt-0 flex flex-col items-center justify-center px-8 rounded-t-3xl xl:rounded-r-3xl
//                            ${mode == 'light' ? 'bg-white' : 'bg-[#0f0f0f]'}  `}>
//                             <h1 className='text-4xl text-center '>Create Account </h1>
//                             <form action="" className='flex flex-col gap-5 w-[100%] md:w-[60%] xl:w-[90%]' onSubmit={(e) => registerUser(e, name, userName, email, password)}>
//                                 <div className='flex flex-col'>
//                                     <label htmlFor="">Name</label>
//                                     <input type="text"
//                                         placeholder='Enter your name'
//                                         className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
//                                         required
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className='flex flex-col'>
//                                     <label htmlFor="">UserName</label>
//                                     <input type="text"
//                                         placeholder='Enter username'
//                                         className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
//                                         required
//                                         value={userName}
//                                         onChange={(e) => setUserName(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className='flex flex-col'>
//                                     <label htmlFor="">Email</label>
//                                     <input type="text"
//                                         placeholder='Enter your email'
//                                         className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
//                                         value={email}
//                                         required
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className='flex flex-col'>
//                                     <label htmlFor="">Password</label>
//                                     <input type="text"
//                                         placeholder='Enter your password'
//                                         className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
//                                         required
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </div>
//                                 <button className='bg-red-400 text-black p-2 text-l font-bold rounded-2xl cursor-pointer'>
//                                     Create account
//                                 </button>
//                                 <div className='text-[16px] text-center'>
//                                     <p>Already have an account?
//                                         <NavLink to="/signin" className="text-blue-500"> sign in</NavLink>
//                                     </p>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {
//                 isLoading && <Loader2 />
//             }

//         </>
//     );
// }

// export default SignUp;
