const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, offerController.create);
router.get('/', authenticate, offerController.list);
router.put('/:id', authenticate, offerController.updateStatus);

module.exports = router;
