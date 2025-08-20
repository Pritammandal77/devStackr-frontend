import { configureStore } from "@reduxjs/toolkit";
import { modeSlice } from "../features/ToggleMode";
import { userDataSlice } from "../features/UserProfileData";
import { chatSlice } from "../features/Chat";

const store = configureStore({
    reducer : {
        mode : modeSlice.reducer,
        userData : userDataSlice.reducer,
        chat : chatSlice.reducer
    }
})

export default store;