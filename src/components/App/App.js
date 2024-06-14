// react
import React, { useEffect } from 'react'
// router
import { Route, Redirect, Switch } from 'react-router-dom'
// stores
import { useDispatch, useSelector } from 'react-redux'
import { setUsersLoading, setToken, setUser } from '../../store/slices/usersSlice'
// fetch
import { getUser } from '../../servises/fetch'
// styles
import style from './App.module.scss'
// components
import Header from './Header/Header'
import PostsList from './PostsList/PostsList'
import OpenPost from './OpenPost/OpenPost'
import SignIn from './UserForms/SignIn'
import SignUp from './UserForms/SignUp'
import EditProfile from './UserForms/EditProfile'
import CreateArticle from './ArticleForms/CreateArticle'
import EditArticle from './ArticleForms/EditArticle'

const App = () => {
	const dispatch = useDispatch()
	const { isUsersLoading, token } = useSelector((state) => state.usersSlice)

	const tryAutoLogin = async () => {
		try {
			const oldToken = JSON.parse(localStorage.getItem('token'))
			if (!oldToken) {
				localStorage.clear()
				return
			}
			const res = await getUser(oldToken)
			dispatch(setToken(res.newToken))
			dispatch(setUser(res.newUser))
		} catch {
			localStorage.clear()
		}
	}

	useEffect(() => {
		;(async () => {
			dispatch(setUsersLoading(true))
			await tryAutoLogin()
			dispatch(setUsersLoading(false))
		})()
	}, [])

	const PrivateRoute = (props) => {
		if (token || isUsersLoading) {
			return <Route {...props} />
		} else {
			return <Redirect to={'/sign-in/'} />
		}
	}

	return (
		<div className={style.app}>
			<header className={style.app__header}>
				<Header />
			</header>
			<main className={style.app__main}>
				<Switch>
					<Route path={'/'} exact component={PostsList} />
					<Route path={'/articles/'} exact component={PostsList} />
					<Route path={'/articles/:slug/'} exact component={OpenPost} />
					<Route path={'/sign-in/'} exact component={SignIn} />
					<Route path={'/sign-up/'} exact component={SignUp} />
					<PrivateRoute path={'/profile/'} exact component={EditProfile} />
					<PrivateRoute path={'/new-article/'} exact component={CreateArticle} />
					<PrivateRoute path={'/articles/:slug/edit/'} exact component={EditArticle} />
					{/*<Redirect to={'/'} />*/}
				</Switch>
			</main>
		</div>
	)
}

export default App
