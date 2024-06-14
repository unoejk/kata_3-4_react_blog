import React from 'react'
import { addArticle } from '../../../servises/fetch'
import ArticleForm from './ArticleForm'

const CreateArticle = () => {
	return <ArticleForm title={'Create new article'} submit={addArticle} />
}

export default CreateArticle
