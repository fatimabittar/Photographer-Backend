import express from 'express';
import controller from '../controllers/item.controller.js';
import protect from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/', protect, controller.createItem);
router.get('/', protect, controller.getItems);
router.get('/:id', protect, controller.getItemById);
router.put('/:id', protect, controller.updateItem);
router.delete('/:id', protect, controller.deletedItem);

export default router;
