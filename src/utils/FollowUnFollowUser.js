import { toast } from "sonner"
import axiosInstance from "./axiosInstance"

const followUser = async (userId) => {
    try {
        const res = await axiosInstance.post("/api/v1/follows/follow", {
            userToFollow: userId
        })
        toast(res.data.message)
    } catch (error) {
        console.log("error while following a user")
    }
}

const unFollowUser = async (userId) => {
    try {
        const res = await axiosInstance.post("/api/v1/follows/unfollow", {
            userToUnfollowId: userId
        })
        toast(res.data.message)
    } catch (error) {
        console.log("error while unfollwowing the user")
    }
}

const getFollowersList = async (id) => {
    try {
        const res = await axiosInstance.get(`/api/v1/follows/followerslist/${id}`)
        return res.data.data
    } catch (error) {
        console.log("error while fetching the followers")
    }
}

const getFollowingsList = async (id) => {
    try {
        const res = await axiosInstance.get(`/api/v1/follows/followingslist/${id}`)
        return res.data.data
    } catch (error) {
        console.log("error while fetching the followings")
    }
}

export { followUser, unFollowUser, getFollowersList, getFollowingsList }