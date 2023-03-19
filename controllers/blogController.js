const Blog = require('../models/Blog')

exports.create = function(req, res){
    console.log(req.body)
    let blog = new Blog(req.body, req.session.user._id, req.session.user.username)
    blog.createBlog()
    res.redirect('/')
}

exports.displayCreateBlogPage = function(req, res){
    res.render('create')
}

exports.viewBlog = async function(req, res){
    let blog = new Blog()
    let blogDoc = await blog.getBlogById(req.params.id)
    res.render('viewBlog', {
        blog: blogDoc
    }
    )
}