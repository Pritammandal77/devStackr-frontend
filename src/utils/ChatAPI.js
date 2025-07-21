import { toast } from "sonner"
import axiosInstance from "./axiosInstance"

const createOrFetchChat = async (userId) => {
    try {
        const chat = await axiosInstance.post("/api/v1/chat/createchat", {
            userId: userId
        })
        console.log("chat", chat)
    } catch (error) {
        console.log("error generated while creating or fetching chat", error)
        toast.error("error while creating chat")
    }
}

export {
    createOrFetchChat
}