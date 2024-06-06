// react
import React from 'react'
import ReactDOM from 'react-dom/client'
// store
import {Provider} from 'react-redux'
import store from './store/store'
// router
import {BrowserRouter as Router} from 'react-router-dom'
// styles
import './styles/resetDownloaded.css'
import './styles/resetMinePlus.scss'
import './styles/quickClasses.scss'
import './styles/antdFix.scss'
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
