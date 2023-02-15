import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./utils/login";

export default configureStore({
    reducer:{
        login: loginSlice
    }
})