$(document).ready(function() {
  // Function to show a section and hide others
  function showSection(sectionId) {
    $('.section').removeClass('active');  // Hide all sections
    $(sectionId).addClass('active');      // Show the selected section
  }

  // Link click event handlers
  $('#home-link').on('click', function() {
    showSection('#home-section');
  });

  $('#user-link').on('click', function() {
    showSection('#user-section');
  });

  $('#context-link').on('click', function() {
    showSection('#context-section');
  });

  $('#profile-link').on('click', function() {
    showSection('#profile-section');
  });

  $('#logout-link').on('click', function() {
    showSection('#logout-section');
  });
});

$(document).ready(function() {
  // Example data (replace with real data from your API or database)
  const statusSummary = {
    pendingAdminReview: 5,
    rejectedByAdmin: 2,
    pendingApproval: 3,
    rejectedByApprover: 1,
    approved: 4
  };

  // Populate the statuses summary cards in the Home section
  $('#pending-admin-review-count').text(statusSummary.pendingAdminReview);
  $('#rejected-by-admin-count').text(statusSummary.rejectedByAdmin);
  $('#pending-approval-count').text(statusSummary.pendingApproval);
  $('#rejected-by-approver-count').text(statusSummary.rejectedByApprover);
  $('#approved-count').text(statusSummary.approved);
});


function toggleDiv(divId) {
  // Hide all toggle divs
  const toggleDivs = document.querySelectorAll('.toggle-div');
  toggleDivs.forEach(div => {
    div.style.display = 'none';
  });

  // Show the selected div
  const selectedDiv = document.getElementById(divId);
  selectedDiv.style.display = 'block';

  // Update the active class for buttons
  const buttons = document.querySelectorAll('.toggle-button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  const activeButton = Array.from(buttons).find(button => button.innerText === divId.charAt(0).toUpperCase() + divId.slice(1).replace(/([A-Z])/g, ' $1'));
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Set the default active section
document.addEventListener("DOMContentLoaded", function() {
  toggleDiv('roles'); // Show the Assign Role div by default
});


$(document).ready(function () {
  $('#documentTable').DataTable();
});

//document trucker form
document.getElementById('trackerForm').addEventListener('submit', function(event) {
  const startDate = new Date(document.getElementById('startDate').value);
  const endDate = new Date(document.getElementById('endDate').value);

  // Check if the end date is before the start date
  if (endDate < startDate) {
      alert("End date must be after start date.");
      event.preventDefault(); // Prevent form submission
  }
});

// Sample data for tracker updates (in chronological order)
const updates = [
  { date: '2024-10-01', update: 'Document created and submitted for review.' },
  { date: '2024-10-03', update: 'Feedback received from the review committee.' },
  { date: '2024-10-05', update: 'Final review and testing completed.' },
  { date: '2024-10-07', update: 'Document approved and finalized.' }
];

// Function to render tracker items
function renderTracker() {
  const trackerContainer = document.querySelector('.tracker-container');
  trackerContainer.innerHTML = '<h2>Document Update Tracker</h2>'; // Clear previous content

  updates.forEach((item, index) => {
      const trackerItem = document.createElement('div');
      trackerItem.className = 'tracker-item';

      // Check if this is the current update (you can set your own logic here)
      const isCurrent = (new Date(item.date) >= new Date());
      if (isCurrent) {
          trackerItem.classList.add('current'); // Add current class
      }

      trackerItem.innerHTML = `
          <div class="date">${item.date}</div>
          <div class="update">${item.update}</div>
      `;

      trackerContainer.appendChild(trackerItem);
  });
}

// Call the render function
renderTracker();

//document trucker overview table 
$(document).ready(function() {
  $('#documentTracker').DataTable({
      paging: true,
      searching: true,
      ordering: true
  });
});


//user access table 

$(document).ready(function() {
  $('#userAccessTable').DataTable({
      paging: true, // Enable pagination
      searching: true, // Enable searching
      ordering: true // Enable ordering
  });

  // Add event listeners for approve and revoke buttons
  $('#userAccessTable').on('click', '.approve-btn', function() {
      const row = $(this).closest('tr');
      row.find('td:eq(2)').text('Approved'); // Update Access status
  });

  $('#userAccessTable').on('click', '.revoke-btn', function() {
      const row = $(this).closest('tr');
      row.find('td:eq(2)').text('Pending'); // Update Access status
  });
});

