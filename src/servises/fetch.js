import {createAsyncThunk} from '@reduxjs/toolkit'

const home='https://blog.kata.academy/api/'

// ---- forArticles

export const getArticles=async(token,perPage,offset)=>{
    return fetch(home+'articles?limit='+perPage+'&offset='+offset,{
        headers:token?{Authorization:'Token ' + token}:undefined
    })
        .then(res=>{
            if(res.ok)
                return res.json()
            else
                throw new Error('Server Error '+res.status)
        })
}

export const getArticle=async(slug)=>{
    return fetch(home+'articles/'+slug)
        .then(res=>{
            if(res.ok)
                return res.json()
            else
                throw new Error('Server Error '+res.status)
        })
}

// ---- forUsers

const mutateRes=async (res,userData)=>{
    if(res.ok){
        const resJson=await res.json()
        const newToken=resJson.user.token
        const newUser={
            username:resJson.user.username,
            email:resJson.user.email,
            password:userData.user.password,
            image:userData.user.image,
        }
        localStorage.setItem('token', JSON.stringify(newToken))
        localStorage.setItem('user', JSON.stringify(newUser))
        return {newToken,newUser}
    }
    else{
        throw new Error('Server Error '+res.status)
    }
}

export const signUp=async(userData)=>{
    return fetch(home+'users/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(userData),
    })
        .then(res=>mutateRes(res,userData))
}

export const signIn=async(userData)=>{
    return fetch(home+'users/login/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(userData),
    })
        .then(res=>mutateRes(res,userData))
}

export const updateUser=async(token,userData)=>{
    if(token){
        console.log(token)
        console.log(userData)
        return fetch(home+'user/',{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization:'Token '+token,
            },
            body:JSON.stringify(userData),
        })
            .then(res=>mutateRes(res,userData))
    }
}

// export const getUser=async(token)=>{
//     console.log(token)
//     if(token){
//         return fetch(home+'user/',{
//             headers:{Authorization:'Token '+token},
//         })
//             .then(res=>{
//                 if(res.ok)
//                     return res.json()
//                 else
//                     throw new Error('Server Error '+res.status)
//             })
//     }
// }
