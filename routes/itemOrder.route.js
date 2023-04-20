import express from 'express';
import controller from '../controllers/itemOrder.controller.js';
import protect from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/', controller.createItemOrder);
router.get('/', controller.getItemOrders);
router.get('/:id', controller.getItemOrderById);
router.put('/:id',  controller.updateItemOrder);
router.delete('/:id', controller.deletedItemOrder);

export default router;