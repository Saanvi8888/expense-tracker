const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

let storage;
let upload;

try {
    console.log("Setting up Cloudinary...");
    
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Cloudinary configured, checking credentials...");
    
    
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
        throw new Error("Missing Cloudinary credentials");
    }

    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'expense-tracker',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'jfif'],
            public_id: (req, file) => `${Date.now()}-${file.originalname}`
        },
    });

    upload = multer({ 
        storage,
        limits: { fileSize: 5 * 1024 * 1024 }
    });
    
    console.log("Cloudinary upload middleware ready");
    
} catch (error) {
    console.error("Cloudinary setup failed, using memory storage:", error.message);
    
    
    storage = multer.memoryStorage();
    upload = multer({ 
        storage,
        limits: { fileSize: 5 * 1024 * 1024 }
    });
}

module.exports = upload;