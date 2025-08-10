import { useState } from 'react'
import './App.css'
import SignUp from './Pages/SignIn/SignUp'
import Profile from './Pages/Profile'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './Pages/Home'
import AllUsers from './Pages/AllUsers'
import Search from './Pages/Search'
import CreatePost from './Pages/CreatePost'
import SignIn from './Pages/SignIn/SignIn'
import UpdateProfile from './Pages/UpdateProfile'
import Loader1 from './components/Loaders/Loader1'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'sonner';
import OtherUserProfile from './Pages/OtherUserProfile'
import FollowersList from './Pages/FollowersList'
import FollowingsList from './Pages/FollowingsList'
import EditPost from './Pages/EditPost'
import Chats from './Pages/Chats/ChatsPage'
import ChatMessages from './Pages/Chats/ChatMessages'
import ChatsList from './Pages/Chats/ChatsList'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/allusers" element={<AllUsers />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
        <Route path="/updateprofile" element={<UpdateProfile />}></Route>
        <Route path="/loader1" element={<Loader1 />}></Route>
        <Route path="/hii" element={<ProtectedRoute />}></Route>
        <Route path="/user/:id" element={<OtherUserProfile />}></Route>
        <Route path="/followerslist/:id" element={<FollowersList />}></Route>
        <Route path="/followingslist/:id" element={<FollowingsList />}></Route>
        <Route path="/editpost/:id" element={<EditPost />}></Route>
        <Route path="/chat" element={<Chats />}></Route>
        <Route path="/chatlist" element={<ChatsList />}></Route>
        <Route path="/chat/messages/:id" element={<ChatMessages />}></Route>
      </Route>
    )
  )

  return (
    <>
      <Toaster
        richColors
        position="top-right"
        closeButton
        duration={3000} 
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#111',
            color: '#fff',
            fontSize: "15px"
          },
          success: {
            style: { background: '#16a34a' }, 
          },
          error: {
            style: { background: '#dc2626' },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
