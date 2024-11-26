import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");//("login", {messages: req.session.messages})
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: "Password is incorrect", //needs to be fixed
    /* FIX ME: 😭 failureMsg needed when login fails */
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

router.get("", (req, res) => {
  res.redirect("/auth/login");
});

export default router;
