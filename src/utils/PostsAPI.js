import axiosInstance from "./axiosInstance";

const getPostById = async (postId) => {
    try {
        const res = await axiosInstance.get(`/api/v1/posts/getpostbyid/${postId}`)
        return res
    } catch (error) {
        console.error("Error while fetching user posts:", error.message);
    }
}


export{
    getPostById
}