const express = require('express')
const router = express.Router()

module.exports = passport => {
    router.get('/', require('./login'))
    router.get('/logout', require('./logout'))
    router.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/users'
    }))

    return router
}