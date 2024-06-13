import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {Spin} from 'antd'
import { useSelector } from 'react-redux'
import { addArticle, getArticle, updateArticle } from '../../../servises/fetch'
import classNames from 'classnames'
import style from './EditArticle.module.scss'

const EditArticle=()=>{
	const {token}=useSelector((state)=>state.usersSlice)

	const history=useHistory()
	const location=useLocation()

	const [isLoading,setIsLoading]=useState(true)
	const [isError,setIsError]=useState(false)

	const [isSecondLoading,setIsSecondLoading]=useState(false)
	const [isSecondError,setIsSecondError]=useState(false)

	const [isEditMode,setIsEditMode]=useState(false)
	const [slug,setSlug]=useState('')

	useEffect(()=>{
		;(async()=>{
			setIsLoading(true)
			if (location.pathname.split('/').find(val=>val==='edit')){
				setIsEditMode(true)
			}else {
				setIsLoading(false)
				return
			}
			const slug=location.pathname
				.split('/')
				.reverse()
				.find(val=>val!==''&&val!=='edit')
			setSlug(slug)

			const res=await getArticle(slug,token)

			setTitle(res.article.title)
			setShortDesc(res.article.description)
			setText(res.article.body)
			const newTagsList=[]
			res.article.tagList.forEach(val=>{
				newTagsList.push({
					key:Math.random()*10**17,
					body:val
				})
			})
			if (newTagsList.length===0){
				newTagsList.push({
					key:Math.random()*10**17,
					body:''
				})
			}
			setTagsList(newTagsList)

			await setIsLoading(false)
		})().catch(e=>{
			setIsError(e.message)
			setIsLoading(false)
		})
	},[])


	const [title,setTitle]=useState('')
	const [shortDesc,setShortDesc]=useState('')
	const [text,setText]=useState('')
	const initialTasList=[
		{
			key:Math.random()*10**17,
			body:''
		},
		{
			key:Math.random()*10**17,
			body:''
		}
	]
	const [tagsList,setTagsList]=useState(initialTasList.slice(0))

	const {
		register,
		formState:{
			errors,
		},
		setError,
		handleSubmit,
		reset
	}=useForm({})

	const onSubmit=async (data)=>{
		const newTags=[]
		tagsList.forEach(val=>{
			if (val.body.trim()!==''){
				newTags.push(val.body.trim())
			}
		})
		const article={
			article:{
				title: data.title,
				description: data.shortDesc,
				body: data.text,
				tagList: newTags,
			}
		}

		if(isEditMode){
			await updateArticle(slug,token,article).then(res=>{
				// console.log(res)
				reset()
				setTagsList(initialTasList.slice(0))
				setIsSecondLoading(false)
				history.push('/')
			}).catch(e=>{
				setIsSecondError(e.message)
				setIsSecondLoading(false)
			})
		}else {
			await addArticle(token,article).then(res=>{
				// console.log(res)
				reset()
				setTagsList(initialTasList.slice(0))
				setIsSecondLoading(false)
				history.push('/')
			}).catch(e=>{
				setIsSecondError(e.message)
				setIsSecondLoading(false)
			})
		}
	}

	const changeTag=(e,num)=>{
		const newTagsList=[
			...tagsList.slice(0,num),
			{
				key:tagsList[num].key,
				body: e.target.value
			},
			...tagsList.slice(num+1,tagsList.length),
		]
		setTagsList(newTagsList)
	}
	const deleteTag=(e,num)=>{
		e.preventDefault()
		const newTagsList=[
			...tagsList.slice(0,num),
			...tagsList.slice(num+1,tagsList.length),
		]
		setTagsList(newTagsList)
	}
	const addTag=(e)=>{
		e.preventDefault()
		const newTagsList=tagsList.slice(0)
		newTagsList.push({
			key:Math.random()*10**17,
			body:''
		})
		setTagsList(newTagsList)
	}

	if(isLoading){
		return <Spin className={style.spin} size="large"/>
	}else if(isError){
		return <p className={style.errorMessage}>{isError}</p>
	}else {
		return (
			<form className={style.editForm} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={style.editForm__header}>{isEditMode ? 'Edit article' : 'Create new article'}</h2>
				<label className={style.editForm__textLabel}>
					<span className={style.editForm__textDescription}>Title</span>
					<input
						className={classNames(
							style.editForm__textInput,
							{ [style['editForm__textInput--danger']]: errors?.title?.message !== undefined },
						)}
						type={'text'}
						placeholder={'Title'}
						{...register('title', {
							required: 'Title is required',
						})}
						value={title}
						onChange={e=>setTitle(e.target.value)}
					/>
					<span className={classNames(
						style.editForm__textDescription,
						style['editForm__textDescription--danger'],
						{ 'disabled': errors?.title?.message === undefined },
					)}>{errors?.title?.message}</span>
				</label>
				<label className={style.editForm__textLabel}>
					<span className={style.editForm__textDescription}>Short description</span>
					<input
						className={classNames(
							style.editForm__textInput,
							{ [style['editForm__textInput--danger']]: errors?.shortDesc?.message !== undefined },
						)}
						type={'text'}
						placeholder={'Short description'}
						{...register('shortDesc', {
							required: 'Short description is required',
						})}
						value={shortDesc}
						onChange={e=>setShortDesc(e.target.value)}
					/>
					<span className={classNames(
						style.editForm__textDescription,
						style['editForm__textDescription--danger'],
						{ 'disabled': errors?.shortDesc?.message === undefined },
					)}>{errors?.shortDesc?.message}</span>
				</label>
				<label className={style.editForm__textLabel}>
					<span className={style.editForm__textDescription}>Text</span>
					<textarea
						className={classNames(
							style.editForm__textInput,
							style.editForm__textArea,
							{ [style['editForm__textInput--danger']]: errors?.text?.message !== undefined },
						)}
						placeholder={'Text'}
						{...register('text', {
							required: 'Text is required',
						})}
						value={text}
						onChange={e=>setText(e.target.value)}
					/>
					<span className={classNames(
						style.editForm__textDescription,
						style['editForm__textDescription--danger'],
						{ 'disabled': errors?.text?.message === undefined },
					)}>{errors?.text?.message}</span>
				</label>

				<div className={style.editForm__controlPanel}>
					<span className={style.editForm__textDescription}>Tags</span>
					{
						tagsList.map((val, num) =>
							<div className={classNames(
								style.editForm__controlRow,
							)} key={val.key}>
								<label>
									<input
										className={classNames(
											style.editForm__textInput,
											style['editForm__textInput--short'],
										)}
										type={'text'}
										placeholder={'Tag'}
										value={val.body}
										onChange={(e) => changeTag(e, num)}
									/>
								</label>
								<button
									className={classNames(
										style.editForm__controlBtn,
										style['editForm__controlBtn--red'],
										{'disabled':tagsList.length===1}
									)}
									onClick={(e) => deleteTag(e, num)}
								>Delete
								</button>
								<button
									className={classNames(
										style.editForm__controlBtn,
										style['editForm__controlBtn--blue'],
									)}
									onClick={e=>addTag(e)}
								>Add tag
								</button>
							</div>,
						)
					}
				</div>

				<div className={style.editForm__submitRow}>
					<button
						className={style.editForm__submitBtn}
						type={'submit'}
					>Create</button>
					<Spin className={classNames(
						style.editForm__spin,
						{'disabled': !isSecondLoading}
					)} size="large" />
					<p className={classNames(
						style.editForm__errorMessage,
						{'disabled': !isSecondError}
					)}>{isSecondError}</p>
				</div>
			</form>
		)
	}
}

export default EditArticle
