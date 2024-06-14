import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { updateUser } from '../../../servises/fetch'
import { setToken, setUser } from '../../../store/slices/usersSlice'
import style from './UserForm.module.scss'

const EditProfile = () => {
	const dispatch = useDispatch()
	const { token, user } = useSelector((state) => state.usersSlice)
	const history = useHistory()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: {
			username: user?.username,
			email: user?.email,
		},
	})

	const onSubmit = async (data) => {
		setIsLoading(true)
		await updateUser(token, {
			user: {
				username: data.username ? data.username : user.username,
				email: data.email ? data.email : user.email,
				password: data.password ? data.password : user.password,
				image: data.image ? data.image : user.image,
			},
		})
			.then((res) => {
				dispatch(setToken(res.newToken))
				dispatch(setUser(res.newUser))
				reset()
				setIsLoading(false)
				history.push('/')
			})
			.catch((e) => {
				setIsError(e.message)
				setIsLoading(false)
			})
	}

	return (
		<form className={style.userForm} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={style.userForm__header}>Edit Profile</h2>
			<label className={style.userForm__textLabel}>
				<span className={style.userForm__textDescription}>Username</span>
				<input
					className={classNames(style.userForm__textInput, {
						[style['userForm__textInput--danger']]: errors?.username?.message !== undefined,
					})}
					type={'text'}
					placeholder={'Username'}
					{...register('username', {
						required: 'Username is required',
						minLength: {
							value: 3,
							message: 'Your username needs to be at least 3 characters',
						},
						maxLength: {
							value: 20,
							message: 'Your username needs to be no more 20 characters',
						},
					})}
				/>
				<span
					className={classNames(style.userForm__textDescription, style['userForm__textDescription--danger'], {
						disabled: errors?.username?.message === undefined,
					})}
				>
					{errors?.username?.message}
				</span>
			</label>
			<label className={style.userForm__textLabel}>
				<span className={style.userForm__textDescription}>Email address</span>
				<input
					className={classNames(style.userForm__textInput, {
						[style['userForm__textInput--danger']]: errors?.email?.message !== undefined,
					})}
					type={'text'}
					placeholder={'Email address'}
					{...register('email', {
						pattern: {
							value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: 'Email address must be a valid',
						},
					})}
				/>
				<span
					className={classNames(style.userForm__textDescription, style['userForm__textDescription--danger'], {
						disabled: errors?.email?.message === undefined,
					})}
				>
					{errors?.email?.message}
				</span>
			</label>
			<label className={style.userForm__textLabel}>
				<span className={style.userForm__textDescription}>New password</span>
				<input
					className={classNames(style.userForm__textInput, {
						[style['userForm__textInput--danger']]: errors?.password?.message !== undefined,
					})}
					type={'password'}
					autoComplete={'on'}
					placeholder={'New password'}
					{...register('password', {
						minLength: {
							value: 6,
							message: 'Your password needs to be at least 6 characters',
						},
						maxLength: {
							value: 40,
							message: 'Your password needs to be no more 40 characters',
						},
					})}
				/>
				<span
					className={classNames(style.userForm__textDescription, style['userForm__textDescription--danger'], {
						disabled: errors?.password?.message === undefined,
					})}
				>
					{errors?.password?.message}
				</span>
			</label>
			<label className={style.userForm__textLabel}>
				<span className={style.userForm__textDescription}>Avatar image (url)</span>
				<input
					className={classNames(style.userForm__textInput, {
						[style['userForm__textInput--danger']]: errors?.image?.message !== undefined,
					})}
					type={'text'}
					autoComplete={'on'}
					placeholder={'Avatar image'}
					{...register('image', {
						pattern: {
							value: /^(ftp|http|https):\/\/[^ "]+$/,
							message: 'Url on image must be a valid',
						},
					})}
				/>
				<span
					className={classNames(style.userForm__textDescription, style['userForm__textDescription--danger'], {
						disabled: errors?.image?.message === undefined,
					})}
				>
					{errors?.image?.message}
				</span>
			</label>
			<button className={style.userForm__submitBtn} type={'submit'}>
				Save
			</button>
			{/*<button*/}
			{/*    className={style.userForm__submitBtn}*/}
			{/*    onClick={()=>{*/}
			{/*        console.log(errors)*/}
			{/*    }}*/}
			{/*>Errors</button>*/}
			<Spin className={classNames(style.userForm__spin, { disabled: !isLoading })} size="large" />
			<p className={classNames(style.userForm__errorMessage, { disabled: !isError })}>{isError}</p>
		</form>
	)
}

export default EditProfile
