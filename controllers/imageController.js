import image from "../models/imageModel.js";
import fs from "fs";

// Get all images
const getImages = async (req, res) => {
  try {
    const section = req.query.section;
    const page = req.query.page;

    let filter = {};
    if (section) {
      filter.section = section;
    }
    if (page) {
      filter.page = page;
    }

    const images = await image.find(filter);
    const result = images.map((item) => {
      const file = fs.readFileSync(item.image_url);
      const image = Buffer.from(file).toString("base64");
      return {
        image,
        id: item.id,
        section: item.section,
        page: item.page,
        width: item.width,
        height: item.height,
        priority: item.priority,
        x: item.x,
        y: item.y,
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
    const imageFile = req.file?.path;

    const { section, page, width, height, priority, x, y } = req.body;

    // Save image URL to database
    const newImage = new image({
      image_url: imageFile,
      width,
      height,
      page,
      section,
      priority,
      x,
      y,
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

    const imageFile = req.file?.path;

    const { section, page, width, height, priority, x, y } = req.body;

    if (imageFile) img.image_url = imageFile;
    if (section) img.section = section;
    if (page) img.page = page;
    if (height) img.height = height;
    if (width) img.width = width;
    if (priority) img.priority = priority;
    if (x) img.x = x;
    if (y) img.y = y;

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
