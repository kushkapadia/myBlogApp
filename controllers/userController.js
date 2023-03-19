const User = require('../models/User')
const Blog = require('../models/Blog')

exports.home = async function(req, res){
  if(req.session.user){
    let blog = new Blog()
  let allBlogs = await blog.getAllBlogs()
    res.render('dashboard',
    blogs = allBlogs
    )
  } else{
    res.render('login')
  }
}


exports.displayRegisterpage = function(req, res){
  res.render('register')
}

exports.register = function(req, res){
  let user = new User(req.body)
  user.register().then(() => {
    req.session.user = {username: user.data.username, _id: user.data._id}
    req.session.save(function(){
        res.redirect('/')
    })
}).catch((regErrors)=>{
    req.session.save(function(){
        res.redirect('/')
    })
})
}

exports.login = function(req, res){
  console.log(req.body)
    let user = new User(req.body)
     user.login().then((result) => {
      req.session.user = {username: user.data.username, _id: user.data._id}
      req.session.save(function(){
        res.redirect('/')
      })
    }).catch((e)=>{
     req.session.save(function(){
      res.redirect('/')
     })
    
          })
    }


    exports.logout = function(req, res){
      req.session.destroy(function(){
       res.redirect('/')
      })
     
     }