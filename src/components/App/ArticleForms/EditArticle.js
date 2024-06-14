import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import {Spin} from 'antd'
import {useSelector} from 'react-redux'
import {getArticle,updateArticle} from '../../../servises/fetch'
import style from './ArticleForm.module.scss'
import ArticleForm from './ArticleForm'

const EditArticle=()=>{
    const {token}=useSelector((state)=>state.usersSlice)
    const location=useLocation()

    const [isLoading,setIsLoading]=useState(true)
    const [isError,setIsError]=useState(false)
    const [slug,setSlug]=useState('')

    const [title,setTitle]=useState('')
    const [shortDesc,setShortDesc]=useState('')
    const [text,setText]=useState('')
    const [tagsList,setTagsList]=useState([])

    useEffect(()=>{
        ;(async()=>{
            setIsLoading(true)
            const slug=location.pathname
                .split('/')
                .reverse()
                .find((val)=>val!=='' && val!=='edit')
            setSlug(slug)

            const res=await getArticle(slug,token)

            setTitle(res.article.title)
            setShortDesc(res.article.description)
            setText(res.article.body)
            setTagsList(res.article.tagList)

            await setIsLoading(false)
        })().catch((e)=>{
            setIsError(e.message)
            setIsLoading(false)
        })
    },[])

    if(isLoading){
        return <Spin className={style.spin} size="large"/>
    }else if(isError){
        return <p className={style.errorMessage}>{isError}</p>
    }else{
        return <ArticleForm
            title={'Create new article'}
            submit={(token, article)=>updateArticle(slug, token, article)}
            defaultValues={{title,shortDesc,text,tagsList}}
        />
    }
}

export default EditArticle
