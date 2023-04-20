import express from 'express';
import controller from '../controllers/user.controller.js';
import protect from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/me', protect, controller.getMe);

export default router;
