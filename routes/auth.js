import express from 'express';
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserLists,
  getAllUsers,
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserLists);
router.route('/').get(protect, admin, getAllUsers);
export default router;
