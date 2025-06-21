import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        userData: [],
        isLoggedIn: "false"
    },
    reducers: {
        setUserData: (state, actions) => {
            state.userData = actions.payload
        },
        setIsLoggedIn: (state, actions) => {
            state.isLoggedIn = actions.payload
        }
    }
})

export const { setUserData, setIsLoggedIn } = userDataSlice.actions
export default userDataSlice.reducer