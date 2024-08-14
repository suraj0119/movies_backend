// controllers/movieController.js
const db = require('../config/database');

const getAllMovies = (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const createMovie = (req, res) => {
  const { title, genre, rating } = req.body;
  db.query('INSERT INTO movies (title, genre, rating) VALUES (?, ?, ?)', [title, genre, rating], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, title, genre, rating });
  });
};

const getMovieById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM movies WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(results[0]);
  });
};

const updateMovie = (req, res) => {
  const { id } = req.params;
  const { title, genre, rating } = req.body;
  db.query('UPDATE movies SET title = ?, genre = ?, rating = ? WHERE id = ?', [title, genre, rating, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json({ message: 'Movie updated successfully' });
  });
};

const deleteMovie = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM movies WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  });
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie
};
