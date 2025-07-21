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

export {
    createOrFetchChat,
    fetchChats
}