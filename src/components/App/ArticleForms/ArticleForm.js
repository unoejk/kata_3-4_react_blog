import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import style from './ArticleForm.module.scss'

const ArticleForm = (props) => {
	const { token } = useSelector((state) => state.usersSlice)

	const history = useHistory()

	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const mutateTagsList = (tagsList) => {
		const newTagsList = []
		tagsList.forEach((val) => {
			newTagsList.push({
				key: Math.random() * 10 ** 17,
				body: val,
			})
		})
		if (newTagsList.length === 0) {
			newTagsList.push({
				key: Math.random() * 10 ** 17,
				body: '',
			})
		}
		return newTagsList
	}

	const [title, setTitle] = useState(props?.defaultValues?.title || '')
	const [shortDesc, setShortDesc] = useState(props?.defaultValues?.shortDesc || '')
	const [text, setText] = useState(props?.defaultValues?.text || '')
	const initialTagsList = mutateTagsList(props?.defaultValues?.tagsList || ['', ''])
	const [tagsList, setTagsList] = useState(initialTagsList.slice(0))

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({})

	const onSubmit = async (data) => {
		const newTags = []
		tagsList.forEach((val) => {
			if (val.body.trim() !== '') {
				newTags.push(val.body.trim())
			}
		})
		const article = {
			article: {
				title: data.title,
				description: data.shortDesc,
				body: data.text,
				tagList: newTags,
			},
		}

		await props
			.submit(token, article)
			.then(() => {
				reset()
				setTagsList(initialTagsList.slice(0))
				setIsLoading(false)
				history.push('/')
			})
			.catch((e) => {
				setIsError(e.message)
				setIsLoading(false)
			})
	}

	const changeTag = (e, num) => {
		const newTagsList = [
			...tagsList.slice(0, num),
			{
				key: tagsList[num].key,
				body: e.target.value,
			},
			...tagsList.slice(num + 1, tagsList.length),
		]
		setTagsList(newTagsList)
	}
	const deleteTag = (e, num) => {
		e.preventDefault()
		const newTagsList = [...tagsList.slice(0, num), ...tagsList.slice(num + 1, tagsList.length)]
		setTagsList(newTagsList)
	}
	const addTag = (e) => {
		e.preventDefault()
		const newTagsList = tagsList.slice(0)
		newTagsList.push({
			key: Math.random() * 10 ** 17,
			body: '',
		})
		setTagsList(newTagsList)
	}

	return (
		<form className={style.articleForm} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={style.articleForm__header}>{props?.title}</h2>
			<label className={style.articleForm__textLabel}>
				<span className={style.articleForm__textDescription}>Title</span>
				<input
					className={classNames(style.articleForm__textInput, {
						[style['articleForm__textInput--danger']]: errors?.title?.message !== undefined,
					})}
					type={'text'}
					placeholder={'Title'}
					{...register('title', {
						required: 'Title is required',
					})}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<span
					className={classNames(
						style.articleForm__textDescription,
						style['articleForm__textDescription--danger'],
						{ disabled: errors?.title?.message === undefined }
					)}
				>
					{errors?.title?.message}
				</span>
			</label>
			<label className={style.articleForm__textLabel}>
				<span className={style.articleForm__textDescription}>Short description</span>
				<input
					className={classNames(style.articleForm__textInput, {
						[style['articleForm__textInput--danger']]: errors?.shortDesc?.message !== undefined,
					})}
					type={'text'}
					placeholder={'Short description'}
					{...register('shortDesc', {
						required: 'Short description is required',
					})}
					value={shortDesc}
					onChange={(e) => setShortDesc(e.target.value)}
				/>
				<span
					className={classNames(
						style.articleForm__textDescription,
						style['articleForm__textDescription--danger'],
						{ disabled: errors?.shortDesc?.message === undefined }
					)}
				>
					{errors?.shortDesc?.message}
				</span>
			</label>
			<label className={style.articleForm__textLabel}>
				<span className={style.articleForm__textDescription}>Text</span>
				<textarea
					className={classNames(style.articleForm__textInput, style.articleForm__textArea, {
						[style['articleForm__textInput--danger']]: errors?.text?.message !== undefined,
					})}
					placeholder={'Text'}
					{...register('text', {
						required: 'Text is required',
					})}
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<span
					className={classNames(
						style.articleForm__textDescription,
						style['articleForm__textDescription--danger'],
						{ disabled: errors?.text?.message === undefined }
					)}
				>
					{errors?.text?.message}
				</span>
			</label>

			<div className={style.articleForm__controlPanel}>
				<span className={style.articleForm__textDescription}>Tags</span>
				{tagsList.map((val, num) => (
					<div className={classNames(style.articleForm__controlRow)} key={val.key}>
						<label>
							<input
								className={classNames(
									style.articleForm__textInput,
									style['articleForm__textInput--short']
								)}
								type={'text'}
								placeholder={'Tag'}
								value={val.body}
								onChange={(e) => changeTag(e, num)}
							/>
						</label>
						<button
							className={classNames(
								style.articleForm__controlBtn,
								style['articleForm__controlBtn--red'],
								{
									disabled: tagsList.length === 1,
								}
							)}
							onClick={(e) => deleteTag(e, num)}
						>
							Delete
						</button>
						<button
							className={classNames(
								style.articleForm__controlBtn,
								style['articleForm__controlBtn--blue']
							)}
							onClick={(e) => addTag(e)}
						>
							Add tag
						</button>
					</div>
				))}
			</div>

			<div className={style.articleForm__submitRow}>
				<button className={style.articleForm__submitBtn} type={'submit'}>
					Send
				</button>
				<Spin className={classNames(style.articleForm__spin, { disabled: !isLoading })} size="large" />
				<p className={classNames(style.articleForm__errorMessage, { disabled: !isError })}>{isError}</p>
			</div>
		</form>
	)
}

export default ArticleForm
