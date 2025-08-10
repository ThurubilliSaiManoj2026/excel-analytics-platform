import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe, getPendingUsers, approveUser, getAllUsers } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

// Admin routes
router.get('/pending-users', protect, authorize('admin', 'super_admin'), getPendingUsers);
router.put('/approve-user/:userId', protect, authorize('admin', 'super_admin'), approveUser);
router.get('/users', protect, authorize('admin', 'super_admin'), getAllUsers);

export default router;
