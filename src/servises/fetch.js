const home = 'https://blog.kata.academy/api/'

// ---- forArticles

export const getArticles = async (token, perPage, offset) => {
	return fetch(home + 'articles?limit=' + perPage + '&offset=' + offset, {
		headers: token ? { Authorization: 'Token ' + token } : undefined,
	}).then((res) => {
		if (res.ok) return res.json()
		else throw new Error('Server Error ' + res.status)
	})
}

export const getArticle = async (slug, token) => {
	return fetch(home + 'articles/' + slug, {
		headers: token ? { Authorization: 'Token ' + token } : undefined,
	}).then((res) => {
		if (res.ok) return res.json()
		else throw new Error('Server Error ' + res.status)
	})
}

export const addArticle = async (token, article) => {
	return fetch(home + 'articles/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Token ' + token,
		},
		body: JSON.stringify(article),
	}).then((res) => {
		if (res.ok) return res.json()
		else throw new Error('Server Error ' + res.status)
	})
}

export const deleteArticle = async (slug, token) => {
	return fetch(home + 'articles/' + slug, {
		method: 'DELETE',
		headers: {
			Authorization: 'Token ' + token,
		},
	})
}

export const updateArticle = async (slug, token, article) => {
	return fetch(home + 'articles/' + slug, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Token ' + token,
		},
		body: JSON.stringify(article),
	}).then((res) => {
		if (res.ok) return res.json()
		else throw new Error('Server Error ' + res.status)
	})
}

// ---- forUsers

const mutateRes = async (res) => {
	if (res.ok) {
		const resJson = await res.json()
		const newToken = resJson.user.token
		localStorage.setItem('token', JSON.stringify(resJson.user.token))
		const newUser = {
			username: resJson.user.username,
			email: resJson.user.email,
			image: resJson.user.image,
		}
		return { newToken, newUser }
	} else {
		throw new Error('Server Error ' + res.status)
	}
}

export const getUser = async (token) => {
	return fetch(home + 'user/', {
		headers: {
			Authorization: 'Token ' + token,
		},
	}).then((res) => mutateRes(res))
}

export const signUp = async (userData) => {
	return fetch(home + 'users/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	}).then((res) => mutateRes(res, userData))
}

export const signIn = async (userData) => {
	return fetch(home + 'users/login/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	}).then((res) => mutateRes(res))
}

export const updateUser = async (token, userData) => {
	return fetch(home + 'user/', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Token ' + token,
		},
		body: JSON.stringify(userData),
	}).then((res) => mutateRes(res))
}

export const setLike = async (token, slug, itWasLiked) => {
	return fetch(home + 'articles/' + slug + '/favorite/', {
		method: itWasLiked ? 'DELETE' : 'POST',
		headers: {
			Authorization: 'Token ' + token,
		},
	}).then((res) => res.json())
}

// export const getUser=async(token)=>{
//     console.log(token)
//     if(token){
//         return fetch(home+'user/',{
//             headers:{Authorization:'Token '+token},
//         })
//             .then(res=>{
//                 if(res.ok)
//                     return res.json()
//                 else
//                     throw new Error('Server Error '+res.status)
//             })
//     }
// }
