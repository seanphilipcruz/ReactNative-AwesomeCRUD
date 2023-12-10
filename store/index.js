import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/reducers";
import designationsReducer from "./designations/reducers";

const store = configureStore({
    reducer: {
        users: usersReducer,
        designations: designationsReducer
    }
})

export default store;
