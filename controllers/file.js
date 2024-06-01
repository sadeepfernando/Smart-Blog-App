const path = require('path');
const { validateExtension } =require('../validators/file');
const { uploadFileToS3, signedUrl } = require('../utils/awsS3');
const  File  = require('../models/File')

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

        if(key){
            const newFile = new File({
                key:key,
                size: file.size,
                mimetype:file.mimetype,
                createdBy:req.user._id,
            });

            await newFile.save();
        }


        res.status(201)
        .json({code : 201,status:true, message:'File stored successfully'});
       
    }catch(error){
        next(error);
    }
}

const getSignedUrl = async(req,res,next) =>{
    try {
        const {key} = req.query;
        const url = await signedUrl(key);

        res.status(200)
        .json({code:200, status:true, message:'Get signed url successfully', data:{url}});

    } catch (error) {
        next(error);
    }
}

module.exports =
{
    uploadFile,
    getSignedUrl,
}