import {createSlice} from '@reduxjs/toolkit'

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
    },
})

export const {setUsersLoading,setToken,setUser}=usersSlice.actions
export default usersSlice.reducer