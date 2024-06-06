import {createSlice} from '@reduxjs/toolkit'

const initialState={
    counter:0,
}

const counterSlice=createSlice({
    name:'counter',
    initialState,
    reducers:{
        changeCounter:(state,action)=>{
            if(action.payload==='inc'){
                state.counter++
                return
            }
            if(action.payload==='dec'){
                state.counter--
                return
            }
            state.counter=0
        }
    }
})

export default counterSlice.reducer
export const {changeCounter}=counterSlice.actions
