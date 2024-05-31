const path = require('path');
const { validateExtension } =require('../validators/file');
const { uploadFileToS3 } = require('../utils/awsS3');

const uploadFile = async(req,res, next) =>{
    try{
        const { file } = req;
        if(!file){
            res.code = 400;
            throw new Error('File is not selected');
        }
        const extension = path.extname(file.originalname);
        const isValidExtension = validateExtension(extension);

        if(!isValidExtension){
            res.code = 400;
            throw new Error('Only .jpg , .jpeg or .png format is valid');
        }

        const key = await uploadFileToS3({ file, extension });

        res.status(201).json({code : 201,status:true, message:'File stored successfully'});
       
    }catch(error){
        next(error);
    }
}


module.exports =
{
    uploadFile,
}