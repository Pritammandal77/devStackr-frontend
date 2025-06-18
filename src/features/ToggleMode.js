import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
    name : 'mode',
    initialState : {
        mode : 'light'
    },
    reducers : {
        setMode : (state, actions) => {
            state.mode = actions.payload
        }
    }
})

export const {setMode} = modeSlice.actions
export default modeSlice.reducer