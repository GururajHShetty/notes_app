const { User } = require('../models/user')
const pick = require('lodash/pick')

module.exports.register = (req, res) => {
    const { body } = req
    const user = new User(body)
    user.save()
        .then(user => {
            res.json(pick(user, ['_id', 'username', 'email']))
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body
    let userInfo
    User.findByCredentials(email, password)
        .then(user => {
            userInfo = user
            return user.generateToken()
        })
        .then(token => {
            res.json({
                token, user: {
                    _id: userInfo._id,
                    username: userInfo.username,
                    email: userInfo.email
                }
            })
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.account = (req, res) => {
    const { user } = req
    res.send(pick(user, ['_id', 'username', 'email']))
}

module.exports.logout = (req, res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.json({
                notice: 'successfully logged out',
                token: token
            })
        })
        .catch(err => {
            res.json(err)
        })
}