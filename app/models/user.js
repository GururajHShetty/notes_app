const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return { error: 'invalid email format' }
            }

        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

userSchema.pre('save', function (next) {
    const user = this
    if (user.isNew) {
        bcryptjs.genSalt(10)
            .then(salt => {
                bcryptjs.hash(user.password, salt)
                    .then(encryptedPassword => {
                        user.password = encryptedPassword
                        next()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    } else {
        next()
    }
})

userSchema.statics.findByCredentials = function (email, password) {
    const User = this
    return User.findOne({ email })
        .then(user => {
            if (user) {
                return bcryptjs.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            return Promise.resolve(user)
                        } else {
                            return Promise.reject({ errors: 'invalid email/ password' })
                        }
                    })
                    .catch(err => {
                        return Promise.reject(err)
                    })
            } else {
                return Promise.reject({ errors: 'invalid email/ password' })
            }
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

userSchema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }

    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({ token })
    return user.save()
        .then(user => {
            return Promise.resolve(token)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

userSchema.statics.findByToken = function (token) {
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt@123')
    } catch (err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User }