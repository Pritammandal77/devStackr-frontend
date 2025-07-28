import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createOrFetchChat, fetchMessagesByChatId, sendMessage } from '../../utils/ChatAPI';
import { useSelector } from 'react-redux';
import { FormatTime } from '../../utils/FormatTime';
import { io } from "socket.io-client";
import { useRef } from 'react';

function ChatMessages() {

  const socket = useRef(); //persist socket across renders
  const selectedChatCompare = useRef(); //hold current selected chat

  const currentUserData = useSelector((state) => state.userData?.currentUserData?.data);
  const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id);
  const mode = useSelector((state) => state.mode.mode);
  const currentSelectedChat = useSelector((state) => state.chat.currentSelectedChat);

  const { id } = useParams(); // chatId

  const [inputMessage, setInputMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isMsgSent, setIsMsgSent] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  //Setup socket connection
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_BASE_URL); //for production

    socket.current.emit("setup", currentUserData);

    socket.current.on("connected", () => {
      setSocketConnected(true);
      console.log("Socket connected");
    });

    // cleanup on unmount
    return () => {
      socket.current.disconnect();
    };
  }, [currentUserData]);

  // Handle sending new message
  const handleSendNewMessage = async (chatId, inputMessage) => {
    if (!inputMessage.trim()) return;

    setInputMessage("");

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
    // Scroll to latest message
    // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    bottomRef.current?.scrollIntoView();
  }, [allMessages]); // Whenever messages update, scroll to bottom


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
                  {
                    index === allMessages.length - 1 && <div ref={bottomRef} />
                  }

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






























//old code
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { createOrFetchChat, fetchMessagesByChatId, sendMessage } from '../../utils/ChatAPI';
// import { useSelector } from 'react-redux';
// import { FormatTime } from '../../utils/FormatTime';
// import { io } from "socket.io-client";

// function ChatMessages() {

//   let socket, selectedChatCompare;

//   const currentUserData = useSelector((state) => state.userData?.currentUserData?.data)
//   const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id)
//   const mode = useSelector((state) => state.mode.mode)
//   const currentSelectedChat = useSelector((state) => state.chat.currentSelectedChat)

//   console.log("curr Chat ", currentSelectedChat._id)

//   const { id } = useParams() //this is the ChatId

//   const [inputMessage, setInputMessage] = useState("")
//   const [allMessages, setAllMessages] = useState([])   // to store all the messages

//   // ye state sirf iliye lagaya ke taaki , jab bhe user koi new msg send kare ,
//   //  toh fetchallMessages bhe firse call ho jaaye , kyuki mene is state as a dependency lagaya hain
//   const [isMsgSent, setIsMsgSent] = useState(false)

//   //code for socket.io
//   const [socketConected, setSocketConnected] = useState(false)

//   useEffect(() => {
//     socket = io("http://localhost:8000");
//     socket.emit("setup", currentUserData)
//     socket.on("connection", () => setSocketConnected(true))
//     console.log(socket)
//   }, []);


//   const handleSendNewMessage = async (id, inputMessage) => {
//     setInputMessage("")
//     const messageSent = await sendMessage({
//       chatId: id,
//       message: inputMessage
//     });
//     console.log("Message sent:", messageSent);
//     setIsMsgSent(true)

//     socket.emit('new message', messageSent)
//   };

//   if (inputMessage) {
//     console.log(inputMessage)
//   }

//   const handleFetchAllMessages = async (id) => {
//     setIsMsgSent(false)
//     const allMessages = await fetchMessagesByChatId(id)
//     console.log("all messages", allMessages.data.data)
//     setAllMessages(allMessages?.data.data)

//     socket.emit('join chat', id) //passing  the currRoom Id to socket
//   }

//   useEffect(() => {
//     handleFetchAllMessages(id)

//     selectedChatCompare = currentSelectedChat
//   }, [isMsgSent]);

//   useEffect(() => {
//     socket.on('message received', (newMessageReceived) => {
//       if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
//         //give notification
//       } else {
//         setAllMessages([...allMessages, newMessageReceived])
//       }
//     })
//   });



//   return (
//     <>
//       <div className='h-[100vh]  flex flex-col xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center items-center'>

//         <div className='pt-13 relative xl:mb-0 w-[100vw] border-gray-500 md:w-[100vw] xl:w-[50vw] h-full'>

//           <div className='flex flex-col gap-2 mx-3 pt-3 pb-15'>
//             {
//               allMessages &&
//               allMessages.map((msg, index) => (
//                 <div key={index} className={`rounded-xl flex ${msg.sender._id == currentUserId ? 'justify-end' : 'justify-start'} `}>
//                   <div className={`flex flex-col rounded-xl p-2  text-[18px] max-w-[75%] w-fit break-words text-black ${msg.sender._id == currentUserId ? 'bg-green-300 ' : 'bg-blue-300 '} `}>
//                     <span className="text-[17px] md:text-[21px] lg:text-[22px] xl:text-[18px]">
//                       {msg.content}
//                     </span>
//                     <span className='text-[12px] self-end'>{FormatTime(msg.createdAt)}</span>
//                   </div>
//                 </div>
//               ))
//             }
//           </div>

//           <div className={`w-full xl:w-[50%] h-14 fixed bottom-0 flex items-center gap-2 px-2 xl:px-0  ${mode == 'light' ? 'bg-[#ffffff] ' : 'bg-[#0e0e0e] '}`}>
//             <input
//               type="text"
//               className='h-10 w-[90%] border-1 border-gray-500 pl-2 rounded-xl placeholder:text-gray-500'
//               placeholder='enter your message...'
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//             />
//             <div className='w-[10%] flex items-center justify-center bg-blue-400 h-10 rounded-xl hover:cursor-pointer hover:bg-blue-500'
//               onClick={() => handleSendNewMessage(id, inputMessage)}
//             >
//               <i className="fa-regular fa-paper-plane text-xl text-black"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// }

// export default ChatMessages;

