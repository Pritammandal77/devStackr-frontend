import React, { useEffect, useState } from 'react';
import { fetchChats } from '../../utils/ChatAPI';

function ChatsList() {

  const [chats, setChats] = useState([])
  
  const handleFetchChats = async () => {
    const response = await fetchChats()
    setChats(response?.data.data)
    console.log(response)
  }

  useEffect(() => {
    handleFetchChats()
  }, []);


  if (chats) {
    console.log(chats)
  }

  return (
    <>
      <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center p-3 mt-2'>

        <div className='flex flex-col items-center'>
          {
            chats &&
            chats.map((data, index) => (
              <div key={index} className='border-1 h-30 w-full md:w-[70vw] bg-amber-300'>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default ChatsList;

{/* <div>
          {
            chats ?
              (
                chats.map((data, index) => (
                  <div key={index} className='border-1 h-30 w-full bg-amber-300'>
                  </div>
                ))
              ) :
              (
                <h1>

                </h1>
              )
          }
        </div> */}