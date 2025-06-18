import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        userData: []
    },
    reducers: {
        setUserData: (state, actions) => {
            state.userData = actions.payload
        }
    }
})

export const { setUserData } = userDataSlice.actions
export default userDataSlice.reducer