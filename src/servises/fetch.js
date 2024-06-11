import {createAsyncThunk} from '@reduxjs/toolkit'

const home = 'https://blog.kata.academy/api/'

export const getArticles=async (perPage,offset)=>{
    return fetch(home+'articles?limit='+perPage+'&offset='+offset)
        .then((res)=>{
            if(res.ok)
                return res.json()
            else
                throw new Error('Server Error '+res.status)
        })
}

export const getArticle=async (slug)=>{
    return fetch(home+'articles/'+slug)
        .then((res)=>{
            if(res.ok)
                return res.json()
            else
                throw new Error('Server Error '+res.status)
        })
}
