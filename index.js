const path = require('path')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
//const basicStrategy = require('./src/auth/basic')
const app = express();
const port = process.env.PORT || 9000

const db = require("./src/mongoosedb")
db.init();
/* PASSPORT BASIC */
//passport.use(require('./src/auth/basic'))
//app.get('*', passport.authenticate('basic', { session: false }))

/* PASSPORT LOCAL */
require('./src/auth/local')(passport)
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({ secret: '@h(7JHR(@*&SDEWRMI($&%', resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/view'))
// console.log(path.join(__dirname, 'src/view'));


require('./src/index')(app, passport)

app.listen(port, () => {
    console.log(`Express has been started! Listening on port ${ port }`)
})