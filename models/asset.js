const db = require('../config/config'); // Import the database configuration

const Asset = {
  // Method to get all assets
  getAll: (callback) => {
    db.all('SELECT * FROM assets', [], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, rows); // Return the fetched assets
    });
  },

  // Method to add a new asset
  add: (assetData, callback) => {
    const {
      asset_type,
      name,
      version,
      vendor,
      category,
      install_location,
      installation_date,
      last_update_date,
      owner,
      support_contact,
      documentation,
      status_id,
      approved_by,
      approval_time,
      confirmation_time,
      confirmed_by,
      system_up_time,
      total_project_duration,
    } = assetData;

    db.run(
      `INSERT INTO assets (
          asset_type, name, version, vendor, category, install_location,
          installation_date, last_update_date, owner, support_contact,
          documentation, status_id, approved_by, approval_time,
          confirmation_time, confirmed_by, system_up_time, total_project_duration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        asset_type,
        name,
        version || null,
        vendor || null,
        category || null,
        install_location || null,
        installation_date || null,
        last_update_date || null,
        owner || null,
        support_contact || null,
        documentation || null,
        status_id,
        approved_by,
        approval_time,
        confirmation_time || null,
        confirmed_by || null,
        system_up_time || null,
        total_project_duration || null,
      ],
      function (err) {
        if (err) {
          console.error('Error adding asset:', err.message, err);
          return callback(err); // Handle error
        }
        callback(null, { id: this.lastID, name }); // Respond with the new asset ID and name
      }
    );
  },

};

module.exports = Asset;