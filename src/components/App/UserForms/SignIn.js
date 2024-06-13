import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {Spin} from 'antd'
import {useDispatch} from 'react-redux'
import {setToken,setUser} from '../../../store/slices/usersSlice'
import {signIn} from '../../../servises/fetch'
import classNames from 'classnames'
import style from './UserForm.module.scss'

const SignIn=()=>{
    const dispatch=useDispatch()
    const history=useHistory()
    const [isLoading,setIsLoading]=useState(false)
	const [isError,setIsError]=useState(false)

    const {
        register,
        formState:{
            errors,
        },
        handleSubmit,
        reset
    }=useForm()

    const onSubmit=async (data)=>{

        setIsLoading(true)
        await signIn({
            user:{
                email: data.email,
                password: data.password,
            },
        }).then(res=>{
			dispatch(setToken(res.newToken))
			dispatch(setUser(res.newUser))
			reset()
			setIsLoading(false)
			history.push('/')
		}).catch(e=>{
			setIsError(e.message)
			setIsLoading(false)
		})
    }

    return (
		<form className={style.userForm} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={style.userForm__header}>Sign In</h2>
			<label className={style.userForm__textLabel}>
				<span className={style.userForm__textDescription}>Email address</span>
				<input
					className={classNames(
						style.userForm__textInput,
						{ [style['userForm__textInput--danger']]: errors?.email?.message !== undefined },
					)}
					type={'text'}
					placeholder={'Email address'}
					{...register('email', {
						required: 'Email address is required',
						pattern: {
							value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: 'Email address must be a valid',
						},
					})}
				/>
				<span className={classNames(
					style.userForm__textDescription,
					style['userForm__textDescription--danger'],
					{ 'disabled': errors?.email?.message === undefined },
				)}>{errors?.email?.message}</span>
			</label>
			<label className={style.userForm__textLabel}>
				<span className={style.userForm__textDescription}>Password</span>
				<input
					className={classNames(
						style.userForm__textInput,
						{ [style['userForm__textInput--danger']]: errors?.password?.message !== undefined },
					)}
					type={'password'}
					autoComplete={'on'}
					placeholder={'Password'}
					{...register('password', {
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Your password needs to be at least 6 characters'
						},
						maxLength: {
							value: 40,
							message: 'Your password needs to be no more 40 characters'
						},
					})}
				/>
				<span className={classNames(
					style.userForm__textDescription,
					style['userForm__textDescription--danger'],
					{ 'disabled': errors?.password?.message === undefined },
				)}>{errors?.password?.message}</span>
			</label>
			<button
				className={style.userForm__submitBtn}
				type={'submit'}
			>Login
			</button>
			{/*<button*/}
			{/*    className={style.userForm__submitBtn}*/}
			{/*    onClick={()=>{*/}
			{/*        console.log(errors)*/}
			{/*    }}*/}
			{/*>Errors</button>*/}
			<span className={style.userForm__smallText}>
                Don’t have an account?
                <Link
					className={style.userForm__smallLink}
					to={'/sign-up/'}
				> Sign Up.</Link></span>
			<Spin className={classNames(
				style.userForm__spin,
				{ 'disabled': !isLoading }
			)} size="large" />
			<p className={classNames(
				style.userForm__errorMessage,
				{ 'disabled': !isError }
			)}>{isError}</p>
		</form>
	)
}

export default SignIn
