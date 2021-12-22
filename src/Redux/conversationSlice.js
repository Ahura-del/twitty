import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
export const getConversation = createAsyncThunk(
    'conversation/getConversation',
    async (authData) =>{
        const {data} = await axios.get(`/conversation/${authData?.id}` , {headers:{'authorization': `Bearer ${authData?.token}`}})
        return data
    }
)
const conversationSlice = createSlice({
    name:"conversation",
    initialState : {
        conversation:[],
        status:null
    },
    extraReducers:{
        [getConversation.pending] : (state ) =>{
            state.status = 'loading'
        },
        [getConversation.fulfilled]: (state , action)=>{
            state.status = 'success';
            state.conversation = action.payload
        },
        [getConversation.rejected] : (state )=>{
            state.status = 'faild'
        }
    }
})
export default conversationSlice.reducer