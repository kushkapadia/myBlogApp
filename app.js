//Basically a file to configure Express.js
const router = require('./router')
const express = require('express')
const session = require('express-session') 
const MongoStore = require('connect-mongo') //The connect-mongo package allows you to store session data in MongoDB,


//This code creates a new instance of the Express.js application framework, which can be used to build web applications and APIs using Node.js.
const app = express()


let sessionOptions = session({
    secret:  "Maheshmati is Ruled by BhalalDev Instead of Baahubali",
    store: MongoStore.create({ client: require('./db'), mongoUrl: "mongodb+srv://todoAppUser:kk1234567kk@cluster0.6lvjr.mongodb.net/blogApp?retryWrites=true&w=majority", collectionName: "sessions" }),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 48, httpOnly: true}
})

app.use(sessionOptions)

//The purpose of this middleware function is to make the user object available to all views rendered by the application. The user object is stored in the session object, which is maintained on the server-side and used to store user-specific data between requests.

app.use(function(req, res, next){
    res.locals.user = req.session.user
    next()
    })

//To access the data user inputs in form.
app.use(express.urlencoded({extended: false}))
//just a bolierplate code, tells our express server to add the user submitted data to request object.
app.use(express.json())


app.use(express.static('public'))
//We are telling our express server to make the folder accessible.
//in public folder there are all the files who that we want to show all the visitors of our app. (css, browser.js, etc)
app.set('views', 'views')
//a has to be views, it is an express option(views configeration).b is the folder created for our views.
app.set('view engine', 'ejs')
//The template system we are using is ejs. There are many different options in javascript community
//npm install ejs




app.use('/', router)


module.exports = app
