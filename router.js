const express= require('express')
//middleware function, which allows you to define multiple route handlers on a single path prefix.
const router = express.Router()

//require needed controllers
const blogController = require('./controllers/blogController')
const userController = require('./controllers/userController')


//Paths/routes

//login related routes
router.get('/', userController.home)
router.get('/register-page', userController.displayRegisterpage)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

router.get('/create-blog-page', blogController.displayCreateBlogPage)
router.post('/create-blog', blogController.create)
router.get('/view-blog/:id', blogController.viewBlog)

router.post("*", function(req, res){
    console.log("404")
})

module.exports=router