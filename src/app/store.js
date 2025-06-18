import { configureStore } from "@reduxjs/toolkit";
import { modeSlice } from "../features/ToggleMode";


const store = configureStore({
    reducer : {
        mode : modeSlice.reducer
    }
})

export default store;