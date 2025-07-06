import { toast } from "sonner"
import axiosInstance from "./axiosInstance"

const createComment = async (payload) => {
    try {
        const res = await axiosInstance.post("/api/v1/comments/createcomment", payload)
        return res.data
    } catch (error) {
        console.log("error occured while creating a comment", error)
        toast.error("error while commenting")
    }
}

const getCurrentPostComments = async (postId) => {
    try {
        const res = axiosInstance.get("/api/v1/comments/currentpostcomment", {
            params: { postId }
        })
        return res
    } catch (error) {
        console.log("error while fetching the comments", error)
    }
}

const deleteComment = async (id) => {
    try {
        const res = await axiosInstance.delete(`api/v1/comments/delete-comment/${id}`)
        return res
    } catch (error) {
        console.log("error while deleting a comment", error)
    }
}

export { createComment, getCurrentPostComments, deleteComment }