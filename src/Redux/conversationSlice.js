import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
export const getConversation = createAsyncThunk(
    'conversation/getConversation',
    async (authData) =>{
        const {data} = await axios.get(`/conversation/${authData?.id}` , {headers:{'authorization': `Bearer ${authData?.token}`}})
        return {data}
    }
)
// export const postConversation = createAsyncThunk(
//     'conversation/postConversation',
//     async (authData) =>{
//         const postData ={
//             "senderId":authData.senderId, 
//             "reciverId":authData.reciverId
//         }
//         const {data} = await axios.post('/conversation' , postData,{headers:{'authorization': `Bearer ${authData?.token}`}})
//         return data
//     }
// )
const conversationSlice = createSlice({
    name:"conversation",
    initialState : {
        conversation:[],
        state:false,
        status:null
    },
    reducers:{
        updateState:(state)=>{
            state.state = !state.state
        }
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
export const {updateState} = conversationSlice.actions
export default conversationSlice.reducer