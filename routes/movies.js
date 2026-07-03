import express from 'express';
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  createMovieReview,
} from '../controllers/movieController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/')
  .get(getMovies)
  .post(protect, admin, createMovie);
router.route('/:id/reviews')
  .post(protect, createMovieReview);
router.route('/:id')
  .get(getMovieById)
  .put(protect, admin, updateMovie)
  .delete(protect, admin, deleteMovie);
export default router;
