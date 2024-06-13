import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {Spin} from 'antd'
import {useDispatch} from 'react-redux'
import {setToken,setUser} from '../../../store/slices/usersSlice'
import {signUp} from '../../../servises/fetch'
import classNames from 'classnames'
import style from './UserForm.module.scss'

const SignUp=()=>{
    const dispatch=useDispatch()
    const history=useHistory()
    const [isLoading,setIsLoading]=useState(false)
    const [isError,setIsError]=useState(false)

    const {
        register,
        formState:{
            errors,
        },
        watch,
        handleSubmit,
        reset
    }=useForm()

    const onSubmit=async (data)=>{
        setIsLoading(true)
        await signUp({
            user:{
                username: data.username,
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
            <h2 className={style.userForm__header}>Create new account</h2>
            <label className={style.userForm__textLabel}>
                <span className={style.userForm__textDescription}>Username</span>
                <input
                    className={classNames(
                        style.userForm__textInput,
                        {[style['userForm__textInput--danger']]:errors?.username?.message!==undefined},
                    )}
                    type={'text'}
                    placeholder={'Username'}
                    {...register('username',{
                        required:'Username is required',
                        minLength:{
                            value:3,
                            message:'Your username needs to be at least 3 characters'
                        },
                        maxLength:{
                            value:20,
                            message:'Your username needs to be no more 20 characters'
                        },
                    })}
                />
                <span className={classNames(
                    style.userForm__textDescription,
                    style['userForm__textDescription--danger'],
                    {'disabled':errors?.username?.message===undefined},
                )}>{errors?.username?.message}</span>
            </label>
            <label className={style.userForm__textLabel}>
                <span className={style.userForm__textDescription}>Email address</span>
                <input
                    className={classNames(
                        style.userForm__textInput,
                        {[style['userForm__textInput--danger']]:errors?.email?.message!==undefined},
                    )}
                    type={'text'}
                    placeholder={'Email address'}
                    {...register('email',{
                        required:'Email address is required',
                        pattern:{
                            value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message:'Email address must be a valid',
                        },
                    })}
                />
                <span className={classNames(
                    style.userForm__textDescription,
                    style['userForm__textDescription--danger'],
                    {'disabled':errors?.email?.message===undefined},
                )}>{errors?.email?.message}</span>
            </label>
            <label className={style.userForm__textLabel}>
                <span className={style.userForm__textDescription}>Password</span>
                <input
                    className={classNames(
                        style.userForm__textInput,
                        {[style['userForm__textInput--danger']]:errors?.password?.message!==undefined},
                    )}
                    type={'password'}
                    autoComplete={'on'}
                    placeholder={'Password'}
                    {...register('password',{
                        required:'Password is required',
                        minLength:{
                            value:6,
                            message:'Your password needs to be at least 6 characters'
                        },
                        maxLength:{
                            value:40,
                            message:'Your password needs to be no more 40 characters'
                        },
                    })}
                />
                <span className={classNames(
                    style.userForm__textDescription,
                    style['userForm__textDescription--danger'],
                    {'disabled':errors?.password?.message===undefined},
                )}>{errors?.password?.message}</span>
            </label>
            <label className={style.userForm__textLabel}>
                <span className={style.userForm__textDescription}>Repeat Password</span>
                <input
                    className={classNames(
                        style.userForm__textInput,
                        {[style['userForm__textInput--danger']]:errors?.passwordRepeat?.message!==undefined},
                    )}
                    type={'password'}
                    autoComplete={'on'}
                    placeholder={'Password'}
                    {...register('passwordRepeat',{
                        required:'Repeat Password is required',
                        validate:{
                            // equal: val => (val===getValues().email) || 'Passwords must match',
                            equal: val => (val===watch('password')) || 'Passwords must match',
                        }
                    })}
                />
                <span className={classNames(
                    style.userForm__textDescription,
                    style['userForm__textDescription--danger'],
                    {'disabled':errors?.passwordRepeat?.message===undefined},
                )}>{errors?.passwordRepeat?.message}</span>
            </label>
            <label className={style.userForm__checkBoxLabel}>
                <div className={style.userForm__checkBox}>
                    <input
                        className={style.userForm__realCheckbox}
                        type={'checkbox'}
                        {...register('privacy',{
                            required: true,
                        })}
                    />
                    <span className={classNames(
                        style.userForm__fakeCheckbox,
                        {[style['userForm__fakeCheckbox--danger']]:errors?.privacy}
                    )}></span>
                </div>
                <span className={classNames(
                    style.userForm__textDescription,
                    {[style['userForm__textDescription--danger']]:errors?.privacy}
                )}>I agree to the processing of my personal information</span>
            </label>
            <button
                className={style.userForm__submitBtn}
                type={'submit'}
            >Create</button>
            {/*<button*/}
            {/*    className={style.userForm__submitBtn}*/}
            {/*    onClick={()=>{*/}
            {/*        console.log(errors)*/}
            {/*    }}*/}
            {/*>Errors</button>*/}
            <span className={style.userForm__smallText}>
                Already have an account?
                <Link
                    className={style.userForm__smallLink}
                    to={'/sign-in/'}
                > Sign In.</Link></span>
            <Spin className={classNames(
                style.userForm__spin,
                {'disabled':!isLoading}
            )} size="large"/>
			<p className={classNames(
				style.userForm__errorMessage,
				{'disabled':!isError}
			)}>{isError}</p>
        </form>
    )
}

export default SignUp
