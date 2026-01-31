// import { API_PATHS } from "./apiPaths";
// import axiosInstance from "./axiosInstance";

// const uploadImage = async(imageFile) =>{
//     const formData = new FormData();
//     formData.append('image',imageFile);

//     try {
//         const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
//             headers:{
//                 'Content-Type':"multipart/form-data",
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("error uploading the image:",error);
//         throw error;
        
//     }
// }

// export default uploadImage;

const uploadImage = async(imageFile) => {
    // Return placeholder URL immediately - NO API call
    return { 
        imageUrl: "https://ui-avatars.com/api/?name=User&background=random"
    };
};

export default uploadImage;