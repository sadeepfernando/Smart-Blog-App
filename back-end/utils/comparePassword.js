const bcrypt = require('bcryptjs');


const comparePassword = (password, hashedPassword) =>{

    //here, it return a boolean
    return bcrypt.compare(password,hashedPassword);
}

module.exports = comparePassword;