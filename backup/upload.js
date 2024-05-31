const multer = require('multer');
const path = require('path');
const generateCode = require('../utils/generateCode');


const storage = multer.diskStorage({
    destination : (req, file, callback) =>{
        callback(null,'./uploads');
    },

    filename : (req,file,callback) =>{
        //original_file_name_12_digit_random_number.extension
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const filename = originalName.replace(extension, '');
        const compressedFilename = filename.split(' ').join('_');
        const lowerCaseFilename = compressedFilename.toLocaleLowerCase();
        const code = generateCode(12);
        const finalFile = ` ${lowerCaseFilename}_${code}${extension}`;

        callback(null, finalFile);
    }
})

const uploads = multer({
    storage: storage,
    fileFilter: (req,file,callback) =>{
        const mimeType = file.mimetype;

        if(mimeType === 'image/jpg' || mimeType ==='image/jpeg' || mimeType==='image/png' || mimeType==='application/pdf'){
            callback(null, true);
        }else{
            callback(new Error('Insert a valid file format'));
        }
    }
});


module.exports = uploads;
