import React,{useState} from 'react'
import style from './PostsList.module.scss'
import PostCard from './PostCard/PostCard'
import PaginationPanel from './PaginationPanel/PaginationPanel'

const PostsList=(props)=>{
    const actualPostsList=[
        {
            title:'title',
            likesCount:12,
            tagsList:['tagName1','tagName2'],
            userName:'userName',
            userPic:'userPic',
            creationTime:'creationTime',
            description:'description',
        },
        {
            title:'title',
            likesCount:12,
            tagsList:['tagName1','tagName2'],
            userName:'userName',
            userPic:'userPic',
            creationTime:'creationTime',
            description:'content',
        },
    ]

    // const [takeMeName,setTakeMeName]=useState(undefined)
    return (
        <div className={style.postsList}>
            <ul className={style.postsList__list}>
                {
                    actualPostsList.map(post=>
                        <li className={style.postsList__item} key={Math.random()*10**17}>
                            <PostCard {...post}/>
                        </li>,
                    )
                }
            </ul>
            <PaginationPanel/>
        </div>
    )
}

export default PostsList
