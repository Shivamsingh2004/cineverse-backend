import mongoose from 'mongoose';
const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: false,
  },
  backdrop_path: {
    type: String,
    required: false,
  },
  release_date: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: false,
    default: 0,
  },
  runtime: {
    type: Number,
    required: false,
  },
  genres: {
    type: [String],
    required: false,
  },
  reviews: [reviewSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, { timestamps: true });
const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
