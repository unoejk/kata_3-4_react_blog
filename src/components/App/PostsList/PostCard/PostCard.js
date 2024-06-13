import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import classNames from 'classnames'
import { replaceArticle } from '../../../../store/slices/articlesSlice'
import { setLike } from '../../../../servises/fetch'
import style from './PostCard.module.scss'

const PostCard = (props) => {
	const { token } = useSelector((state) => state.usersSlice)
	const dispatch = useDispatch()

	const handleSetLike = async () => {
		const newProps = await setLike(token, props.slug, props.favorited)
		dispatch(replaceArticle(newProps.article))
	}

	return (
		<article className={style.postCard}>
			<div className={`${style.postCard__contentSide} ${style.contentSide}`}>
				<div className={style.contentSide__header}>
					<Link className={style.contentSide__title} to={'/articles/' + props.slug + '/'}>
						<h2>{props.title}</h2>
					</Link>
					<button
						className={classNames(style.contentSide__likesCount, {
							[style['contentSide__likesCount--isLiked']]: props.favorited,
						})}
						disabled={!token}
						onClick={handleSetLike}
					>
						{props.favoritesCount}
					</button>
				</div>
				<ul className={style.contentSide__tagsList}>
					{props.tagList.map((tag) => (
						<li className={style.contentSide__tag} key={Math.random() * 10 ** 17}>
							{tag}
						</li>
					))}
				</ul>
				<p className={style.contentSide__description}>{props.description}</p>
			</div>
			<div className={`${style.postCard__userSide} ${style.userSide}`}>
				<div className={style.userSide__column}>
					<span className={style.userSide__userName}>{props.author.username}</span>
					<span className={style.userSide__creationTime}>{format(props.createdAt, 'MMM dd, yyyy')}</span>
				</div>
				<div className={style.userSide__column}>
					<img className={style.userSide__userPic} src={props.author.image} alt={'userPic'} />
				</div>
			</div>
		</article>
	)
}

export default PostCard
