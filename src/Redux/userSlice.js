import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
export const getUser = createAsyncThunk(
    'user/getUser',
    async (authData) =>{
        const {data} = await axios.get(`/user/${authData.id}` , {headers:{'authorization': `Bearer ${authData.token}`}})
        return data
    }
)
const userSlice = createSlice({
    name:"user",
    initialState : {
        user:[],
        status:null
    },
    extraReducers:{
        [getUser.pending] : (state ) =>{
            state.status = 'loading'
        },
        [getUser.fulfilled]: (state , action)=>{
            state.status = 'success';
            state.user = action.payload
        },
        [getUser.rejected] : (state )=>{
            state.status = 'faild'
        }
    }
})
// export const {userState} = userSlice.actions
export default userSlice.reducer