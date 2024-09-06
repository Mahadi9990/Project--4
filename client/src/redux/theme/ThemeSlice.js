// import {createSlice} from '@reduxjs/toolkit'

// const initialState ={
//     theme:'light'
// }

// const themeSlice =createSlice({
//     name:'theme',
//     initialState,
//     reducers:{
//         toggoleTheme:
//             (state)=>{
//                 state.theme= state.theme=== "light"?"dark":"light"
//             }
        
//     }
// })

// export const {toggoleTheme} =themeSlice.actions

// export default themeSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    theme:'light'
}


const themeSlice =createSlice({
    name:'theme',
    initialState,
    reducers:{
        themeToggle:(state)=>{
            state.theme = state.theme === 'light'?'dark':'light'
        }
    }
})

export const {themeToggle} =themeSlice.actions

export default themeSlice.reducer