const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/db');
const authController = require('./src/controllers/authController');
const dashboardController = require('./src/controllers/dashboardController');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// 🔒 Disable caching so back button can’t show old protected pages
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Serve static views
app.use(express.static(path.join(__dirname, 'views')));

// AUTH
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/forgot-password', authController.forgotPassword);


// DASHBOARDS
app.get('/api/dashboard/tutor', dashboardController.tutorDashboard);
app.get('/api/dashboard/guardian', dashboardController.guardianDashboard);

// HOME
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
