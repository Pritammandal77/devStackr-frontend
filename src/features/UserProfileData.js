import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        currentUserData: [],
        isLoggedIn: "false"
    },
    reducers: {
        setCurrentUserData: (state, actions) => {
            state.currentUserData = actions.payload
        },
        setIsLoggedIn: (state, actions) => {
            state.isLoggedIn = actions.payload
        }
    }
})

export const { setCurrentUserData, setIsLoggedIn } = userDataSlice.actions
export default userDataSlice.reducer