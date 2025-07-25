import { toast } from "sonner"
import axiosInstance from "./axiosInstance"

const createOrFetchChat = async (userId) => {
    try {
        const chat = await axiosInstance.post("/api/v1/chat/createchat", {
            userId: userId
        })
        return chat
    } catch (error) {
        console.log("error generated while creating chat", error)
        toast.error("error while creating chat")
    }
}

const fetchChats = async () => {
    try {
        const fetchedChats = await axiosInstance.get("/api/v1/chat/fetchchats")
        return fetchedChats
    } catch (error) {
        console.log("error generated fetching chat", error)
        toast.error("error while fetching chat")
    }
}

const sendMessage = async (body) => {
    try {
        const message = await axiosInstance.post("/api/v1/message/send-message", body, {
            headers: {
                'Content-Type': 'application/json',  // ✅ JSON not multipart
            },
            withCredentials: true,
        });
        return message;
    } catch (error) {
        console.log("error while sending message", error);
        toast.error("error while sending message");
    }
};

const fetchMessagesByChatId = async (chatId) => {
    try {
        const chatMessages = await axiosInstance.get(`/api/v1/message/fetch-message/${chatId}`);
        return chatMessages;
    } catch (error) {
        console.log("error while fetching messages", error);
        toast.error("error while fetching messages");
    }
}

export {
    createOrFetchChat,
    fetchChats,
    sendMessage,
    fetchMessagesByChatId
}