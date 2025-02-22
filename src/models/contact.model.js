import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {

    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
   
  },
  { versionKey: false, timestamps: true }
);
export const Contact = mongoose.model("contact", contactSchema);