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


router.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
        console.log("Upload request received");
        
        if(!req.file){
            console.log("No file in request");
            return res.status(400).json({message:"No file uploaded"});
        }
        
        console.log("File details:", {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path
        });
        
        const imageUrl = req.file.path;
        console.log("Upload successful, URL:", imageUrl);
        
        res.status(200).json({imageUrl});
        
    } catch (error) {
        
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        console.error("Full error:", JSON.stringify(error, null, 2));
        
        
        res.status(500).json({ 
            message: "Image upload failed",
            error: error.message 
        });
    }
});
module.exports = router;