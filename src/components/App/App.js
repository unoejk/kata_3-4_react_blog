import React,{useState} from 'react'
import {BrowserRouter as Router,Route,Link,withRouter,Redirect,Switch} from 'react-router-dom'
import {useDispatch,useSelector,useStore} from 'react-redux'
import {changeCounter} from '../../store/slices/counterSlice'
import style from './App.module.scss'
import CompName from '../CompName/CompName'
import Header from './Header/Header'
import PostsList from './PostsList/PostsList'

const App=()=>{
    // const [takeMeName,setTakeMeName]=useState(undefined)
    const dispatch=useDispatch()
    const counter=useSelector(state=>state.counter.counter)

    return (
        <Router>

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
