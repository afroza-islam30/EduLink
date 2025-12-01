const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, feedbackController.create);
router.get('/', feedbackController.list);

module.exports = router;
