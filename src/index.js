module.exports = (app, passport) => {
    //app.set('views', path.join(__dirname, 'src/view')),
    app.use('/', require('./controller/main/index'))
    app.use('/users', require('./controller/users/index')(passport))
    app.use('/auth', require('./controller/auth/index')(passport))
}