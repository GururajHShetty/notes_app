const { User } = require('../app/models/user')

const authenticateUser = function (req, res, next) {
    const token = req.header('x-auth')
    User.findByToken(token)
        .then(user => {
            if (user) {
                req.user = user
                req.token = token
                next()
            } else {
                res.status('401').send({})
            }
        })
        .catch(err => {
            res.status('401').send({})
        })
}

module.exports = ({ authenticateUser })