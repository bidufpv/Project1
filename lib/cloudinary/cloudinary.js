import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


//for uploading
const cloudinaryUpload = async(localFilePath)=>{
    try{
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded
        // console.log('File has been uploaded on cloudinary', response.url);
        fs.unlinkSync(localFilePath);
        return response;

        
        
    }
    catch(error){
        fs.unlinkSync(localFilePath); // for file deletion
        // removes the locally saved temporary file from the server.
        return null;
    }
}

export {cloudinaryUpload};