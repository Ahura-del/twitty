import {createSlice} from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name:'modal',
    initialState:{
        state: false,
        label:""
    },
    reducers:{
        modalState : (state , action) =>{
            state.state = action.payload.state
            state.label = action.payload.label
        }
    }
})

export const {modalState} = modalSlice.actions
export default modalSlice.reducer