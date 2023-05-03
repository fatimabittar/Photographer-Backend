const router = express.Router();
import express from "express";

import {
    getAllPhotos,
    createPhoto,
    deletePhoto
  } from "../controllers/galleryController.js";

router.post('/photo/create', createPhoto);
router.get('/get', getAllPhotos);
router.delete('/delete/:id',deletePhoto)
export default router;