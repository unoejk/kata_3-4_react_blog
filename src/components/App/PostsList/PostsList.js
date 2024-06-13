import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Pagination,Spin} from 'antd'
import classNames from 'classnames'
import style from './PostsList.module.scss'
import PostCard from './PostCard/PostCard'
import {setPage,updateArticles} from '../../../store/slices/articlesSlice'
import {signUp,signIn,getUser} from '../../../servises/fetch'

const PostsList=(props)=>{
    const {isArticlesLoading,articles,articlesCount,actualPage,perPage}=useSelector(state=>state.articlesSlice)
    const {token,flag}=useSelector(state=>state.usersSlice)
    const dispatch=useDispatch()

	// console.log('PostsList')

    useEffect(()=>{
        ;(async()=>{
			const myProps={
				token:token,
				offset:(actualPage-1)*perPage,
			}
            await dispatch(updateArticles(myProps))
			// console.log(articles[0]?.favorited)
			// console.log('PostsList useEffect')
        })()
    },[actualPage,token])

	// console.log(articles[0]?.favorited)
	// console.log('PostsList')

    return (
        <div className={style.postsList}>
            {/*<ul className={style.postsList__list}>*/}
            <Spin className={classNames(
                style.postsList__spin,
                {'disabled':!isArticlesLoading}
            )} size="large"/>
            <ul className={classNames(
                style.postsList__list,
                {'disabled':isArticlesLoading}
            )}>
                {
                    articles.map(post=>
                        <li className={style.postsList__item} key={post.slug}>
                            <PostCard {...post}/>
                        </li>,
                    )
                }
            </ul>
            <Pagination
                current={actualPage}
                pageSize={perPage}
                total={articlesCount}
                onChange={(e)=>dispatch(setPage(e))}
                showSizeChanger={false}
            />
        </div>
    )
}

export default PostsList
