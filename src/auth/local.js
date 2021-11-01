const LocalStrategy = require('passport-local')
const User = require('./../model/user')

module.exports = (passport) => {
    passport.serializeUser((user, cb) => {
        return cb(null, user._id)
    })

    passport.deserializeUser((id, cb) => {
        User
            .findById(id)
            .then(user => cb(null, user))
            .catch(err => cb(err, {}))
    })

    passport.use('local-signup', new LocalStrategy({
        userNameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, cb) {
            User
                .findOne({ username: username })
                .then((userExists) => {
                    if (!userExists) {
                        let user = new User(req.body)
                        user.password = user.genHash(user.password)

                        return user
                            .save()
                            .then((user) => {
                                console.log(user)
                                return cb(null, user)
                            })
                            .catch(err => {
                                console.trace(`>>> ${err.message}`);
                                return
                            })
                    }

                    return cb(null, false)
                })
                .catch((err) => {
                    return cb(err, null)
                })
        }
    ))

    passport.use('local-signin', new LocalStrategy({
        userNameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req, username, password, cb){
            User
                .findOne({ username: username })
                .then((user) => {
                    if (!user) {
                        return cb(null, false)
                    }

                    user.validar(password, (err, result) => {
                        if (!result || err) {
                            return cb(null, false)
                        }

                        return cb(null, user)
                    })
                })
                .catch((err) => {
                    return cb(err, null)
                })
        }
    ))
}