// react
import React,{useState} from 'react'
// router
import {BrowserRouter as Router,Route,Link,withRouter,Redirect,Switch} from 'react-router-dom'
// stores
import {useDispatch,useSelector,useStore} from 'react-redux'
import {getArticles} from '../../store/slices/articlesSlice'
// styles
import style from './App.module.scss'
// components
import CompName from '../CompName/CompName'
import Header from './Header/Header'
import PostsList from './PostsList/PostsList'

const App=()=>{
    const dispatch=useDispatch()

    ;(async ()=>{
        console.log('hi')
    })()

    const update=()=>dispatch(getArticles())
    const show=useSelector((state)=>state.articlesSlice.articles)

    return (
        <Router>
            <button onClick={update}>text {show[0]===undefined?'text':show[2].body}</button>

            <div className={style.app}>
                <header  className={style.app__header}>
                    <Header/>
                </header>
                <main className={style.app__main}>
                    <Switch>
                        <Route path={'/'} exact component={PostsList}/>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App
