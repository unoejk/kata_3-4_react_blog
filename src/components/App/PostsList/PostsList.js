import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Pagination,Spin} from 'antd'
import {setPage,updateArticles} from '../../../store/slices/articlesSlice'
import {signUp,signIn,getUser} from '../../../servises/fetch'
import classNames from 'classnames'
import style from './PostsList.module.scss'
import PostCard from './PostCard/PostCard'

const PostsList=(props)=>{
    const {isArticlesLoading,isArticlesError,articles,articlesCount,actualPage,perPage}=useSelector(state=>state.articlesSlice)
    const {token,flag}=useSelector(state=>state.usersSlice)
    const dispatch=useDispatch()

    useEffect(()=>{
        ;(async()=>{
			const myProps={
				token:token,
				offset:(actualPage-1)*perPage,
			}
            await dispatch(updateArticles(myProps))
        })()
    },[actualPage,token])

	return (
		<div className={style.postsList}>

			<Spin className={classNames(
				style.spin,
				{ 'disabled': !isArticlesLoading }
			)} size="large" />

			<p className={classNames(
				style.errorMessage,
				{ 'disabled': !isArticlesError }
			)}>{isArticlesError}</p>

			<ul className={classNames(
				style.postsList__list,
				{ 'disabled': isArticlesLoading || isArticlesError }
			)}>
				{
					articles.map(post =>
						<li className={style.postsList__item} key={post.slug}>
							<PostCard {...post} />
						</li>,
					)
				}
			</ul>

			<Pagination
				current={actualPage}
				pageSize={perPage}
				total={articlesCount}
				onChange={(e) => dispatch(setPage(e))}
				showSizeChanger={false}
			/>
		</div>
	)
}

export default PostsList
