const { PutObjectCommand ,S3Client , GetObjectCommand , DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { awsRegion, awsAccessKey,awsSecretAccessKey, awsbucketName } = require('../config/keys');
const generateCode = require('./generateCode');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey
    }
})


const uploadFileToS3 = async({file, extension}) =>{
   //somerandom_number.extension
   const key = `${generateCode(12)}_${Date.now()}${extension}`;
   const params ={
    Bucket: awsbucketName,
    Body: file.buffer,
    Key : key,
    ContentType:file.mimetype
   }

   const command = new PutObjectCommand(params);

   try {
        await client.send(command);
        return key;
   } catch (error) {
    console.log(error)
   }
}

const signedUrl = async(Key) =>{
    const params ={
        Bucket:awsbucketName,
        Key:Key,

    }
    const command = new GetObjectCommand(params);

    try {
        const url = await getSignedUrl(client,command, {expiresIn: 60});
        return url;
        
    } catch (error) {
        console.log(error)
    }
}

const deleteFileFromS3 = async(Key) =>{
    const params = {
        Bucket : awsbucketName,
        Key: Key,
    }

    const command = new DeleteObjectCommand(params);
    try {
        await client.send(command);
        return;

    } catch (error) {
        console.log(error);
    }
}


module.exports = { uploadFileToS3 , signedUrl , deleteFileFromS3 };