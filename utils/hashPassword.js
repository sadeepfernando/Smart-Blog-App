const bycrypt = require('bcryptjs');


const hashPassword = (password)=>{

    return new Promise((resolve,reject) => {
        bycrypt.genSalt(12, (error,salt) =>{
            if(error){
                return reject(error);
            }
            bycrypt.hash(password,salt,(error,hash) =>{
                if(error){
                    return reject(error)
                }
                resolve(hash);
            })
        })
    })
}

module.exports = hashPassword;