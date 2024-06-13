import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Route,Link,withRouter,Redirect,Switch,useHistory,useLocation} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {format} from 'date-fns'
import ReactMarkdown from 'react-markdown'
import {Spin} from 'antd'
import { replaceArticle } from '../../../store/slices/articlesSlice'
import { getArticle, setLike } from '../../../servises/fetch'
import classNames from 'classnames'
import style from './OpenPost.module.scss'

const OpenPost=(props)=>{
    // ---- store
    const {isArticlesLoading,articles,articlesCount,actualPage,perPage}=useSelector(state=>state.articlesSlice)
	const {isUsersLoading,token,user}=useSelector((state)=>state.usersSlice)
    const dispatch=useDispatch()

    const [isLoading,setLoading]=useState(true)
    const [post,setPost]=useState({})

    const location=useLocation()
    useEffect(()=>{
        ;(async()=>{
            setLoading(true)

			let quickToken=token
			if (!quickToken) try {
				console.log('hi')
				quickToken=JSON.parse(localStorage.getItem('token'))
			}catch{}

            const slug=location.pathname
                .split('/')
                .reverse()
                .find(val=>val!=='')
            const res=await getArticle(slug,quickToken)
            setPost(res.article)
            await setLoading(false)
        })()
    },[])

	const handleSetLike=async ()=>{
		const newProps=await setLike(token,post.slug,post.favorited)
		// console.log(newProps)
		setPost(newProps.article)
	}

    if(isLoading){
        return <Spin className={style.spin} size="large"/>
    }else{
        return (
            <div className={style.openPost}>
                <div className={style.openPost__header}>
                    <div className={`${style.openPost__headerContentSide} ${style.contentSide}`}>
                        <div className={style.contentSide__header}>
                            <Link
                                className={style.contentSide__title}
                                to={'/articles/'+post.slug+'/'}
                            >
                                <h2>{post.title}</h2>
                            </Link>
                            <button
                                className={classNames(
                                    style.contentSide__likesCount,
                                    {[style['contentSide__likesCount--isLiked']]:post.favorited},
                                )}
								disabled={!token}
                                onClick={handleSetLike}
                            >{post.favoritesCount}</button>
                        </div>
                        <ul className={style.contentSide__tagsList}>
                            {
                                post.tagList.map(tag=>
                                    <li className={style.contentSide__tag} key={Math.random()*10**17}>{tag}</li>,
                                )
                            }
                        </ul>
                        <p className={style.contentSide__description}>{post.description}</p>
                    </div>
                    <div className={`${style.openPost__headerUserSide} ${style.userSide}`}>
                        <div className={style.userSide__column}>
                            <span className={style.userSide__userName}>{post.author.username}</span>
                            <span
                                className={style.userSide__creationTime}>{format(post.createdAt,'MMM dd, yyyy')}</span>
                        </div>
                        <div className={style.userSide__column}>
                            <img
                                className={style.userSide__userPic}
                                src={post.author.image}
                                alt={'userPic'}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.openPost__body}>
                    <ReactMarkdown>{post.body}</ReactMarkdown>
                </div>
            </div>
        )
    }
}

export default OpenPost
