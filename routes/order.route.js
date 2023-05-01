import express from 'express';
import controller from '../controllers/order.controller.js';
import {protect} from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/', controller.createOrder);
router.get('/', protect, controller.getOrders);
router.get('/:id',protect,  controller.getOrderById);
router.put('/:id',protect,  controller.updateOrder);
router.delete('/:id',protect,  controller.deletedOrder);

export default router;
