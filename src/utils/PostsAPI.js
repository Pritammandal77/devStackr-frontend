import axiosInstance from "./axiosInstance";

const getPostById = async (postId) => {
    try {
        const res = await axiosInstance.get(`/api/v1/posts/getpostbyid/${postId}`)
        return res
    } catch (error) {
        console.error("Error while fetching user posts:", error.message);
    }
}

const editPost = async (postId, description) => {
    try {
        const res = await axiosInstance.post(`/api/v1/posts/editpost/${postId}`, {
            description
        })
        return res
    } catch (error) {
        console.log("error while deleting a post", error)
    }
}

export {
    getPostById,
    editPost
}