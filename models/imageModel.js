import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      enum: ["home", "gallery", "services", "shop", "about"],
      required: true,
    },
  },
  { timestamps: true }
);

const image = mongoose.model("image", imageSchema);

export default image;
