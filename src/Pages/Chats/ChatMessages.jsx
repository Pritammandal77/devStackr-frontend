import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createOrFetchChat, fetchMessagesByChatId, sendMessage } from '../../utils/ChatAPI';
import { useSelector } from 'react-redux';
import { FormatTime } from '../../utils/FormatTime';

function ChatMessages() {

  const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id)
  const mode = useSelector((state) => state.mode.mode)
  const { id } = useParams() //this is the ChatId
  const [inputMessage, setInputMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])   // to store all the messages

  // ye state sirf iliye lagaya ke taaki , jab bhe user koi new msg send kare ,
  //  toh fetchallMessages bhe firse call ho jaaye , kyuki mene is state as a dependency lagaya hain
  const [isMsgSent, setIsMsgSent] = useState(false)

  const handleSendNewMessage = async (id, inputMessage) => {
    setInputMessage("")
    const messageSent = await sendMessage({
      chatId: id,
      message: inputMessage
    });
    console.log("Message sent:", messageSent);
    setIsMsgSent(true)
  };

  if (inputMessage) {
    console.log(inputMessage)
  }

  const handleFetchAllMessages = async (id) => {
    setIsMsgSent(false)
    const allMessages = await fetchMessagesByChatId(id)
    console.log("all messages", allMessages.data.data)
    setAllMessages(allMessages?.data.data)
  }

  useEffect(() => {
    handleFetchAllMessages(id)
  }, [isMsgSent]);

  return (
    <>
      <div className='h-[100vh]  flex flex-col xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center items-center'>

        <div className='pt-13 relative xl:mb-0 w-[100vw] border-gray-500 md:w-[100vw] xl:w-[50vw] h-full'>

          <div className='flex flex-col gap-2 mx-3 pt-3 pb-15'>
            {
              allMessages &&
              allMessages.map((msg, index) => (
                <div key={index} className={`rounded-xl flex ${msg.sender._id == currentUserId ? 'justify-end' : 'justify-start'} `}>
                  <div className={`flex flex-col rounded-xl p-2  text-[18px] max-w-[75%] w-fit break-words text-black ${msg.sender._id == currentUserId ? 'bg-green-300 ' : 'bg-blue-300 '} `}>
                    <span className="text-[17px] md:text-[21px] lg:text-[22px] xl:text-[18px]">
                      {msg.content}
                    </span>
                    <span className='text-[12px] self-end'>{FormatTime(msg.createdAt)}</span>
                  </div>
                </div>
              ))
            }
          </div>

          <div className={`w-full xl:w-[50%] h-14 fixed bottom-0 flex items-center gap-2 px-2 xl:px-0  ${mode == 'light' ? 'bg-[#ffffff] ' : 'bg-[#0e0e0e] '}`}>
            <input
              type="text"
              className='h-10 w-[90%] border-1 border-gray-500 pl-2 rounded-xl placeholder:text-gray-500'
              placeholder='enter your message...'
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <div className='w-[10%] flex items-center justify-center bg-blue-400 h-10 rounded-xl hover:cursor-pointer hover:bg-blue-500'
              onClick={() => handleSendNewMessage(id, inputMessage)}
            >
              <i className="fa-regular fa-paper-plane text-xl text-black"></i>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ChatMessages;
