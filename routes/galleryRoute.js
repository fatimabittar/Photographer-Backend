const router = express.Router();
import express from "express";

import {
    getAllPhotos,
    createPhoto,
    
  } from "../controllers/galleryController.js";

router.post('/photo/create', createPhoto);
router.get('/get', getAllPhotos);
export default router;