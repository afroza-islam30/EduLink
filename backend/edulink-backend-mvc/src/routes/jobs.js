const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticate } = require('../middlewares/auth');

router.get('/', jobController.list);
router.get('/:id', jobController.detail);
router.post('/', authenticate, jobController.create);

module.exports = router;
