import { setUser } from './user'
import axios from '../config/axios'

export const getInitialData = () => {
    return dispatch => {
        Promise.all([axios.get('/users/account',{
            headers: {
                'x-auth': localStorage.getItem('token')
        }
    })])
        .then(value => {
            const [user] = value
            dispatch(setUser(user))
        })
        .catch(err => {
            console.log(err)
        })
    }
}