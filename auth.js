const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const Person = require('./models/person');


passport.use(new LocalStratergy(async (USERNAME, password, done) => {
    // authentication logic here 
    try{
      console.log('Received credentials: ' , USERNAME, password);
      const user = await Person.findOne({username: USERNAME});
      if(!user){
        return done(null, false, {message: 'Incorrect Username'});
      }
      const isPasswordMatch = user.password === password ? true : false;
      if(isPasswordMatch){
        return done(null, user);
      }
      else{
        return done(null, false, {message: 'Incorrect password'});
      }
  
    }catch(error){
       return done(error);
    }
  }))

  module.exports = passport;  // export configured passport