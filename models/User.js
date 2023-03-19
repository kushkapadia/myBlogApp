const usersCollection = require('../db').collection("users")
const bcrypt = require("bcryptjs")


let User = function(data){
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function(){
    this.data = {
    firstName : this.data.firstname,
    lastName : this.data.lastname,
    email: this.data.email,
    username: this.data.username,
    password: this.data.password
    }
}

User.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
      this.cleanUp()
      if (!this.errors.length) {
//--Ask them to console.log the orignal password
        // hash user password
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password, salt)
        await usersCollection.insertOne(this.data)
        resolve()
      } else {
        reject(this.errors)
      }
    })
  }


  User.prototype.login = function(req, res){
    this.cleanUp()
    console.log("Heree")

    return new Promise((resolve, reject) => {
      this.cleanUp()
      usersCollection.findOne({ username: this.data.username }).then((attemptedUser) => {

          if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
              this.data = attemptedUser
              resolve(this.data)
          } else {
              console.log("Invalidd")

              reject("Invalid username / password.")
          }
      }).catch(function () {
          console.log("Failed")

          reject("Please try again later.")
      })
  })

    }
  module.exports = User