import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Pagination,Spin} from 'antd'
import style from './PostsList.module.scss'
import PostCard from './PostCard/PostCard'
import {changePage} from '../../../store/slices/articlesSlice'
import classNames from 'classnames'

const PostsList=(props)=>{
    // ---- store
    const {isArticlesLoading,articles,articlesCount,actualPage,perPage}=useSelector(state=>state.articlesSlice)
    const dispatch=useDispatch()

    // const [takeMeName,setTakeMeName]=useState(undefined)
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
                onChange={(e)=>dispatch(changePage(e))}
                showSizeChanger={false}
            />
        </div>
    )
}

export default PostsList
