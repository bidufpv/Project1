import axios from 'axios';

export const uploadToCloudinary = async (file) => {
  try {
    if (!file) throw new Error('No file provided');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "unsignedupload"); // Use environment variable
    formData.append('folder', 'categories'); // Optional

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dfzr1sxu6/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Cloudinary upload failed');
    }

    return response.data.secure_url; // ✅ Return uploaded image URL
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return null;
  }
};