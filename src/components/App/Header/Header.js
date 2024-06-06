import React,{useState} from 'react'
import style from './Header.module.scss'

const Header=(props)=>{
    // const [takeMeName,setTakeMeName]=useState(undefined)
    return (
        <nav className={style.header}>
            <div className={style.header__sideBlock}>
                <button className={`${style.header__btn} ${style['header__btn--bold']}`}>
                    <h1>Realworld Blog</h1>
                </button>
            </div>
            <div className={style.header__sideBlock}>
                <button className={style.header__btn}>Sign In</button>
                <button className={`${style.header__btn} ${style['header__btn--greenBorder']}`}>Sign Up</button>
                <button className={`${style.header__btn} ${style['header__btn--greenBorder']}`}>Create article</button>
                <button className={`${style.header__btn} ${style.header__userBox}`}>
                    <button className={style.header__userName}>John Doe</button>
                    <div className={style.header__userPic}></div>
                </button>
                <button className={`${style.header__btn} ${style['header__btn--blackBorder']}`}>Log Out</button>
            </div>
        </nav>
    )
}

export default Header
