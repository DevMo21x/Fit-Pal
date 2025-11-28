import bycrypt from 'bcrypt'
console.log(bycrypt.hashSync("mypassword", 10));