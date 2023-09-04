const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMoviePost, validateMovieDelete } = require('../utils/validation');

router.get('/movies', getMovies);
router.post('/movies', validateMoviePost, createMovie);
router.delete('/movies/:_id', validateMovieDelete, deleteMovie);

module.exports = router;
