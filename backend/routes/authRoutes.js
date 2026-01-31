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


// router.post("/upload-image", upload.single("image"), (req, res) => {
//     try {
//         if(!req.file){
//             return res.status(400).json({message:"No file uploaded"});
//         }
        
//         const imageUrl = "https://ui-avatars.com/api/?name=User&background=random";
        
//         res.status(200).json({imageUrl});
        
//     } catch (error) {
//         console.error("Upload error:", error.message);
//         res.status(500).json({ 
//             message: "Image upload failed",
//             error: error.message 
//         });
//     }
// });
module.exports = router;