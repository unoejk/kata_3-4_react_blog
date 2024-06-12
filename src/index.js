// react
import React from 'react'
import ReactDOM from 'react-dom/client'
// router
import {BrowserRouter as Router} from 'react-router-dom'
// stores
import {Provider} from 'react-redux'
import store from './store/store'
// styles
import './styles/forIndex/reset.css'
import './styles/forIndex/resetPlus.scss'
import './styles/forIndex/quickClasses.scss'
import './styles/forIndex/antdFix.scss'
// components
import App from './components/App/App'

// go-go
const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
)
