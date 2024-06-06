import React,{useState} from 'react'
import style from './CompName.module.scss'

const CompName=(props)=>{
    // const [takeMeName,setTakeMeName]=useState(undefined)
    return (
        <div className={'testDiv'}>Hello there</div>
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

export default CompName
