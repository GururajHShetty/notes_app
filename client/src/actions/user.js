import axios from '../config/axios'
import { setErrors } from './errors'
import { getInitialData } from './initialData'

export const startAddUser = (formData, props) => {
    return dispatch => {
        // console.log(formData)
        axios.post('/users/register', formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    // console.log('errors',response.data.errors)
                    dispatch(setErrors(response.data.errors, 'userRegistor'))
                } else {
                    // console.log(response.data)
                    props.history.push('/users/login')
                }
            })
    }

}

export const setUser = user => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const startSetUser = (formData, props) => {
    return dispatch => {
        axios.post('/users/login', formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    // console.log(response.data)
                    dispatch(setErrors(response.data, 'userLogin'))
                } else {
                    // console.log(response.data)
                    const { token } = response.data
                    localStorage.setItem('token', token)
                    dispatch(getInitialData())
                    props.history.push('/home')
                }
            })
    }
}


export const clearUser = () => {
    return {
        type : "CLEAR_USER"
    }
}

export const userLogout = (props) => {
    return dispatch => {
        axios.delete('/users/logout', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data.token){
                    const {token} = response.data 
                    localStorage.removeItem(token)
                    props.history.push('/users/login')
                    dispatch(clearUser())
                }
                
            })

    }
}