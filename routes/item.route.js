import express from 'express';
import controller from '../controllers/item.controller.js';
import protect from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/',  controller.createItem);
router.get('/',  controller.getItems);
router.get('/:id', controller.getItemById);
router.put('/:id', controller.updateItem);
router.delete('/:id', controller.deletedItem);

export default router;
