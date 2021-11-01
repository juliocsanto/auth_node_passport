const User = require('./../../model/user')

module.exports = (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect('/users')
        })
        .catch(err => console.log(err.message))
}