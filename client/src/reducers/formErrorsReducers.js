const formErrors = {
    user: {}
}

const formErrorsReducers = (state = formErrors, action) => {
    switch (action.type) {
        case 'SET_ERRORS' : {
            return {...state,...{[action.model] : {...action.payload}}}
        }
        case 'CLEAR_ERRORS' : {
            return {} 
        }
        default: {
            return { ...state }
        }
    }
}

export default formErrorsReducers