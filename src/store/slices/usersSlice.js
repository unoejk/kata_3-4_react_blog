import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const home='https://blog.kata.academy/api/'

const initialState={
    isUsersLoading:true,
    token:'',
    user:{},
    username:'',
    email:'',
}

const usersSlice=createSlice({
    name:'usersSlice',
    initialState,
    reducers:{
        setUsersLoading:(state,action)=>{
            state.isUsersLoading=action.payload
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setUsername:(state,action)=>{
            state.username=action.payload
        },
        setEmail:(state,action)=>{
            state.email=action.payload
        },
    },
})

export const {setUsersLoading,setToken,setUser,setUsername,setEmail}=usersSlice.actions
export default usersSlice.reducer