import image from "../models/imageModel.js";
import fs from "fs";

// Get all images
const getImages = async (req, res) => {
  try {
    const images = await image.find();
    const result = images.map((item) => {
      const file = fs.readFileSync(item.image_url);
      const image = Buffer.from(file).toString("base64");
      return {
        image,
        section: item.section,
        page: item.page,
        width: item.width,
        height: item.height,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create image
const createImage = async (req, res) => {
  try {
    const imageFile = req.file.path;

    const { section, page, width, height } = req.body;

    // Save image URL to database
    const newImage = new image({
      image_url: imageFile,
      width,
      height,
      page,
      section,
    });
    const savedImage = await newImage.save();

    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an image by ID
const updateImage = async (req, res) => {
  try {
    const img = await image.findById(req.params.id);
    const file = fs.readFileSync(req.body.image_url);
    const image = Buffer.from(file).toString("base64");

    img.image_url = req.body.image_url;
    img.section = req.body.section;
    img.page = req.body.page;
    img.height = req.body.height;
    img.width = req.body.width;

    const updatedImage = await img.save();

    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an image by ID
const deleteImage = async (req, res) => {
  try {
    const deletedImage = await image.findByIdAndDelete(req.params.id);
    if (deletedImage) {
      fs.unlinkSync(deletedImage.image_url); // delete the physical image file from disk
      res.json(deletedImage);
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getImages, updateImage, deleteImage, createImage };
