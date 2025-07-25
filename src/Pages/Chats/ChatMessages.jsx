import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createOrFetchChat, sendMessage } from '../../utils/ChatAPI';

function ChatMessages() {

  const { id } = useParams() //this is the ChatId
  const [inputMessage, setInputMessage] = useState("")

  const handleCreateChat = async (id) => {
    const response = await createOrFetchChat(id)
    console.log(response)
  }

  useEffect(() => {
    handleCreateChat(id)
  }, []);


  const handleSendNewMessage = async (id, inputMessage) => {
    const messageSent = await sendMessage({
      chatId: id,
      message: inputMessage
    });
    console.log("Message sent:", messageSent);
  };


  if (inputMessage) {
    console.log(inputMessage)
  }

  return (
    <>
      <div className='h-[100vh] flex flex-col  xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center items-center'>

        <div className='pt-13 relative xl:mb-0 w-[100vw] border-gray-500 md:w-[100vw] xl:w-[50vw] bg-gray-100 h-full'>
          <p>chat messages page</p>
          {
            id && id
          }
          <div className='w-full h-14 absolute bottom-0 flex items-center gap-2 px-2 xl:px-0'>
            <input
              type="text"
              className='h-10 w-[90%] border-1 pl-2 rounded-xl'
              placeholder='enter your message...'
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <div className='w-[10%] flex items-center justify-center bg-blue-400 h-10 rounded-xl hover:cursor-pointer hover:bg-blue-500'
              onClick={() => handleSendNewMessage(id, inputMessage)}
            >
              <i className="fa-regular fa-paper-plane text-xl"></i>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ChatMessages;
