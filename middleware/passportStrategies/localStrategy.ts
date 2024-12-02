import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
 // Check if user exists in databse
 const user = getUserByEmailIdAndPassword(email, password);
 return user
   ? done(null, user)
   : done(null, false, {
       message: "Your login details are not valid. Please try again.",
     });
}
);
    // if (typeof user!= "string") {
    //   return done(null, user, {message: ""});
    // } else {
    //   return done(null, false, {
    //     message: user}); //This is the message I want
    // }
    //  else if (user===null) {
    //     return done(null, false, {
    //   message: ("Couldn't find user with email: "+ email)});
    // }


/*
*/
passport.serializeUser(function (user: Express.User, done: any) {
  done(null, user.id);
});

/*
*/
passport.deserializeUser(function (id: Number, done: any) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
