import React from 'react'
import { connect } from 'react-redux'
import { startAddUser } from '../../actions/user'
import isEmpty from 'lodash/isEmpty'

class UserRegistration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            isVisible: false
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheck = e => {
        if (this.state.isVisible) {
            this.setState({ isVisible: false })
        } else {
            this.setState({ isVisible: true })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(startAddUser(formData, this.props))
    }

    render() {
        return (
            <div className="container" >
                <div className="row justify-content-center">
                    <div className="col-3"><h4><span className="badge badge-light">Create your account!</span></h4></div>
                </div><hr />
                <div className="row" >
                    <div className="col-md-4 offset-md-4">
                        {
                            !isEmpty(this.props.errors) && (
                                <div className="alert alert-danger" role="alert">
                                    <ul>
                                        {
                                            Object.entries(this.props.errors).map((error, i) => {
                                                return (<li key={i} >{error[0]} : {error[1].message}</li>)
                                            })
                                        }
                                    </ul>
                                </div>)
                        }
                        <form onSubmit={this.handleSubmit} >
                            <div className="input-group-text row">
                                <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="username" onChange={this.handleChange} placeholder="username" name="username" value={this.state.username} />
                                </div>
                            </div>
                            <div className=" input-group-text row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="email" onChange={this.handleChange} placeholder="someone@email.com" name="email" value={this.state.email} />
                                </div>
                            </div>
                            <div className="input-group-text row">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type={this.state.isVisible ? "text" : "password"} className="form-control" id="password" onChange={this.handleChange} placeholder="Password" name="password" value={this.state.password} />
                                </div>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="isVisible" name="isVisible" onChange={this.handleCheck} />
                                <label className="form-check-label" htmlFor="isVisible">Show password</label>
                            </div>
                            <input type="submit" value="Register" className="btn btn-success btn-lg btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        errors: state.formErrors.userRegistor
    }
}

export default connect(mapStateToProps)(UserRegistration)