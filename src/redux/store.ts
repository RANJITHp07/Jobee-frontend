import { configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook,useSelector} from "react-redux"
import authReducer from "./features/auth-slice"
import saveReducer from "./features/save-slice"
import loadingReducer from "./features/loading-slice"

export const store=configureStore({
    reducer:{
        authReducer,
        saveReducer,
        loadingReducer,
    }
})

export type RootStore=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
export const useAppSelector:TypedUseSelectorHook<RootStore> = useSelector