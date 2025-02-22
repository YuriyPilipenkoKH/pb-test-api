import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
    },
    image: { 
      type: String, 
      required: false,
      default: 'https://res.cloudinary.com/dwdkw1a4j/image/upload/v1738882469/tracker/placeholder/mpfqmdq0qi17vkq87kxd.jpg'
    },
    role: { 
      type: String, 
      required: true,
      default: 'user'
    },
    phone: { 
      type: String, 
      required: false,
      default: ''
    },
    city: { 
      type: String, 
      required: false,
      default: ''
    },
  },
  { versionKey: false, timestamps: true }
);
export const User = mongoose.model("user", userSchema);