document.getElementById("assets-link").addEventListener("click", function() {
  // Update content div with the table structure
  document.getElementById("content").innerHTML = `
    <h2>Assets</h2>
    <p>Manage your assets here.</p>
    <a href="/assets/new">Create a new asset</a>
    <table id="assetsTable" class="display">
      <thead>
        <tr>
          <th>ID</th>
          <th>Asset Type</th>
          <th>Name</th>
          <th>Version</th>
          <th>Vendor</th>
          <th>Category</th>
          <th>Install Location</th>
          <th>Installation Date</th>
          <th>Last Update Date</th>
          <th>Owner</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>`;

  // Initialize DataTable after the table is added to the DOM
  $('#assetsTable').DataTable({
    ajax: {
      url: '/assets/allassets', // Fetch the data from the backend
      dataSrc: '' // Since your JSON array is the root element, we don't need a specific key
    },
    columns: [
      { data: 'id' },
      { data: 'asset_type' },
      { data: 'name' },
      { data: 'version' },
      { data: 'vendor' },
      { data: 'category' },
      { data: 'install_location' },
      { data: 'installation_date' },
      { data: 'last_update_date' },
      { data: 'owner' },
      { data: null, render: function (data, type, row) {
          return `<a href="/assets/${row.id}">View</a>`;
        }
      }
    ]
  });
});

document.getElementById("profile-link").addEventListener("click", function() {
  document.getElementById("content").innerHTML = "<h2>Profile</h2><p>View or edit your profile information.</p>";
});

document.getElementById("logout-link").addEventListener("click", function() {
  document.getElementById("content").innerHTML = "<h2>Logout</h2><p>You have successfully logged out.</p>";
});

document.getElementById("home-link").addEventListener("click", function() {
  document.getElementById("content").innerHTML = `<a href="/dashboard">View</a>`;
});