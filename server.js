const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/db');

const authController = require('./src/controllers/authController');
const tuitionController = require('./src/controllers/tuitionController');
const dashboardController = require('./src/controllers/dashboardController');

const app = express();
connectDB();

// Middlewares from Express itself (not separate layer)
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// -------- AUTH ROUTES (directly in server.js) ----------
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

// -------- TUITIONS (job board, posting) ---------------
app.get('/api/tuitions', tuitionController.getTuitions);
app.post('/api/tuitions', tuitionController.postTuition);

// -------- DASHBOARDS ---------------------------------
app.get('/api/dashboard/tutor', dashboardController.tutorDashboard);
app.get('/api/dashboard/guardian', dashboardController.guardianDashboard);

// ------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
