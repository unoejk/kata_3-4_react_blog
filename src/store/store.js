import {combineReducers,compose,configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import counter from './slices/counterSlice'
import articlesSlice from './slices/articlesSlice'

const composeEnhancers=
    typeof window==='object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const store=configureStore({
    reducer:combineReducers({articlesSlice}),
    middleware:(gdm)=>gdm().concat(thunk),
    devTools: composeEnhancers,
})

export default store