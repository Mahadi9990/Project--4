import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist"
import userSlice from "./user/userSlice.js";
import storage from 'redux-persist/lib/storage'
import ThemeSlice from "./theme/ThemeSlice.js";

const rootReducer =combineReducers({
    user:userSlice,
    theme:ThemeSlice
})

const persistConfig ={
    key:"root",
    version:1,
    storage
    
}

const persistedReducer =persistReducer(persistConfig,rootReducer)

export const store =configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})


export const persistor =persistStore(store)