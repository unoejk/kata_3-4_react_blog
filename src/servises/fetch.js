const home = 'https://blog.kata.academy/api/'

const getArticles=async ()=>{
    // const i=await fetch(home+'articles')
    //     .then((res) => res.json())
    // console.log(i)
    return fetch(home+'articles')
        .then((res) => res.json())
}

export {getArticles}