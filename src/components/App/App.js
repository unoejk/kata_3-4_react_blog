// react
import React,{useState,useEffect} from 'react'
// router
import {BrowserRouter as Router,Route,Link,withRouter,Redirect,Switch} from 'react-router-dom'
// stores
import {useDispatch,useSelector,useStore} from 'react-redux'
import {updateArticles} from '../../store/slices/articlesSlice'
// styles
import style from './App.module.scss'
// components
import Header from './Header/Header'
import PostsList from './PostsList/PostsList'
import OpenPost from './OpenPost/OpenPost'

const App=()=>{
    // ---- store
    const dispatch=useDispatch()
    const {actualPage,perPage}=useSelector((state)=>state.articlesSlice)

    // ---- update
    useEffect(()=>{
        ;(async()=>{
            await dispatch(updateArticles((actualPage-1)*perPage))
            // console.log(actualPage)
        })()
    },[actualPage])

    // const update=()=>dispatch(updateArticles())
    // const show=useSelector((state)=>state.articlesSlice.articles)

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
                    {/*<Redirect to={'/'}/>*/}
                </Switch>
            </main>
        </div>
    )
}

export default App
