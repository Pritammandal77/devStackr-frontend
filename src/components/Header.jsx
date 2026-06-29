import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../features/ToggleMode';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'sonner';

import {
  Search,
  Menu,
  X,
  Send,
  Home,
  Users,
  User,
  UserPlus,
  PlusCircle,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
  LogIn,
  Loader2
} from 'lucide-react';

const DefaultLoader = () => (
  <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 bg-[#111827] border border-[#1E293B] p-6 rounded-2xl shadow-xl">
      <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
      <p className="text-slate-300 font-medium text-sm">Processing logout...</p>
    </div>
  </div>
);

function Header() {
  const user = useSelector((state) => state.userData?.currentUserData?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const mode = useSelector((state) => state.mode.mode);

  const handleMode = () => {
    if (mode === "light") {
      dispatch(setMode("dark"));
    } else if (mode === "dark") {
      dispatch(setMode("light"));
    }
  };

  useEffect(() => {
    if (mode === "dark") {
      document.body.style.backgroundColor = "#0B0F17";
      document.body.style.color = "#F1F5F9";
    } else {
      document.body.style.backgroundColor = "#F8FAFC";
      document.body.style.color = "#0F172A";
    }
  }, [mode]);

  const handleLogout = async () => {
    setIsLoading(true);
    setIsMenuOpen(false);
    try {
      const res = await axiosInstance.post('/api/v1/users/logout', {
        withCredentials: true
      });
      if (res.data?.statusCode === 200 || res.status === 200) {
        toast.success("Logged out successfully");
        // Refreshes website to clear credentials and storage cache
        window.location.reload();
      }
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchUser = (query) => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchUser(searchInput);
    }
  };

  return (
    <>
      { }
      <header className={`w-full h-16 flex items-center fixed top-0 left-0 right-0 z-[50] border-b transition-colors duration-300
        ${mode === 'light'
          ? 'bg-white/85 backdrop-blur-md border-slate-200 text-slate-800'
          : 'bg-[#0B0F17]/85 backdrop-blur-md border-[#1E293B] text-slate-100'
        }`}
      >
        <nav className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* Logo Brand Title */}

          <div className="flex items-center gap-3 russo-one-regular">
            <NavLink to="/home" className="flex items-center gap-2 group">
              <p className={`russo-one-regular text-[22px]  ${mode == 'light' ? 'text-indigo-700' : 'text-indigo-500'}`}>
                devStackr
              </p>
            </NavLink>
          </div>

          { }
          <div className="hidden md:flex items-center relative w-[45vw] lg:w-[40vw]">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search developers, technologies, users..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className={`w-full h-10 pl-10 pr-4 rounded-xl text-sm font-medium transition-all outline-none border
                ${mode === 'light'
                  ? 'bg-slate-100 border-transparent text-slate-800 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100'
                  : 'bg-[#111827] border-[#1E293B] text-slate-200 focus:bg-[#0B0F17] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50'
                }`}
            />
            {searchInput && (
              <button
                onClick={() => handleSearchUser(searchInput)}
                className="absolute right-2 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                Go
              </button>
            )}
          </div>

          { }
          <div className="flex items-center gap-4">
            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-6">
              {user && (
                <NavLink
                  to="/chatlist"
                  className={({ isActive }) => `p-2 rounded-xl transition-all duration-200 hover:scale-105
                    ${isActive
                      ? 'text-indigo-500 bg-indigo-500/10'
                      : 'text-slate-400 hover:text-indigo-500'}`}
                  title="Direct Messages"
                >
                  <Send className="h-5 w-5" />
                </NavLink>
              )}

              {/* Theme Toggle Button */}
              <button
                onClick={handleMode}
                className={`p-2 rounded-xl border transition-all duration-200 hover:scale-105
                  ${mode === 'light'
                    ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    : 'bg-[#111827] border-[#1E293B] text-slate-300 hover:bg-[#1E293B]'
                  }`}
              >
                {mode === "dark" ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-indigo-600" />}
              </button>

              {user ? (
                <NavLink to="/profile" className="flex items-center gap-2">
                  <img
                    src={user.profilePicture || "/defaultpfp.png"}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-500/20 hover:ring-indigo-500 transition-all"
                  />
                </NavLink>
              ) : (
                <NavLink to="/signin">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer">
                    Sign In
                  </button>
                </NavLink>
              )}
            </div>

            {/* Mobile & Tablet Toggle Controller */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`xl:hidden p-2 rounded-xl border transition-all duration-200
                ${mode === 'light'
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-[#111827] border-[#1E293B] text-slate-300 hover:bg-[#1E293B]'
                }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

        </nav>
      </header>

      { }
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-[99] transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Slide Container */}
      <div className={`fixed top-0 right-0 h-full w-[75vw] sm:w-[60vw] md:w-[45vw] z-[100] p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        ${mode === 'light' ? 'bg-white text-slate-800' : 'bg-[#0B0F17] border-l border-[#1E293B] text-slate-100'}
      `}>
        <div>
          {/* Drawer Top Navigation Section */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200/50 dark:border-[#1E293B]">
            <span className="text-lg font-bold tracking-tight">Navigation</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B]"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>


          {/* Drawer footer profile area */}
          {user ? (
            <div className="pt-4 border-t border-slate-200/50 dark:border-[#1E293B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.profilePicture || "/defaultpfp.png"}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{user.name || "User"}</span>
                  <span className="text-xs text-slate-400">{user.userName || "@user"}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
                title="Logout"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          ) : (
            <div className="pt-4">
              <NavLink to="/signin" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 cursor-pointer">
                  <LogIn className="h-4.5 w-4.5" />
                  <span>Log In to DevStackr</span>
                </button>
              </NavLink>
            </div>
          )}

          { }
          {/* <div className="relative mt-6 md:hidden">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search user profiles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className={`w-full h-11 pl-10 pr-12 rounded-xl text-sm font-medium transition-all outline-none border
                ${mode === 'light'
                  ? 'bg-slate-100 border-transparent text-slate-800 focus:bg-white focus:border-indigo-400'
                  : 'bg-[#111827] border-[#1E293B] text-slate-200 focus:bg-[#0B0F17] focus:border-indigo-500'
                }`}
            />
            <button
              onClick={() => handleSearchUser(searchInput)}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
            >
              Go
            </button>
          </div> */}

          { }
          <ul className="flex flex-col gap-2 mt-6 text-sm font-semibold">
            <li>
              <NavLink
                to="/home"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-3.5 p-3 rounded-xl transition-all
                  ${isActive
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-400 dark:text-slate-300'}`}
              >
                <Home className="h-4.5 w-4.5" />
                <span>Home</span>
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink
                    to="/chatlist"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3.5 p-3 rounded-xl transition-all
                      ${isActive
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-400 dark:text-slate-300'}`}
                  >
                    <Send className="h-4.5 w-4.5" />
                    <span>Chats</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allusers"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3.5 p-3 rounded-xl transition-all
                      ${isActive
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-400 dark:text-slate-300'}`}
                  >
                    <Users className="h-4.5 w-4.5" />
                    <span>All Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/updateprofile"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3.5 p-3 rounded-xl transition-all
                      ${isActive
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-400 dark:text-slate-300'}`}
                  >
                    <User className="h-4.5 w-4.5" />
                    <span>Edit Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/createpost"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3.5 p-3 rounded-xl transition-all
                      ${isActive
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-400 dark:text-slate-300'}`}
                  >
                    <PlusCircle className="h-4.5 w-4.5" />
                    <span>Create Post</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Quick Toggle Mode inside drawer menu */}
            <li>
              <button
                onClick={handleMode}
                className="w-full flex items-center justify-between p-3 rounded-xl text-slate-400 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-all"
              >
                <span className="flex items-center gap-3.5">
                  {mode === "dark" ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5 text-indigo-500" />}
                  <span>Change Theme</span>
                </span>
                <span className="text-xs uppercase px-2 py-0.5 rounded-md font-bold bg-slate-200/50 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300">
                  {mode}
                </span>
              </button>
            </li>

            {/* Account settings collapsible list element */}
            <li className="mt-2">
              <div className="rounded-xl overflow-hidden">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="w-full flex items-center justify-between p-3 text-slate-400 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-all"
                >
                  <span className="flex items-center gap-3.5">
                    <Settings className="h-4.5 w-4.5" />
                    <span>Account Settings</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSettingsOpen && (
                  <ul className="pl-11 pr-3 py-2 flex flex-col gap-2 border-l border-slate-200 dark:border-[#1E293B]">
                    {!user ? (
                      <>
                        <li>
                          <NavLink
                            to="/signup"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-1.5 text-slate-400 hover:text-indigo-500 dark:text-slate-300"
                          >
                            Create Account
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/signin"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-1.5 text-slate-400 hover:text-indigo-500 dark:text-slate-300"
                          >
                            Log In
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left py-1.5 text-red-500 hover:text-red-600 font-semibold"
                        >
                          Log Out
                        </button>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>


      </div>

      { }
      {isLoading && <DefaultLoader />}
    </>
  );
}

export default Header;