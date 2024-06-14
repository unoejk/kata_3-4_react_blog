import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { Spin, Popconfirm } from 'antd'
import classNames from 'classnames'
import { deleteArticle, getArticle, setLike } from '../../../servises/fetch'
import style from './OpenPost.module.scss'

const OpenPost = () => {
	// ---- store
	const { token, user } = useSelector((state) => state.usersSlice)

	const history = useHistory()
	const location = useLocation()

	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)

	const [post, setPost] = useState({})

	useEffect(() => {
		;(async () => {
			setIsLoading(true)
			const slug = location.pathname
				.split('/')
				.reverse()
				.find((val) => val !== '')

			const res = await getArticle(slug, token)

			setPost(res.article)
			await setIsLoading(false)
		})().catch((e) => {
			setIsError(e.message)
			setIsLoading(false)
		})
	}, [token])

	const handleSetLike = async () => {
		const newProps = await setLike(token, post.slug, post.favorited)
		setPost(newProps.article)
	}

	const deletePost = async () => {
		await deleteArticle(post.slug, token)
		history.push('/')
	}

	const goEdit = async () => {
		history.push('edit/')
	}

	if (isLoading) {
		return <Spin className={style.spin} size="large" />
	} else if (isError) {
		return <p className={style.errorMessage}>{isError}</p>
	} else {
		return (
			<article className={style.openPost}>
				<header className={style.openPost__header}>
					<div className={`${style.openPost__headerContentSide} ${style.contentSide}`}>
						<div className={style.contentSide__header}>
							<Link className={style.contentSide__title} to={'/articles/' + post.slug + '/'}>
								<h2>{post.title}</h2>
							</Link>
							<button
								className={classNames(style.contentSide__likesCount, {
									[style['contentSide__likesCount--isLiked']]: post.favorited,
								})}
								disabled={!token}
								onClick={handleSetLike}
							>
								{post.favoritesCount}
							</button>
						</div>
						<ul className={style.contentSide__tagsList}>
							{post.tagList.map((tag) => (
								<li className={style.contentSide__tag} key={Math.random() * 10 ** 17}>
									{tag}
								</li>
							))}
						</ul>
						<p className={style.contentSide__description}>{post.description}</p>
					</div>
					<div className={`${style.openPost__headerUserSide} ${style.userSide}`}>
						<div className={style.userSide__row}>
							<div className={style.userSide__column}>
								<span className={style.userSide__userName}>{post.author.username}</span>
								<span className={style.userSide__creationTime}>
									{format(post.createdAt, 'MMM dd, yyyy')}
								</span>
							</div>
							<div className={style.userSide__column}>
								<img
									className={style.userSide__userPic}
									src={
										post.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
									}
									alt={'userPic'}
								/>
							</div>
						</div>
						<div
							className={classNames(style.userSide__row, {
								disabled: post.author.username !== user?.username,
							})}
						>
							<Popconfirm
								className={style.userSide__btnWrap}
								description="Are you sure to delete this article?"
								placement="right"
								okText="Yes"
								cancelText="No"
								onConfirm={deletePost}
							>
								<button
									className={classNames(
										style.userSide__controlBtn,
										style['userSide__controlBtn--red']
									)}
								>
									Delete
								</button>
							</Popconfirm>
							<button
								className={classNames(style.userSide__controlBtn, style['userSide__controlBtn--green'])}
								onClick={goEdit}
							>
								Edit
							</button>
						</div>
					</div>
				</header>
				<section className={style.openPost__body}>
					<ReactMarkdown>{post.body}</ReactMarkdown>
				</section>
			</article>
		)
	}
}

export default OpenPost
