import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      enum: ["home", "gallery", "services", "shop", "about"],
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const image = mongoose.model("image", imageSchema);

export default image;
