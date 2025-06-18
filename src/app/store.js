import { configureStore } from "@reduxjs/toolkit";
import { modeSlice } from "../features/ToggleMode";
import { userDataSlice } from "../features/UserProfileData";


const store = configureStore({
    reducer : {
        mode : modeSlice.reducer,
        userData : userDataSlice.reducer
    }
})

export default store;