import React from 'react'
import {Pagination} from 'antd'
import style from './PaginationPanel.module.scss'

const PaginationPanel=(props)=>{
    const onChange=(e)=>{}
    const activePage=1
    const totalResults=30


    return (
        <Pagination
            current={activePage}
            pageSize={20}
            total={totalResults}
            onChange={onChange}
            showSizeChanger={false}
        />
    )
}

export default PaginationPanel

// export default class PagesPanel extends React.Component{
//     static defaultProps={
//         changePage:()=>{
//         },
//         totalResults:0,
//         activePage:1,
//     }
//     static propTypes={
//         changePage:(props,propName,componentName)=>{
//             if(typeof props[propName]==='function') return null
//             return new TypeError(`${componentName}: ${propName} must be function`)
//         },
//         totalResults:(props,propName,componentName)=>{
//             if(typeof props[propName]==='number') return null
//             return new TypeError(`${componentName}: ${propName} must be number`)
//         },
//         activePage:(props,propName,componentName)=>{
//             if(typeof props[propName]==='number') return null
//             return new TypeError(`${componentName}: ${propName} must be number`)
//         },
//     }
//
//     onChange=(e)=>{
//         this.props.changePage(e)
//     }
//
//     render(){
//         return (
//             <Pagination
//                 current={this.props.activePage}
//                 pageSize={20}
//                 total={this.props.totalResults}
//                 onChange={this.onChange}
//                 showSizeChanger={false}
//             />
//         )
//     }
// }
