const User = require("../models/user");
const Category = require("../models/category");
const { respondNoResourceFound, redirectIfUnauthorized } = require("./errorController");
const passport = require("passport");
const EcopicksBrand = require("../models/ecopicksBrand");
const RecommendedBrand = require("../models/recommendedBrand");

module.exports = {
  renderProfile: async (req, res) => {
    redirectIfUnauthorized(req, res);
    if (req.query.format === "json") {
      res.json(res.locals.currentUser.savedBrands);
    }
    try {
      let userId = req.user._id;
      const user = await User.findById(userId);
      const allBrands = await EcopicksBrand.find({ savedBy: userId })
      let brands = [];

      let promise = allBrands.map(async (a) => {
        brands.push({
          "_id": a._id,
          "category": await Category.findById(a.category),
          "name": a.name,
          "endpoint": a.endpoint,
          "website": a.website,
          "slogan": a.slogan,
          "description": a.description,
          "image": a.image,
          "savedBrands": a.savedBrands,
          "popular": a.popular,
        });
      });
      await Promise.all(promise);

      res.render("user/profile", {
        user: user,
        categories: await Category.find({}),
        data: req.data,
        savedBrands: brands,
        recommendedBrands: res.locals.recommendedBrands,
      });
    } catch (error) {
        console.log(`Error :${error.message}`);
        respondNoResourceFound(req, res)
    }
  },

  renderLogin: (req, res) => {
    res.render("pages/login");
  },

  renderRegister: (req, res) => {
    res.render("pages/register");
  },

  authenticate: passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Your email or password is incorrect.",
    successRedirect: "/",
    successFlash: "You're successfully logged in!"
  }),

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  },

  validateRegister: (req, res, next) => {
    //validate password repeat
    let password = req.body.password;
    let passwordRepeat = req.body.password_repeat;

    if (password === passwordRepeat) {
      next();
    } else {
      req.flash("error", `Please make sure your passwords match.`);
      res.redirect("/registration");
    }
  },

  createUser: (req, res, next) => {
    let userParams = {
      username: req.body.username,
      email: req.body.email,
    };

    let newUser = new User(userParams);

    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", `Account created successfully!`);
        res.locals.redirect = "/login";
        next();
      } else if (error) {
        console.error(`Error creating user: ${error.message}`);
        res.locals.redirect = "/registration";
        let errormessage = ``;
        if (error.message.includes('username')) {
          errormessage += `This email is already associated with an account. `;
        }
        if (errormessage.length === 0) {
          errormessage = `Failed to create user account. ➥${error.message}.`;
        }
        req.flash("error", errormessage);
        next();
      }
    });
  },

  getAllUsers: (req, res) => {
    User.find({})
      .then(users => {
        res.render("user/index", {
          users: users
        })
      })
      .catch(error => {
        res.send(error);
        res.redirect("/");
      });
  },

  renderEdit: (req, res) => {
    redirectIfUnauthorized(req, res);
    res.render('user/editProfile', {
      user: req.user,
      correctPassword: res.locals.correctPassword,
    });
  },

  updateUsername: (req, res) => {
    redirectIfUnauthorized(req, res);

    let userId = req.user._id;
    let username = req.body.username;

    User.findByIdAndUpdate(userId, {
      username: username
    }, (error) => {
        if(error) {
          res.json({'result' : 'failed', 'username': username, 'error': `${error.message}`});
        } else {
          res.json({'result' : 'success', 'username': username});
        }
    })
  },

  updateUserEmail: (req, res) => {
    redirectIfUnauthorized(req, res);

    let userId = req.user._id;
    let currentUserEmail = req.user.email;
    let newEmail = req.body.email;
    let confirmEmail = req.body.confirmEmail;

    // Validate email format
    const isEmail = (email) => {
      let EmailRegex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return EmailRegex.test(email);
    }

    if (newEmail.trim() === '' || confirmEmail.trim() === '') {
      res.json({'result': 'failed', 'error': 'Empty required field'});
    } else if (newEmail === currentUserEmail) {
      res.json({'result': 'failed', 'error': 'Invalid new email'});
    } else if (newEmail !== confirmEmail) {
      res.json({'result': 'failed', 'error': 'Emails do not match'});
    } else if (newEmail.trim() !== '' && !isEmail(newEmail)) {
      res.json({'result': 'failed', 'error': 'Invalid email format'});
    } else {
      User.findByIdAndUpdate(userId, {
        email: newEmail
      })
          .then(() => {
            res.json({'result': 'success', 'currentEmail': currentUserEmail, 'newEmail': newEmail});
          })
          .catch(error => {
            console.log(error.message);
            res.json({'result': 'failed', 'email': `${newEmail}`, 'error': error.message});
          })
    }
  },

  updateUserPassword: (req, res) => {
    redirectIfUnauthorized(req, res);

    let userId = req.user._id;
    let currentPassword = req.body.currentPassword;
    let newPassword = req.body.newPassword;
    let newPasswordRepeat = req.body.newPasswordRepeat;

    if (currentPassword.trim() === '' || newPassword.trim() === '' || newPasswordRepeat.trim() === '')  {
      res.json({'result': 'failed', 'error': 'Empty required fields.'});
    } else if (currentPassword === newPassword) {
      res.json({'result': 'failed', 'error': 'Invalid new password'});
    } else {
      User.findById(userId).then(foundUser => {

        foundUser.changePassword(currentPassword, newPassword)
            .then(() => {
              res.json({'result': 'success'});
            })
            .catch((error) => {
                res.json({'result': 'failed', 'error': `${error.message}`});
            })
      }).catch((error) => {
          res.json({'result': 'failed', 'error': `${error.message}`});
      });
    }
  },

  renderRecommendPage: (req, res) => {
    redirectIfUnauthorized(req, res);
    res.render("user/recommendNewBrand");
  },

  saveUserRecommendation: async (req, res) => {
    redirectIfUnauthorized(req, res);

    try {
      let currentUser = req.user;
      let newRecommendation = new RecommendedBrand({
        brandName: req.body.brandName,
        website: req.body.website,
        description: req.body.description || "",
        userId: currentUser._id,
        approved: false,
      });

      await newRecommendation.save();
      await  User.findByIdAndUpdate(currentUser._id, {
          $addToSet: {recommendedBrands: newRecommendation._id}
        }).then (() => {
        res.render("pages/confirmation");
      })
    } catch (error) {
      respondNoResourceFound(req, res);
    }
  },

  getAllRecommendedBrands: async (req, res, next) => {
    redirectIfUnauthorized(req, res);

    try {
      res.locals.recommendedBrands = await RecommendedBrand.find({ userId: req.user._id });
      next();
    } catch (error) {
      respondNoResourceFound(req, res);
    }
  },

  /**
   * Delete recommended brand
   */
  deleteRecommendedBrand: async (req, res) => {
    redirectIfUnauthorized(req, res);

    try {
      let brandId = req.params.id;
      let deletedBrand = await RecommendedBrand.findById(brandId);
      if(!deletedBrand.approved) {
        // Remove from user's recommended collection
        await User.findByIdAndUpdate(deletedBrand.userId, {
          $pull: {recommendedBrands: deletedBrand._id}
        }, {new: true});
        // Keep the recommendation but only remove userId
        await RecommendedBrand.findByIdAndUpdate(brandId,
          {userId: null}, {new: true});
        req.flash("success", `Your recommended brand has been deleted.`);
        res.redirect("/user");
      } else {
          req.flash("error", `Please do not delete Ecopicks approved brand`);
          res.redirect("/user");
      }
    } catch (error) {
        console.log(error);
        respondNoResourceFound(req, res);
      }
  }
};
