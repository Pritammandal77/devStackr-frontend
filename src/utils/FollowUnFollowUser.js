import { toast } from "sonner"
import axiosInstance from "./axiosInstance"

const followUser = async (userId) => {
    try {
        const res = await axiosInstance.post("/api/v1/follows/follow", {
            userToFollow: userId
        })
        // console.log(res.data.message)
        toast(res.data.message)
    } catch (error) {
        console.log("error while following a user", error)
    }
}

const unFollowUser = async (userId) => {
    try {
        const res = await axiosInstance.post("/api/v1/follows/unfollow", {
            userToUnfollowId: userId
        })
        // console.log(res)
        toast(res.data.message)
    } catch (error) {
        console.log("error while unfollwowing the user", error)
    }
}

const getFollowersList = async (id) => {
    try {
        const res = await axiosInstance.get(`/api/v1/follows/followerslist/${id}`)
        console.log(res)
        return res.data.data
    } catch (error) {
        console.log("error while fetching the followers", error)
    }
}

const getFollowingsList = async (id) => {
    try {
        const res = await axiosInstance.get(`/api/v1/follows/followingslist/${id}`)
        return res.data.data
    } catch (error) {
        console.log("error while fetching the followings", error)
    }
}

export { followUser, unFollowUser, getFollowersList, getFollowingsList }