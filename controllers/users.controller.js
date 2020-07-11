const mongoose = require('mongoose')
const User = require('../models/user.model')

module.exports.login = (req, res, next) => {
  res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        user.checkPassword(req.body.password)
          .then(match => {
            if (match) {
              req.session.userId = user._id

              res.redirect('/tweets')
            } else {
              res.render('users/login', {
                error: {
                  email: {
                    message: 'user not found'
                  }
                }
              })
            }
          })
      } else {
        res.render("users/login", {
          error: {
            email: {
              message: "user not found",
            },
          },
        });
      }
    })
    .catch(next)
}

module.exports.signup = (req, res, next) => {
  res.render('users/signup')
}

module.exports.createUser = (req, res, next) => {
  const user = new User(req.body)

  user.save()
    .then(() => {
      res.redirect("/login");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("users/signup", { error: error.errors, user });
      } else if (error.code === 11000) { // error when duplicated user
        res.render("users/signup", {
          user,
          error: {
            email: {
              message: 'user already exists'
            }
          }
        });
      } else {
        next(error);
      }
    })
    .catch(next)
}

module.exports.logout = (req, res, next) => {
  req.session.destroy()

  res.redirect('/login')
}