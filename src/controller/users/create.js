const User = require('./../../model/user')

module.exports = (req, res) => {
    let user = new User(req.body)
    user.password = user.genHash(user.password)

    user
        .save()
        .then((user) => {
            console.log(user);
            return res.redirect('/')
        })
        .catch(err => {
            console.log(err.message);
            return
        })
}