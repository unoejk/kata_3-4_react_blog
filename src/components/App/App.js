// react
import React,{useState,useEffect} from 'react'
// router
import {BrowserRouter as Router,Route,Link,withRouter,Redirect,Switch} from 'react-router-dom'
// stores
import {useDispatch,useSelector,useStore} from 'react-redux'
import {setUsersLoading,setToken,setUser} from '../../store/slices/usersSlice'
// fetch
import {getUser,signIn} from '../../servises/fetch'
// styles
import style from './App.module.scss'
// components
import Header from './Header/Header'
import PostsList from './PostsList/PostsList'
import OpenPost from './OpenPost/OpenPost'
import SignIn from './UserForms/SignIn'
import SignUp from './UserForms/SignUp'
import EditProfile from './UserForms/EditProfile'
import EditArticle from './EditArticle/EditArticle'

const App=()=>{
    const dispatch=useDispatch()

    const tryAutoLogin=async()=>{
        try{
            // быстро ставим данные в store из localStorage
            let oldToken=JSON.parse(localStorage.getItem('token'))
            let oldUser=JSON.parse(localStorage.getItem('user'))
            dispatch(setToken(oldToken))
            dispatch(setUser(oldUser))

            // обновляем данные в store через повторный signIn
            const res=await signIn({
                user:{
                    email:JSON.parse(localStorage.getItem('user')).email,
                    password:JSON.parse(localStorage.getItem('user')).password,
                },
            })
            dispatch(setToken(res.newToken))
            dispatch(setUser(res.newUser))
        }catch{
            localStorage.clear()
        }
    }

    useEffect(()=>{
        ;(async()=>{
            // console.log('App useEffect')
            dispatch(setUsersLoading(true))
            await tryAutoLogin()
            dispatch(setUsersLoading(false))
        })()
    },[])

    return (
        <div className={style.app}>
            <header className={style.app__header}>
                <Header/>
            </header>
            <main className={style.app__main}>
                <Switch>
                    <Route path={'/'} exact component={PostsList}/>
                    <Route path={'/articles/'} exact component={PostsList}/>
                    <Route path={'/articles/:slug/'} exact component={OpenPost}/>
                    <Route path={'/sign-in/'} exact component={SignIn}/>
                    <Route path={'/sign-up/'} exact component={SignUp}/>
                    <Route path={'/profile/'} exact component={EditProfile}/>
                    <Route path={'/new-article/'} exact component={EditArticle}/>
                    <Route path={'/articles/:slug/edit/'} exact component={EditArticle}/>
                    {/*<Redirect to={'/'}/>*/}
                </Switch>
            </main>
        </div>
    )
}

export default App
