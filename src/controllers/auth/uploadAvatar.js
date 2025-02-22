import cloudinary from "../../lib/cloudinary.js";
import { User } from "../../models/user.model.js";



export const uploadAvatar = async (req, res) => {
  const userId = req.user._id
  if (!userId) {
    res.status(400).json({ message: 'User ID not found' });
  }
  if (!req.headers['content-type']?.includes('multipart/form-data')) {
    res.status(400).json({ message: 'Invalid content type' });
 }
 try {
  let imageUrl = null;
  if (req.file) {
    // Upload the file to Cloudinary using a Promise
    const uploadResponse = await new Promise((resolve, reject) => {
      const fileStream = cloudinary.uploader.upload_stream(
        {
            folder: `phonebook-08/users/${userId}`,
            public_id: userId,
            overwrite: true,
            // use_filename: true,
            // unique_filename: false,
        },
        (error, result) => {
          if (error) {
            reject(error); // Reject the promise on error
          } else {
            resolve(result); // Resolve the promise with the result
          }
        }
      );
      // Pipe the file buffer to Cloudinary
      fileStream.end(req.file.buffer);
    });

    imageUrl = uploadResponse.secure_url; // Store the uploaded file URL
  }
  console.log('Upload complete:', imageUrl);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { image: imageUrl },
    { new: true }
  );
  if (!updatedUser) {
    res.status(401).json({
      message: "Invalid credentials",
      credentialsError: true,
      errorCode: 'credentialsError',
    });
    return;
  }
  const { password: _, ...plainUser } = updatedUser.toObject()

  res.status(200).json({
    message: 'Profile image uploaded successfully',
    user : plainUser,
    success: true
  });
 
 } catch (error) {
  console.error('Error uploading to Cloudinary:', error);
  res.status(500).json({
   message: 'File upload failed',
 });
 }
}