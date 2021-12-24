import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const postMessages = createAsyncThunk(
//   "message/postMessages",
//   async (authData) => {
//     const postData = {
//       "conversationId":authData.conversationId,
//       "sender":authData.sender,
//       "text": authData.text
//     };
//       try {
//           const  data  = await axios.post('/messages', postData ,{
//             headers: { "authorization": `Bearer ${authData.token}` },
//           });
//           return data;
          
//       } catch (error) {
//           console.log(error)
//       }
//   }
// );

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (authData) => {
      try {
          const  data  = await axios.get(`/messages/${authData.id}`, {
            headers: { "authorization": `Bearer ${authData.token}` },
          });
          return {data , user:authData.user , conversationId: authData.conversationId};
          
      } catch (error) {
          console.log(error)
      }
  }
);
const messagesSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    user:'',
    conversationId:'',
    status: null,
  }, 
  reducers:{
    reciverId :(state , action)=>{
      state.user = action.payload.user;
    }
  },
  extraReducers: {
 
    [getMessages.pending]: (state) => {
      state.status = "loading";
    },
    [getMessages.fulfilled]: (state, action) => {
      state.status = "success";
      state.messages = action.payload.data;
      state.user = action.payload.user;
      state.conversationId = action.payload.conversationId
    },
    [getMessages.rejected]: (state) => {
      state.status = "faild";
    },
  },
});
export const {reciverId} = messagesSlice.actions
export default messagesSlice.reducer;
