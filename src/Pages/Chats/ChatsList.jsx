import React, { useEffect, useState } from 'react';
import { fetchChats } from '../../utils/ChatAPI';
import { useSelector } from 'react-redux';
import Loader2 from '../../components/Loaders/Loader2'
import { NavLink } from 'react-router-dom';

function ChatsList() {

  const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id)
  const [chatsList, setChatsList] = useState([])

  const handleFetchChats = async () => {
    const response = await fetchChats()
    setChatsList(response?.data.data)
    console.log("chatList", response?.data.data)
  }

  useEffect(() => {
    handleFetchChats()
  }, []);

  return (
    <>
      <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center p-3 mt-2'>
        <h1 className='text-[22px] py-2'>Chats</h1>
        <div className='flex flex-col gap-2 items-center'>
          {
            chatsList.length >= 1 ?
              (
                chatsList?.map((data, index) => {
                  const otherUser = data.users.find((user) => user._id !== currentUserId);
                  return (
                    <div key={index} className='border-1 border-gray-600 w-full md:w-[70vw] xl:w-[40vw] rounded-xl'>
                      <NavLink to={`/chat/messages/${data._id}`} className="flex items-center p-1 h-25">
                        <div className='w-25 h-25 flex items-center justify-center'>
                          <img
                            src={otherUser?.profilePicture}
                            alt={otherUser?.name}
                            className='h-22 w-22 rounded-full object-cover'
                          />
                        </div>
                        <div className='flex flex-col h-full p-4 font-[400]'>
                          <p className='text-[20px]'>{otherUser?.name}</p>
                          <p className='text-gray-500 text-[16px] truncate'>
                            {data?.latestMessage?.content || "Start your conversation..."}
                          </p>
                        </div>
                      </NavLink>
                    </div>
                  );
                })
              ) :
              (
                <Loader2 />
              )
          }

        </div>
      </div>
    </>
  );
}

export default ChatsList;





