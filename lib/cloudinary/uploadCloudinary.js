import axios from "axios";

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsignedupload"); // Replace with your preset
    formData.append("folder", "categories"); // Optional

    const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfzr1sxu6/image/upload",
        formData
    );

    return response.data.secure_url; // The URL of the uploaded image
};

