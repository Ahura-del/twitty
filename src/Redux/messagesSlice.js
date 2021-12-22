import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (authData) => {
      try {
          const { data } = await axios.get(`/messages/${authData.id}`, {
            headers: { "authorization": `Bearer ${authData.token}` },
          });
          return {data , user:authData.user};
          
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
    status: null,
  },
  extraReducers: {
    [getMessages.pending]: (state) => {
      state.status = "loading";
    },
    [getMessages.fulfilled]: (state, action) => {
      state.status = "success";
      state.messages = action.payload.data;
      state.user = action.payload.user
    },
    [getMessages.rejected]: (state) => {
      state.status = "faild";
    },
  },
});
export default messagesSlice.reducer;
