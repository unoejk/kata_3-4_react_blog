import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {getArticles as getFromFetch} from '../../servises/fetch'

const initialState={
    articles:[],
    articlesCount:0,
}

const getArticles=createAsyncThunk('articles/getArticles',async ()=>{
    const res=await getFromFetch()
    return res.articles
    // return 'text'
})

const articlesSlice=createSlice({
    name:'articlesSlice',
    initialState,
    reducers:{
        testReducer:(state,action)=>{},
    },
    extraReducers:(builder)=>{
        builder.addCase(getArticles.fulfilled,(state,action)=>{
            // console.log(action.payload)
            console.log(action.payload)
            state.articles=action.payload
        })
    }
})

export default articlesSlice.reducer
export {getArticles}
// export const {updateArticles}=articlesSlice.actions