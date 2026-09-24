const express = require('express');
const router = express.Router();
const templeteController = require('../controllers/templete');

router.get('/', templeteController.getEjs);

module.exports = router;