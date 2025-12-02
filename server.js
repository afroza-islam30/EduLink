const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/db');

// Controllers
const authController = require('./src/controllers/authController');
const dashboardController = require('./src/controllers/dashboardController');
const postRequestController = require('./src/controllers/postRequestController');
const browseTutorController = require('./src/controllers/browseTutorController');
const applicationController = require('./src/controllers/applicationController');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Disable cache
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'views')));

// AUTH ROUTES
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/forgot-password', authController.forgotPassword);

// DASHBOARD
app.get('/api/dashboard/tutor', dashboardController.tutorDashboard);
app.get('/api/dashboard/guardian', dashboardController.guardianDashboard);

// GUARDIAN FEATURES
app.post('/api/post-request', postRequestController.createRequest);

app.get('/api/browse-tutors', browseTutorController.getTutors);

app.get('/api/applications', applicationController.getApplications);
app.post('/api/applications/approve', applicationController.approve);
app.post('/api/applications/reject', applicationController.reject);

// HOME ROUTE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
