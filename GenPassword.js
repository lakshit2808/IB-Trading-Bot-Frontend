const bcrypt = require('bcrypt');
let pswd = bcrypt.hashSync('123456', 9);
console.log(pswd);