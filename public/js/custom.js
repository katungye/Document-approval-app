document.addEventListener('DOMContentLoaded', function () {
    // Login and Register Buttons
    const loginButton = document.getElementById('login-btn');
    const registerButton = document.getElementById('register-btn');
  
    if (loginButton) {
      loginButton.addEventListener('click', function () {
        window.location.href = '/auth/login';
      });
    }
  
    if (registerButton) {
      registerButton.addEventListener('click', function () {
        window.location.href = '/auth/register';
      });
    }
  
    // Toggle Sidebar
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function (event) {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
  
        // Persist sidebar state across page reloads
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
  
      // Uncomment to persist sidebar toggle state between refreshes
      // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      //     document.body.classList.toggle('sb-sidenav-toggled');
      // }
    }
  
    // Register Form Handling
    document.addEventListener('DOMContentLoaded', function () {
        const registerForm = document.getElementById('registerForm');
      
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission
      
            const formData = new FormData(registerForm); // Collect form data
      
            // Convert FormData to a regular object
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
      
            console.log("Form Data:", data); // Log the captured form data to check
      
            // Send the data using the fetch API
            fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Inform the server the data is in JSON format
                },
                body: JSON.stringify(data), // Convert the data object to JSON string
            })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    // Handle errors (if any)
                    console.log('Errors:', result.error);
                    alert('Registration failed');
                } else {
                    // Handle success
                    console.log('User registered:', result);
                    alert('Registration successful');
                    window.location.href = '/auth/login'; // Redirect to login page after successful registration
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred');
            });
        });
    });
    
    
});

document.addEventListener('DOMContentLoaded', function () {
  var updateContextModal = document.getElementById('updateContextModal');
  if (updateContextModal) {
    updateContextModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget;
      var id = button.getAttribute('data-id');
      var category = button.getAttribute('data-category');
      var factor = button.getAttribute('data-factor');
      var services = button.getAttribute('data-services');
      var assets = button.getAttribute('data-assets');
      var documentation = button.getAttribute('data-documentation');
      var stakeholders = button.getAttribute('data-stakeholders');
      var legal = button.getAttribute('data-legal');
      var location = button.getAttribute('data-location');

      var modal = this;
      modal.querySelector('#contextId').value = id;
      modal.querySelector('#category').value = category;
      modal.querySelector('#factor').value = factor;
      modal.querySelector('#services').value = services;
      modal.querySelector('#assets').value = assets;
      modal.querySelector('#documentation').value = documentation;
      modal.querySelector('#stakeholders').value = stakeholders;
      modal.querySelector('#legal').value = legal;
      modal.querySelector('#location').value = location;
    });
  }
});

// public/js/custom.js

document.addEventListener('DOMContentLoaded', function () {
  const categorySelect = document.getElementById('category');
  const factorSelect = document.getElementById('factor');

  const factors = {
      internal: ['Core Business Processes', 'Internal stakeholders', 'Legal Requirements',  'Assets', 'Company Structure', 'Communication Channels'],
      external: ['Customers', 'Environment', 'Legal Regulation', 'External Stakeholders', 'Audit', 'Trends', 'Geographical Location', 'Service Provider' ],
  };

  categorySelect.addEventListener('change', function () {
      const selectedCategory = categorySelect.value;
      const options = factors[selectedCategory] || [];

      // Clear existing options
      factorSelect.innerHTML = '';

      // Populate new options
      options.forEach(function (factor) {
          const option = document.createElement('option');
          option.value = factor;
          option.textContent = factor;
          factorSelect.appendChild(option);
      });
  });

  // Trigger change event on page load to populate initial options
  categorySelect.dispatchEvent(new Event('change'));
});

// public/js/custom.js

$(document).ready(function() {
  $('#userTable').DataTable({
      "pageLength": 5 // Show only 5 users per page
  });
});

function openUpdateUserRoleModal(userId, userRole) {
  document.getElementById('userId').value = userId;
  document.getElementById('userRole').value = userRole;
  var updateUserRoleModal = new bootstrap.Modal(document.getElementById('updateUserRoleModal'));
  updateUserRoleModal.show();
}

document.getElementById('updateUserRoleForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const userId = document.getElementById('userId').value;
  const roleId = document.getElementById('userRole').value;

  fetch('/user/updateRole', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, roleId })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('User role updated successfully');
          location.reload(); // Reload the page to reflect changes
      } else {
          alert('Failed to update user role');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});

//review
function openReviewContextModal(id, category, factor, services, assets, documentation, stakeholders, legal, location) {
  document.getElementById('contextId').value = id;
  document.getElementById('category').value = category;
  document.getElementById('factor').value = factor;
  document.getElementById('services').value = services;
  document.getElementById('assets').value = assets;
  document.getElementById('documentation').value = documentation;
  document.getElementById('stakeholders').value = stakeholders;
  document.getElementById('legal').value = legal;
  document.getElementById('location').value = location;
  var reviewContextModal = new bootstrap.Modal(document.getElementById('reviewContextModal'));
  reviewContextModal.show();
}

document.getElementById('reviewContextForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const contextId = document.getElementById('contextId').value;
  const category = document.getElementById('category').value;
  const factor = document.getElementById('factor').value;
  const services = document.getElementById('services').value;
  const assets = document.getElementById('assets').value;
  const documentation = document.getElementById('documentation').value;
  const stakeholders = document.getElementById('stakeholders').value;
  const legal = document.getElementById('legal').value;
  const location = document.getElementById('location').value;

  fetch('/reviewer/markAsReviewed', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contextId, category, factor, services, assets, documentation, stakeholders, legal, location })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Context marked as reviewed successfully');
          location.reload(); // Reload the page to reflect changes
      } else {
          alert('Failed to mark context as reviewed');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});