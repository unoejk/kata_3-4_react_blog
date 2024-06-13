import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {getArticles} from '../../servises/fetch'

const initialState={
    isArticlesLoading:true,
	isArticlesError:false,
    articles:[],
    articlesCount:0,
    actualPage:1,
    // ----
    perPage:5,
}

export const updateArticles=createAsyncThunk(
    'articles/updateArticles',
    async(props)=>{
		// console.log('updateArticles')
		const token=props.token || JSON.parse(localStorage.getItem('token'))
		const offset=props.offset?props.offset:0
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
		replaceArticle:(state,action)=>{
			const index=state.articles.findIndex(val=>val.slug===action.payload.slug)
			state.articles=[
				...state.articles.slice(0,index),
				action.payload,
				...state.articles.slice(index+1,state.articles.length)
			]
		},
    },
    extraReducers:(builder)=>{
        builder.addCase(updateArticles.pending,(state)=>{
            state.isArticlesLoading=true
        })
        builder.addCase(updateArticles.fulfilled,(state,action)=>{
            state.articles=action.payload.articles
            state.articlesCount=action.payload.articlesCount
            state.isArticlesLoading=false
        })
        builder.addCase(updateArticles.rejected,(state,action)=>{
			state.isArticlesError=action.error.message
        })
    },
})

export const {setPage,replaceArticle}=articlesSlice.actions
export default articlesSlice.reducer