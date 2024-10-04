const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// Route to get all assets
router.get('/allassets', assetController.getAllAssets);

// Route to add a new asset
router.post('/addassets', assetController.addAsset);

module.exports = router;
