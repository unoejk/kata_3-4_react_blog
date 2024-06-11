import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {getArticles} from '../../servises/fetch'

const home='https://blog.kata.academy/api/'

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
    async(offset=0)=>{
        // console.log('updateArticles')
        // return fetch(home+'articles?limit='+initialState.perPage+'&offset='+offset)
        //     .then((res)=>res.json())
        return await getArticles(initialState.perPage,offset)
    },
)
// export const updateArticle=createAsyncThunk(
//     'articles/getArticle',
//     async(slug)=>{
//         // console.log('updateArticles')
//         return fetch(home+'articles/'+slug)
//             .then((res)=>res.json())
//     },
// )

const articlesSlice=createSlice({
    name:'articlesSlice',
    initialState,
    reducers:{
        changePage:(state,action)=>{
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

export const {changePage}=articlesSlice.actions
export default articlesSlice.reducer