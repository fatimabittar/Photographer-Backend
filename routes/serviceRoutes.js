const router = express.Router();
import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

router.route("/").get(getServices).post(createService);

router
  .route("/:id")
  .put(updateService)
  .delete(deleteService)
  .get(getServiceById);

export default router;
