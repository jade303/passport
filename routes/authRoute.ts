import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  // const p = await req.session;
  // const messages = '';//req.isAuthenticated;
  res.render("login", { msg: req.session.messages });//("login", {messages: req.session.messages})
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: "Message ???"
    /* FIX ME: 😭 failureMsg needed when login fails */
    
  })
);

/*
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // send a regular response
  res.send('regular')
})

*/

/**
 * passport.authenticate("local", {
    failureRedirect: "/error",
    successRedirect: "/success"
}, (err, user, options) => {
    res.render("login", {options});
    console.log(options) // options will be the complete object you pass in done()
});
 */


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

//New routes

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/forgot", (req, res) => {
  res.render("forgot");
});

/* To do: implement ?
router.post(
  "/reset",
  passport.authenticate("local", {
    successRedirect: "/auth/login",
    failureRedirect: "/auth/login",
*/

//

router.get("", (req, res) => {
  res.redirect("/auth/login");
});

export default router;
