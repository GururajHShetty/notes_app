import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import formErrorsReducers from '../reducers/formErrorsReducers'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        formErrors:formErrorsReducers
    }), applyMiddleware(thunk))
    return store
}

export default configureStore
