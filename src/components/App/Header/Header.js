import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {setToken} from '../../../store/slices/usersSlice'
import classNames from 'classnames'
import style from './Header.module.scss'

const Header=(props)=>{
    const dispatch=useDispatch()
    const {isUsersLoading,token,user}=useSelector((state)=>state.usersSlice)

    const logOut=()=>{
        dispatch(setToken(''))

        localStorage.clear()
    }

    return (
        <nav className={style.header}>
            <div className={style.header__sideBlock}>
                <Link
                    className={`${style.header__btn} ${style['header__btn--bold']}`}
                    to={'/'}
                >
                    <h1>Realworld Blog</h1>
                </Link>
            </div>
            <div className={style.header__sideBlock}>
                <Link
                    className={classNames(
                        style.header__btn,
                        {'disabled':token}
                    )}
                    to={'/sign-in/'}
                >Sign In</Link>
                <Link
                    className={classNames(
                        style.header__btn,
                        style['header__btn--greenBorder'],
                        {'disabled':token}
                    )}
                    to={'/sign-up/'}
                >Sign Up</Link>
                <button
                    className={classNames(
                        style.header__btn,
                        style['header__btn--greenBorder'],
                        {'disabled':!token}
                    )}
                >Create article</button>
                <Link
                    className={classNames(
                        style.header__btn,
                        style.header__userBox,
                        {'disabled':!token},
                    )}
                    to={'/profile/'}
                >
                    <span className={style.header__userName}>{user.username}</span>
                    <img
                        className={style.header__userPic}
                        src={user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                        alt={'userPic'}
                    />
                </Link>
                <button
                    className={classNames(
                        style.header__btn,
                        style['header__btn--blackBorder'],
                        {'disabled':!token}
                    )}
                    onClick={logOut}
                >Log Out</button>
            </div>
        </nav>
    )
}

export default Header
