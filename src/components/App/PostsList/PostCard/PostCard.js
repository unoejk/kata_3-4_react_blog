import React,{useState} from 'react'
import classNames from 'classnames'
import style from './PostCard.module.scss'

const PostCard=(props)=>{
    // const [takeMeName,setTakeMeName]=useState(undefined)
    return (
        <div className={style.postCard}>
            <div className={`${style.postCard__contentSide} ${style.contentSide}`}>
                <div className={style.contentSide__header}>
                    <h2 className={style.contentSide__title}>{props.title}</h2>
                    <button
                        className={classNames(
                            style.contentSide__likesCount,
                            {[style['contentSide__likesCount--isLiked']]:props.isLiked}
                        )}
                    >{props.likesCount}</button>
                    {/*<span className={style.contentSide__likesCount}>{props.likesCount}</span>*/}
                </div>
                <ul className={style.contentSide__tagsList}>
                    {
                        props.tagsList.map(tag=>
                            <li className={style.contentSide__tag} key={Math.random()*10**17}>{tag}</li>
                        )
                    }
                </ul>
                <p className={style.contentSide__description}>{props.description}</p>
            </div>
            <div className={`${style.postCard__userSide} ${style.userSide}`}>
                <div className={style.userSide__column}>
                    <span className={style.userSide__userName}>{props.userName}</span>
                    <span className={style.userSide__creationTime}>{props.creationTime}</span>
                </div>
                <div className={style.userSide__column}>
                    <div className={style.userSide__userPic}>{props.userPic}</div>
                </div>
            </div>
        </div>
    )
}

// takeMeName.defaultProps={
//     takeMeName:'',
// }
// takeMeName.propTypes={
//     takeMeName:(props, propName, componentName)=>{
//         if (typeof props[propName]==='string')
//             return null
//         return new TypeError(`${componentName}: ${propName} must be string`)
//     },
// }

export default PostCard
