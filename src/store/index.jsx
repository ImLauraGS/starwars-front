import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice";
import starshipsReducer from './starships/starshipSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        starships: starshipsReducer,
    },
});
