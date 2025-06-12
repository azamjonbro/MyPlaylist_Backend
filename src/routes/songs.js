const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const filePath = path.join(__dirname, '../data/songs.json');

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Read songs from JSON file
function readSongs() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return data ? JSON.parse(data) : [];
}

// Write songs to JSON file
function writeSongs(songs) {
  fs.writeFileSync(filePath, JSON.stringify(songs, null, 2));
}

// Get all songs
router.get('/', (req, res) => {
  const songs = readSongs();
  res.json(songs);
});

// Get one song by ID
router.get('/:id', (req, res) => {
  const songs = readSongs();
  const song = songs.find(s => s.id === req.params.id);
  if (!song) return res.status(404).json({ message: 'Song not found' });
  res.json(song);
});

// Create a new song
router.post('/', upload.single('audio'), (req, res) => {
  const songs = readSongs();
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'Audio file is required' });
  }

  const host = req.protocol + '://' + req.get('host'); // http://localhost:5000

  const newSong = {
    id: Date.now().toString(),
    title: req.body.title,
    artist: req.body.artist || '',
    duration: Number(req.body.duration) || null,
    cover: req.body.cover || '',
    audioUrl: `${host}/uploads/${file.filename}` // ✅ To‘liq URL
  };

  songs.push(newSong);
  writeSongs(songs);

  res.status(201).json(newSong);
});
// Update existing song
router.put('/:id', (req, res) => {
  const songs = readSongs();
  const index = songs.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Song not found' });

  songs[index] = { ...songs[index], ...req.body };
  writeSongs(songs);

  res.json(songs[index]);
});

// Delete a song
router.delete('/:id', (req, res) => {
  let songs = readSongs();
  const filtered = songs.filter(s => s.id !== req.params.id);
  if (filtered.length === songs.length) return res.status(404).json({ message: 'Song not found' });

  writeSongs(filtered);
  res.json({ message: 'Song deleted' });
});

module.exports = router;
