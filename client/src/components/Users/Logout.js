import React from 'react'
import { connect } from 'react-redux'
import { userLogout } from '../../actions/user'

class UserLogout extends React.Component {
    constructor() {
        super()
        this.state = {
            logout: false
        }
    }

    componentDidMount() {
        const logout = window.confirm('Are you sure to logout')
        if (logout) {
            this.props.dispatch(userLogout(this.props))
            this.setState({ logout })
        } else {
            this.props.history.goBack()
        }
    }

    render() {
        return (
            <div>{
                this.state.logout && (
                    <div>loggedout</div>
                )
            }
            </div>
        )
    }
}

export default connect()(UserLogout)