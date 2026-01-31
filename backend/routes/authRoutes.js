const express= require("express");
const {protect} =require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware")
const{
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/getUser",protect,getUserInfo);


router.post("/upload-image", upload.single("image"), (req, res) => {
    
    try {
        if (!req.file) {
            console.log("No file received");
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        console.log("File uploaded successfully:", {
            filename: req.file.originalname,
            url: req.file.path,
            size: req.file.size
        });
        
        const imageUrl = req.file.path;
        
        res.status(200).json({ imageUrl });
        
    } catch (error) {
        console.error("Upload route error:", error.message);
        console.error(error.stack);
        res.status(500).json({ 
            message: "Image upload failed",
            error: error.message 
        });
    }
});
module.exports = router;