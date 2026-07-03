import Movie from '../models/Movie.js';
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createMovie = async (req, res) => {
  try {
    const { title, overview, poster_path, backdrop_path, release_date, runtime, genres } = req.body;
    const movie = new Movie({
      title,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      runtime,
      genres,
      user: req.user._id,
    });
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateMovie = async (req, res) => {
  try {
    const { title, overview, poster_path, backdrop_path, release_date, runtime, genres } = req.body;
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      movie.title = title || movie.title;
      movie.overview = overview || movie.overview;
      movie.poster_path = poster_path || movie.poster_path;
      movie.backdrop_path = backdrop_path || movie.backdrop_path;
      movie.release_date = release_date || movie.release_date;
      movie.runtime = runtime || movie.runtime;
      movie.genres = genres || movie.genres;
      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await Movie.deleteOne({ _id: movie._id });
      res.json({ message: 'Movie removed' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createMovieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Movie already reviewed' });
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.vote_average =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;
      await movie.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
