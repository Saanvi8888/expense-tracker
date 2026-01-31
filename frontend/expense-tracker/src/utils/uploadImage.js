import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async(imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        console.log("Uploading to Cloudinary...");
        const response = await axiosInstance.post(
            API_PATHS.IMAGE.UPLOAD_IMAGE, 
            formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                },
            }
        );
        console.log("Upload success:", response.data);
        return response.data;
    } catch (error) {
        console.error("Upload failed:", error.response?.data || error.message);
        throw error;
    }
};

export default uploadImage;