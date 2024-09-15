import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        singInStart: (state) => {
            state.error = null,
            state.loading = true
        },
        singInSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false
            state.error =null
        },
        singInFailuar: (state, action) => {
            state.error = action.payload,
            state.loading =false
        },
        updateStart:(state)=>{
            state.error =null,
            state.loading =true
        },
        updateSuccess:(state,action)=>{
            state.currentUser =action.payload,
            state.error =null,
            state.loading =false
        },
        updateFailure:(state,action)=>{
            state.error =action.payload
            state.loading =false
        }
    }
})

export const {
    singInStart,
    singInSuccess,
    singInFailuar,
    updateStart,
    updateSuccess,
    updateFailure
} = userSlice.actions

export default userSlice.reducer;


