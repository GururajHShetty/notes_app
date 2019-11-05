import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'

import UserRegistration from './components/Users/Registration'
import UserLogin from './components/Users/Login'

function App(props) {
  return (
    <div className="container" >
      <h1><span className="badge badge-info">Note Keep</span></h1>
      <BrowserRouter>
        {
          isEmpty(props.user) ? (
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page"><Link to="/">Registor</Link></li>
                <li className="breadcrumb-item active" aria-current="page"><Link to="/users/login">Login</Link></li>
              </ol>
            </div>) : (
              <div>

              </div>)
        }

        <Switch>
          <Route path="/" component={UserRegistration} exact={true} />
          <Route path="/users/login" component={UserLogin} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
