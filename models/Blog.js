const { ObjectId } = require("mongodb")
const blogsCollection = require('../db').collection('blogsCollection')


//Constructor function
let Blog = function(data, authorID, username){
    this.data = data,
    this.authorID = authorID
    this.username = username
    this.errors =[]
    }

Blog.prototype.cleanUp =function(){
    this.data = {
        title: this.data.title,
        body: this.data.body,
        createdBy: this.username,
        authorID: new ObjectId(this.authorID),
        createdDate: new Date()       
    }  
    }

    //function to create a new blog
Blog.prototype.createBlog = async function(){
this.cleanUp()
await blogsCollection.insertOne(this.data)
}

//Function to delete a particular blog
Blog.prototype.deleteBlog = async function(deleteId){
await blogsCollection.findOneAndDelete({_id:new ObjectId(deleteId)})
}

Blog.prototype.getAllBlogs = async function(){
 let allBlogs =await blogsCollection.find({}).sort({createdDate: -1}).toArray()   
 return allBlogs
}


Blog.prototype.getBlogById = async function(blogId){
    let blogDoc = blogsCollection.findOne({_id: new ObjectId(blogId)})
    return blogDoc
}
module.exports = Blog