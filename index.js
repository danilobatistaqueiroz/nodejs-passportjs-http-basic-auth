const passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {dashboard,profile}=require('./app')


const clc = require("cli-color")
const cError = clc.red;
const cWarning = clc.yellow;
global.fault = (...f) => console.error(cError(f));
global.warning = (...w) => console.error(cWarning(w));

const auth = require('./auth')

app.use(bodyParser.urlencoded({ extended: true })); 

passport.use(new BasicStrategy(auth.verify))

app.use(auth.printData)

const checkUserPass = passport.authenticate('basic', {
    session:false,
    failureRedirect : '/usuario/login'
  })

  //*** basic e digest servem para APIs pois usa um protocolo que exige confiança entre server e client passando user e pass ****/
app.get('/dashboard', checkUserPass, dashboard)
app.get('/profile', checkUserPass, profile)

/****************************** se passa username and password no request headers authorization basic ******************************* */
app.listen(3000, () => console.log(`app is now running on port 3000`))
