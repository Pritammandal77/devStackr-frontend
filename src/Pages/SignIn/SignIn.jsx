import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Key, ShieldCheck, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axiosInstance from '../../utils/axiosInstance';

function SignIn() {
  const mode = useSelector((state) => state.mode.mode);
  const isLight = mode === 'light';
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (userEmail, userPassword) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/users/login",
        { email: userEmail, password: userPassword },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.data?.success) {
        toast.success('Login successful!');
        setTimeout(() => {
          window.location.reload();
          navigate("/");
        }, 800);
      }
    } catch (error) {
      let message = "Something went wrong";
      if (error.response?.data && typeof error.response.data === 'string') {
        const match = error.response.data.match(/Error:(.*?)<br>/i);
        message = match ? match[1].trim() : "Unable to authenticate";
      } else if (error.message) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const loginWithGuestAccount = () => {
    const guestEmail = import.meta.env.VITE_GUEST_ACCOUNT_EMAIL;
    const guestPassword = import.meta.env.VITE_GUEST_ACCOUNT_PASSWORD;
    loginUser(guestEmail, guestPassword);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden
      ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#0B0F17] text-slate-100'}`}
    >
      {/* Background blobs */}
      {!isLight && (
        <>
          <div className="absolute -top-40 -right-40 h-[40vw] w-[40vw] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 h-[30vw] w-[30vw] rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        </>
      )}

      {/* Main card */}
      <div className={`w-full max-w-5xl rounded-3xl overflow-hidden border flex flex-col xl:flex-row shadow-2xl relative z-10 min-h-[640px]
        ${isLight ? 'bg-white border-slate-200/90' : 'bg-[#11141A]/70 backdrop-blur-md border-slate-800/80'}`}
      >

        {/* Left panel */}
        <div className={`w-full xl:w-1/2 p-10 hidden xl:flex flex-col justify-between relative overflow-hidden
          ${isLight ? 'bg-slate-900 text-white' : 'bg-[#06080C] text-white border-r border-slate-800/40'}`}
        >
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-rose-500/10 blur-2xl" />

          <div className="relative z-10 flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/25">d</div>
            <span className="text-xl font-bold tracking-tight">dev<span className="text-indigo-500">Stackr</span></span>
          </div>

          <div className="relative z-10 flex items-center justify-center py-6">
            <div className="w-full max-w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-rose-500/5 flex items-center justify-center relative">
              <div className="absolute inset-4 rounded-full border border-dashed border-indigo-500/15 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-10 rounded-full border border-rose-500/10" />
              <div className="p-6 rounded-2xl bg-slate-950/50 border border-indigo-500/15 backdrop-blur-md text-[11px] font-mono leading-relaxed space-y-2 text-slate-300 w-[240px]">
                <div className="flex gap-1.5 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <p className="text-indigo-400">{"const devSession = {"}</p>
                <p className="pl-4">status: <span className="text-emerald-400">"welcome_back"</span>,</p>
                <p className="pl-4">activeNodes: <span className="text-indigo-300">984</span>,</p>
                <p className="pl-4">secure: <span className="text-amber-400">true</span>,</p>
                <p className="pl-4">{"greet: () => "}<span className="text-rose-400">"friend"</span></p>
                <p className="text-indigo-400">{"}"}</p>
              </div>
              <span className="absolute top-2 right-2 p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <ShieldCheck className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="relative z-10 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome back to <br /><span className="text-indigo-400 font-mono">devStackr</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Log in to sync your active nodes, showcase projects, and network with developers worldwide.
            </p>
          </div>
        </div>

        {/* Right form */}
        <div className="w-full xl:w-1/2 p-6 sm:p-10 flex flex-col justify-center min-h-[500px]">

          {/* Mobile logo */}
          <div className="xl:hidden mb-8 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg">d</div>
              <span className="text-xl font-bold tracking-tight">dev<span className="text-indigo-500">Stackr</span></span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Where 'Hello World' becomes 'Hello friend'</h2>
          </div>

          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-1.5 text-center xl:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Account Login</h1>
              <p className={`text-xs sm:text-sm font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Access your personalized workspace and deployment profiles
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">

              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-wider uppercase opacity-80 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-indigo-500" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-11 pl-4 pr-4 rounded-xl text-sm font-medium outline-none border transition-all
                    ${isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100'
                      : 'bg-[#1c2230] border-slate-800 text-slate-200 focus:bg-[#11141A] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50'}`}
                />
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
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full h-11 pl-4 pr-11 rounded-xl text-sm font-medium outline-none border transition-all
                      ${isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100'
                        : 'bg-[#1c2230] border-slate-800 text-slate-200 focus:bg-[#11141A] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {isLoading ? <span>Logging in...</span> : <><span>Log In</span><ArrowRight className="h-4 w-4" /></>}
              </button>

              <p className="text-xs sm:text-sm text-center pt-3 font-semibold">
                <span className="opacity-70">Don't have an account yet?</span>
                <NavLink to="/signup" className="text-indigo-500 hover:text-indigo-400 hover:underline ml-1">Create account</NavLink>
              </p>

              <div className="relative flex py-2 items-center">
                <div className={`flex-grow border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`} />
                <span className="mx-4 text-[10px] font-bold tracking-widest uppercase text-slate-500">Or Continue With</span>
                <div className={`flex-grow border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`} />
              </div>

              <button
                type="button"
                onClick={loginWithGuestAccount}
                disabled={isLoading}
                className={`w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-2.5 transition-all border cursor-pointer
                  ${isLight
                    ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    : 'bg-[#161a22] hover:bg-indigo-500/5 border-slate-800 text-indigo-400 hover:border-indigo-500/30'}`}
              >
                <Key className="h-4 w-4 text-indigo-500" />
                <span>Explore with Guest Account</span>
                <ChevronRight className="h-3 w-3 opacity-50" />
              </button>

            </form>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-100/10 bg-slate-900/50 backdrop-blur-md pointer-events-none text-[10px] font-mono tracking-widest text-slate-400">
        <Sparkles className="h-3 w-3 text-indigo-500" />
        <span>V2.4 INTUITIVE SESSION ACTIVE</span>
      </div>
    </div>
  );
}

export default SignIn;



































// old code , fully working 

// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import axiosInstance from '../../utils/axiosInstance';
// import Loader2 from '../../components/Loaders/Loader2';
// import { useSelector } from 'react-redux';

// function SignIn() {

//     const mode = useSelector((state) => state.mode.mode)
//     const navigate = useNavigate()

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const [isLoading, setIsLoading] = useState(false)


//     const loginUser = async (email, password) => {
//         setIsLoading(true)
//         try {
//             const response = await axiosInstance.post(
//                 "/api/v1/users/login",
//                 {
//                     email,
//                     password
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     withCredentials: true
//                 }
//             );

//             // console.log("Login successful:", response.data);

//             if (response.data.success) {
//                 toast.success('login successfull!');
//                 window.location.reload();
//                 navigate("/");
//             }

//         } catch (error) {
//             console.error("Login failed:", error.response?.data || error.message);

//             //this is 3 lines are used, to get the actual text content from the error msg
//             const html = error.response.data;
//             const match = html.match(/Error:(.*?)<br>/i);
//             const message = match ? match[1].trim() : "Something went wrong";

//             if (error.message) {
//                 toast.error(message);
//             } else {
//                 toast.error('something went wrong');
//             }

//         } finally {
//             setIsLoading(false)
//         }
//     };

//     const handleLogin = (e) => {
//         e.preventDefault()
//         loginUser(email, password)
//     }

//     const loginWithGuestAccount = () => {
//         try {
//             let email = import.meta.env.VITE_GUEST_ACCOUNT_EMAIL;
//             let password = import.meta.env.VITE_GUEST_ACCOUNT_PASSWORD;
//             loginUser(email, password)
//         } catch (error) {
//             toast.error("login failed via guest account")
//         }
//     }

//     return (
//         <>
//             <div className='w-full text-black min-h-[100vh] flex flex-col items-center justify-center '>

//                 <div className={` flex flex-row rounded-3xl w-[100vw] md:w-[100vw] lg:w-[60vw] xl:h-[65vh]
//                     ${mode == 'light' ? 'bg-gray-200 shadow-xl' : 'bg-[#0f0f0f] text-white'}`} >
//                     <div className={` w-[50%] rounded-l-3xl p-10 text-white hidden xl:flex flex-col items-center justify-evenly  
//                           ${mode == 'light' ? 'bg-gray-900' : 'bg-[#040404]'}`} >
//                         <div>
//                             <h1 className='text-4xl text-center'>Welcome again at <span className='russo-one-regular text-red-400 text-5xl'>devstackr</span></h1>
//                             {/* <p className='text-xl'>Where ‘Hello World’ becomes ‘Hello, friend!’</p> */}
//                         </div>
//                         <img src="/loginFormImg.svg" alt="" className='h-50' />
//                     </div>
//                     <div className={`flex flex-col lg:bg-transparent items-center gap-5 w-[100%] xl:w-[50%] p-0  h-[100vh] xl:h-[65vh]  xl:rounded-3xl
//                            ${mode == 'light' ? 'bg-gray-900' : 'bg-[#040404]'}`}>
//                         <div className='w-full h-[20vh] flex flex-col justify-center px-10 xl:hidden'>
//                             <h1 className='text-5xl russo-one-regular text-red-400'>devstackr</h1>
//                             <p className='text-3xl text-white'>Where ‘hello world’ <br /> becomes ‘hello friend’</p>
//                         </div>
//                         <div className={`w-[100vw] lg:bg-transparent xl:w-[100%] h-[80vh] pt-10 xl:pt-0 flex flex-col items-center justify-center px-8 rounded-t-3xl xl:rounded-r-3xl
//                               ${mode == 'light' ? 'bg-white' : 'bg-[#0f0f0f]'}
//                            `}>
//                             <h1 className='text-4xl text-center '>Login </h1>
//                             <form action="" className='flex flex-col gap-5 w-[100%] md:w-[60%] xl:w-[90%]' onSubmit={handleLogin}>
//                                 <div className='flex flex-col'>
//                                     <label htmlFor="">Email</label>
//                                     <input type="text"
//                                         placeholder='Enter your email'
//                                         className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
//                                         required
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)} />
//                                 </div>
//                                 <div className='flex flex-col'>
//                                     <label htmlFor="">Password</label>
//                                     <input type="text"
//                                         placeholder='Enter your password'
//                                         className={`p-2 rounded-xl ${mode == 'light' ? 'bg-gray-300' : 'bg-[#2c2c2c] '}`}
//                                         required
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)} />
//                                 </div>
//                                 <button className='bg-red-400 text-black p-2 text-l font-bold rounded-2xl cursor-pointer'
//                                 >
//                                     Login
//                                 </button>
//                                 <div className='text-[16px] text-center'>
//                                     <p>Do not have a account?
//                                         <NavLink to="/signup" className="text-blue-500"> create account</NavLink>
//                                     </p>
//                                 </div>
//                                 <div className='text-[16px] text-center ' onClick={() => loginWithGuestAccount()}>
//                                     <p className=''>login with a
//                                         <span className='text-blue-600'> Guest account </span>
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

// export default SignIn;
