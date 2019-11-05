export const setErrors = (errors,model) => {
    return {
        type : 'SET_ERRORS',
        payload:errors,
        model:model
    }
}

export const clearErrors = () => {
    return {
        type:'CLEAR_ERRORS'
    }
}