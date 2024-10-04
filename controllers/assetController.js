const Asset = require('../models/asset'); // Import the asset model

// Method to add a new asset
exports.addAsset = (req, res) => {
    const assetData = req.body;
  
    // Basic validation
    if (!assetData.asset_type || !assetData.name || !assetData.status_id || !assetData.approved_by || !assetData.approval_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    Asset.add(assetData, (err, result) => {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(409).json({ error: 'Asset with this name already exists' });
        } else {
          console.error('Error adding asset:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
      res.status(201).json({ message: 'Asset added successfully', assetId: result.id });
    });
  };
  

// Method to get all assets
exports.getAllAssets = (req, res) => { // Renamed this function
  Asset.getAll((err, assets) => {
    if (err) {
      console.error('Error retrieving assets:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(assets); // Return all assets
  });
};
