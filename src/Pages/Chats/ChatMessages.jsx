import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createOrFetchChat, fetchMessagesByChatId, sendMessage } from '../../utils/ChatAPI';
import { useSelector } from 'react-redux';
import { FormatTime } from '../../utils/FormatTime';
import { io } from "socket.io-client";
import { useRef } from 'react';
import Loader2 from '../../components/Loaders/Loader2'

function ChatMessages() {

  const socket = useRef(); // persist socket across renders
  const selectedChatCompare = useRef(); // hold current selected chat

  const currentUserData = useSelector((state) => state.userData?.currentUserData?.data);
  const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id);
  const mode = useSelector((state) => state.mode.mode);
  const currentSelectedChat = useSelector((state) => state.chat.currentSelectedChat);

  const { id } = useParams(); // chatId
  const navigate = useNavigate();

  const [inputMessage, setInputMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isMsgSent, setIsMsgSent] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  //Setup socket connection
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_BASE_URL);

    socket.current.emit("setup", currentUserData);

    socket.current.on("connected", () => {
      setSocketConnected(true);
      console.log("Socket connected");
    });

    socket.current.on('typing', () => setIsTyping(true))
    socket.current.on('stop typing', () => setIsTyping(false))

    // cleanup on unmount
    return () => {
      socket.current.disconnect();
    };
  }, [currentUserData]);

  // Handle sending new message
  const handleSendNewMessage = async (chatId, inputMessage) => {
    if (!inputMessage.trim()) return;

    setInputMessage("");
    socket.current.emit("stop typing", currentSelectedChat._id)
    try {
      const messageSent = await sendMessage({
        chatId,
        message: inputMessage
      });
      console.log("Message sent:", messageSent.data.data);
      setIsMsgSent(true);

      socket.current.emit('new message', messageSent.data.data);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  // Fetch all messages for the chat
  const handleFetchAllMessages = async (chatId) => {
    try {
      const res = await fetchMessagesByChatId(chatId);
      setAllMessages(res?.data.data || []);
      setIsMsgSent(false);

      socket.current.emit('join chat', chatId);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  //Fetch messages when chat or message sent changes
  useEffect(() => {
    handleFetchAllMessages(id);
    selectedChatCompare.current = currentSelectedChat;
  }, [id, isMsgSent, currentSelectedChat]);

  // Receive new messages
  useEffect(() => {
    if (!socket.current) return;

    const handleMessageReceived = (newMessageReceived) => {
      if (
        !selectedChatCompare.current ||
        selectedChatCompare.current._id !== newMessageReceived.chat._id
      ) {
        // TODO: Handle notification
        console.log("New message in another chat");
      } else {
        setAllMessages(prev => [...prev, newMessageReceived]);
      }
    };

    socket.current.on('message received', handleMessageReceived);

    return () => {
      socket.current.off('message received', handleMessageReceived); //clean listener
    };
  }, []);

  //to scroll to bottom , when user enters this page...
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView(); // Scroll to latest message
  }, [allMessages]); // Whenever messages update, scroll to bottom

  const handleTyping = (e) => {
    setInputMessage(e.target.value)

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true)
      socket.current.emit('typing', currentSelectedChat._id)
    }

    let lastTypingTime = new Date().getTime()
    const timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime()
      let timeDifference = timeNow - lastTypingTime

      if (timeDifference >= timerLength && typing) {
        socket.current.emit("stop typing", currentSelectedChat._id)
        setTyping(false)
      }

    }, timerLength);
  }

  return (
    <>
      <div className='h-[100vh]  flex flex-col xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center items-center'>

        <div className='pt-13 relative xl:mb-0 w-[100vw] border-gray-500 md:w-[100vw] xl:w-[50vw] h-full'>

          <div className='flex flex-col gap-2 mx-3 pt-3 pb-15'>
            {
              allMessages &&
              allMessages.map((msg, index) => (
                <div key={index} className={`rounded-xl flex ${msg.sender._id == currentUserId ? 'justify-end' : 'justify-start gap-1 md:gap-2'} `}>
                  {
                    msg.sender._id != currentUserId &&
                    <img src={msg.sender.profilePicture} alt="" className='h-8 w-8 rounded-full cursor-pointer' onClick={() => navigate(`/user/${msg.sender._id}`)} />
                  }
                  <div className={`flex flex-col rounded-xl p-2  text-[18px] max-w-[75%] w-fit break-words text-black ${msg.sender._id == currentUserId ? 'bg-green-300 ' : 'bg-blue-300 '} `}>
                    <span className="text-[17px] md:text-[21px] lg:text-[22px] xl:text-[18px] ">
                      {msg.content}
                    </span>
                    <span className='text-[12px] self-end'>{FormatTime(msg.createdAt)}</span>
                  </div>

                  {
                    index === allMessages.length - 1 && <div ref={bottomRef} />
                  }
                </div>
              ))
            }
          </div>
          {
            isTyping && <p className='text-xl text-black fixed bottom-14 ml-2'>typing...</p>
          }
          <div className={`z-[300] w-full xl:w-[50%] h-14 fixed bottom-0 flex items-center gap-2 px-2 xl:px-0  ${mode == 'light' ? 'bg-[#ffffff] ' : 'bg-[#0e0e0e] '}`}>
            <input
              type="text"
              className='h-10 w-[90%] border-1 border-gray-500 pl-2 rounded-xl placeholder:text-gray-500'
              placeholder='enter your message...'
              value={inputMessage}
              onChange={(e) => handleTyping(e)}
            />
            <div className='w-[10%] flex items-center justify-center bg-blue-400 h-10 rounded-xl hover:cursor-pointer hover:bg-blue-500'
              onClick={() => handleSendNewMessage(id, inputMessage)}
            >
              <i className="fa-regular fa-paper-plane text-xl text-black"></i>
            </div>
          </div>
        </div>
      </div>

      {
        allMessages.length == 0 &&
        // <Loader2 />
        <div className='absolute top-0 w-full h-screen fles items-center justify-center'>
          <p className='text-2xl'>Start your chat</p>
        </div>
      }
    </>
  );
}

export default ChatMessages;
