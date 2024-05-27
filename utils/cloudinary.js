//const cloudinary = require("cloudinary").v2;
//const fs = require('fs');
//const path = require('path');
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";




// Aquí le podemos cambiar el nombre a la carpeta de "node_app", y ponerle
// un nombre diferente a la carpeta donde queramos subir nuestros archivos
// a cloudinary
const folder = "upload";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadToCloudinary = async(file) => {
    const { path: filePath, filename } = file
    
    try {
        const filePathOnCloudinary = folder + "/" + path.parse(filename).name;
        console.log(filePathOnCloudinary)
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: filePathOnCloudinary
        })
        console.log(filePath)
        console.log(result)
        return result;
    } catch (error) {
        console.log(error);
        return { message: "Upload to cloudinary failed" };
    } finally {
        fs.unlinkSync(filePath);
    }
}



const deleteFromCloudinary = async(url) => {
    try {
        const imageName = url.split(folder)[1];
        const publicId = folder+imageName.split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        
    } catch (error) {
        console.log(error);
        return { message: "Delete from cloudinary failed" }
    }
}

export {
    uploadToCloudinary, deleteFromCloudinary 
}

//module.exports = { uploadToCloudinary, deleteFromCloudinary };