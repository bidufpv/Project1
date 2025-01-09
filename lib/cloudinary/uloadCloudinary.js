import axios from "axios";

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned upload"); // Replace with your preset
    formData.append("folder", "categories"); // Optional

    const response = await axios.post(
        "https://res.cloudinary.com/dfzr1sxu6/image/upload/v1732391977/oujotcm0yiatbaiyoouv.jpg",
        formData
    );

    return response.data.secure_url; // The URL of the uploaded image
};
