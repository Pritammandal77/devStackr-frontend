import React, { useEffect, useState } from 'react';
import { fetchChats } from '../../utils/ChatAPI';
import { useDispatch, useSelector } from 'react-redux';
import Loader2 from '../../components/Loaders/Loader2'
import { NavLink, useNavigate } from 'react-router-dom';
import { setCurrentSelectedChat } from '../../features/Chat';
import ProfileSkeleton from '../../components/Loaders/ProfileSkeleton';

function ChatsList() {

  const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id)
  const [chatsList, setChatsList] = useState([])

  const navigate = useNavigate();
  const dispatch = useDispatch()
  // console.log(currentSelectedChat)

  const handleFetchChats = async () => {
    const response = await fetchChats()
    setChatsList(response?.data.data)
    // console.log("chatList", response?.data.data)
  }

  useEffect(() => {
    handleFetchChats()
  }, []);


  const handleCurrentSelectedChat = (currChat) => {
    // console.log("currChat", currChat)
    dispatch(setCurrentSelectedChat(currChat))
  }

  return (
    <>
      <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center p-3 mt-2'>
        <div className='flex flex-col gap-2 items-center'>
          <div className='w-[100%] md:w-[80%] xl:w-[100%] flex items-center justify-between'>
            <i className="fa-solid fa-arrow-left text-[20px] cursor-pointer" onClick={() => navigate("/")}></i>
            <h1 className='text-[23px] md:text-[25px] py-2 xl:self-start'>Chats</h1>
          </div>
          {
            chatsList.length >= 1 &&

            chatsList?.map((data, index) => {
              const otherUser = data.users.find((user) => user._id !== currentUserId);
              return (
                <div key={index} className='border-1 border-gray-600 w-full md:w-[70vw] xl:w-[40vw] rounded-xl'>
                  <NavLink to={`/chat/messages/${data._id}`} className="flex items-center p-1 h-25" onClick={() => handleCurrentSelectedChat(data)}>
                    <div className='w-25 h-25 flex items-center justify-center'>
                      <img
                        src={otherUser?.profilePicture}
                        alt={otherUser?.name}
                        className='h-22 w-22 rounded-full object-cover'
                      />
                    </div>
                    <div className='flex flex-col h-full p-4 font-[400] w-[70%]'>
                      <p className='text-[20px]'>{otherUser?.name}</p>
                      <p className='text-gray-500 text-[16px] truncate w-[100%] overflow-x-hidden'>
                        {data?.latestMessage?.content || "Start your conversation..."}
                      </p>
                    </div>
                  </NavLink>
                </div>
              );
            })
          }
        </div>
      </div>

      {
        chatsList.length < 1 &&
        <div className='flex flex-col absolute md:w-full top-27 xl:w-[80vw] items-center justify-center xl:absolute xl:right-0 xl:justify-center xl:items-center'>
          <div className='flex flex-col gap-3 w-[100vw] md:w-[80vw] xl:w-[50vw]'>
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
          </div>
        </div>
      }
    </>
  );
}

export default ChatsList;





