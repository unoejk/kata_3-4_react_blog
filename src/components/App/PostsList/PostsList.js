import React,{useState} from 'react'
import style from './PostsList.module.scss'
import PostCard from './PostCard/PostCard'
import PaginationPanel from './PaginationPanel/PaginationPanel'

const PostsList=(props)=>{
    const actualPostsList=[
        {
            title:'title',
            likesCount:12,
            isLiked:false,
            tagsList:['tagName1','tagName2'],
            userName:'userName',
            userPic:'userPic',
            creationTime:'creationTime',
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at blanditiis consequuntur delectus deserunt distinctio dolorem, excepturi iure, odit, reprehenderit tenetur voluptas? Blanditiis cupiditate deleniti enim, error excepturi expedita harum iste nihil quas repudiandae, unde ut veritatis? Ipsam necessitatibus numquam, quasi quibusdam quisquam soluta tempora. Ab accusantium enim error et iste labore molestias odio, omnis perspiciatis provident reiciendis rem soluta ullam? Consequatur, cum laborum nihil suscipit veritatis voluptate. Deleniti officia quas reprehenderit temporibus voluptate? A facilis laborum maxime perferendis. Amet consequatur deserunt dolorem dolorum eaque est, ex facere incidunt odio optio perferendis porro quod sapiente suscipit ut veritatis voluptatem voluptatibus!',
        },
        {
            title:'title',
            likesCount:12,
            isLiked:true,
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
