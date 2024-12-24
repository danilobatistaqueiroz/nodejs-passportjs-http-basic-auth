function verify(username, password, done) {
  warning(username,password);
  if(!username && !password) done("Username and password must be provided")
  if(!username || username.length === 0) done('Username not provided')
  if(username.length < 3) done('Username minimum length must be at least 3 characters')
  if(!password || password.length === 0) done('Password not provided')
  if(password.length < 8) done('Password minimum length must be at least 8 characters')
  if (!(username=="joke" && password=="joke123456")) {
    return done(null, false, { message: 'Incorrect username or password.' });
  }
  return done(null, {username:"joke",id:"1"});
}

let count = 1
printData = (req, res, next) => {
  console.log("\n===========PRINT=DATA===================")
  console.log(`count -------->  ${count++}`)
  console.log(`req.headers.authorization -------> ${req.headers.authorization}`) 
  console.log("=============PRINT=DATA==================\n")

  next()
}

module.exports = {verify,printData};