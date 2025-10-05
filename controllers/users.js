const user = require("../models/user");


module.exports.SignUp = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new user({ username, email });
      let registureduser = await user.register(newUser, password);
      console.log(registureduser);
      req.login(registureduser, (err) => {
        if (
          (err) => {
            return next(err);
          }
        )
          req.flash("success", "wellcome to wonderlust");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/listings");
    }
  }



  module.exports.Login= async (req, res) => {
    req.flash("success", "wellcome back to wonderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }


  module.exports.Logout =  (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You logOut Succesfully");
    res.redirect("/listings");
  });
}