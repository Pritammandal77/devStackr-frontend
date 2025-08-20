import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        currentSelectedChat: [""]
    },
    reducers: {
        setCurrentSelectedChat: (state, actions) => {
            state.currentSelectedChat = actions.payload
        }
    }
})

export const { setCurrentSelectedChat } = chatSlice.actions
export default chatSlice.reducer