const express = require('express');
const path = require('path');
const songsRouter = require('./routes/songs'); // manashu joyga o‘zing nom bergan bo‘lishing mumkin

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded audio files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/songs', songsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
