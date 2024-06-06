import {combineReducers,compose,configureStore,combineSlices} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import counter from './slices/counterSlice'

const composeEnhancers=
    typeof window==='object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const store=configureStore({
    reducer:combineReducers({counter}),
    middleware:(gdm)=>gdm().concat(thunk),
    // devTools: composeEnhancers,
})

export default store