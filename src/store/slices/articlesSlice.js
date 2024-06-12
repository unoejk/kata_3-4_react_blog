import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'

import {getArticles} from '../../servises/fetch'

// const {token}=useSelector(state=>state.usersSlice)

const initialState={
    isArticlesLoading:true,
    articles:[],
    articlesCount:0,
    actualPage:1,
    // ----
    perPage:5,
}

export const updateArticles=createAsyncThunk(
    'articles/updateArticles',
    async(token,offset=0)=>{
        return await getArticles(token,initialState.perPage,offset)
    },
)

const articlesSlice=createSlice({
    name:'articlesSlice',
    initialState,
    reducers:{
        setPage:(state,action)=>{
            state.actualPage=action.payload
        },
    },
    extraReducers:(builder)=>{
        // ---- updateArticles
        builder.addCase(updateArticles.pending,(state,action)=>{
            // console.log('pending')
            state.isArticlesLoading=true
        })
        builder.addCase(updateArticles.fulfilled,(state,action)=>{
            // console.log('fulfilled')
            state.articles=action.payload.articles
            state.articlesCount=action.payload.articlesCount
            state.isArticlesLoading=false
        })
        builder.addCase(updateArticles.rejected,(state,action)=>{
            throw new Error(action.error.message)
        })
    },
})

export const {setPage}=articlesSlice.actions
export default articlesSlice.reducer