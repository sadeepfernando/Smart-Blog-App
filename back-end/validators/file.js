
const validateExtension = (extension) =>{
    if(extension==='.jpg' || extension==='.jpeg' || extension==='.png'){
        return true;
    }else{
        return false;
    }
}

module.exports = { validateExtension };