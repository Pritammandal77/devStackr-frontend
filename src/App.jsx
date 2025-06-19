import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './Pages/SignIn/SignUp'
import Profile from './Pages/Profile'
import Header from './components/Header'
import BottomMenu from './components/BottomMenu'
import Jokes from './components/Jokes'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './Pages/Home'
import AllUsers from './Pages/AllUsers'
import Search from './Pages/Search'
import CreatePost from './Pages/CreatePost'
import SignIn from './Pages/SignIn/SignIn'

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

      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
