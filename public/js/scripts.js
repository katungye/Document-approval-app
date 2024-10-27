$(document).ready(function() {
    $('#documentsTable').DataTable({
        "paging": true,       // Enable pagination
        "searching": true,    // Enable searching
        "ordering": true,     // Enable column ordering
        "info": true,         // Show table information
        "lengthChange": true, // Allow changing the number of rows
        "pageLength": 5       // Number of rows per page by default
    });
});

$(document).ready(function() {
    $('#documentTableth').DataTable();
    $('#userTable').DataTable();
});


$(document).ready(function() {
    $('#documentTablerev').DataTable({
        "paging": true, // Enable pagination
        "searching": true, // Enable search
        "ordering": true, // Enable column ordering
        "info": true // Show info about the table
    }); 
});

// Document submission
const categories = {
    planning: ["Vision, Mission and Goals", "Risk Assessment", "Risk Treatment", "Stakeholders (Both Internal and External)", "Organization Context (Internal and External)", "Interested Parties", "Asset Inventory", "Organization Structure"],
    implementation: ["Present Controls (Both Physical and Policy)", "Past Incidents Reports"],
    review: ["Areas of Improvement", "Evaluation", "Review"],
    monitoring: ["Trends", "Log Reports", "Backups", "Infrastructure"],
    legal: ["Internal Policies", "Regulatory Requirements", "Compliancy Reports"]
};

document.getElementById('category').addEventListener('change', function () {
    const selectedCategory = this.value;
    const subcategorySelect = document.getElementById('subcategory');
    subcategorySelect.innerHTML = ''; // Clear existing options

    if (categories[selectedCategory]) {
        categories[selectedCategory].forEach(subcat => {
            const option = document.createElement('option');
            option.value = subcat;
            option.textContent = subcat;
            subcategorySelect.appendChild(option);
        });
        subcategorySelect.disabled = false; // Enable the subcategory dropdown
    } else {
        subcategorySelect.disabled = true; // Disable if no category is selected
    }
});

document.getElementById('documentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(this);

    // Show the uploading popup
    const popup = document.getElementById('uploadingPopup');
    popup.style.display = 'block';

    // Send the form data using fetch
    fetch('/document/submit-document', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Hide the uploading popup
        popup.style.display = 'none';

        // display the message in an alert
        const modalBody = document.querySelector('.modal-body');
        modalBody.textContent = data.message;

        // Add a delay before hiding the popup
        setTimeout(() => {
            popup.style.display = 'none';
        }, 15000); // Increase delay to 15 seconds

        // Refresh the page to clear the form
        location.reload();
    })
    .catch(error => {
        // Hide the uploading popup
        popup.style.display = 'none';

        // Show error message
        console.error('Error:', error);
        alert('There was an error uploading the document.');
    });
});


// Context tracker creation
$(document).ready(function() {
    $('#contextEstablishmentForm').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(), // Serialize form data
            success: function(response) {
                // Display success message
                $('#successMessage').text(response.message).show();

                // Optionally, reload the dashboard or update it dynamically
                // For example, if you have a section to display trackers:
                // $('#trackerList').append('<li>' + response.tracker.refCode + '</li>');

                // Clear the form after submission
                $('#contextEstablishmentForm')[0].reset();
            },
            error: function(xhr) {
                // Handle errors (e.g., display error messages)
                $('#successMessage').text('Error: ' + xhr.responseJSON.error).show();
            }
        });
    });
});


// Context tracker retrieval
async function fetchTrackers() {
    try {
        const response = await fetch('/trackers', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${your_token_here}` // Include your JWT token if needed
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        // Populate your table here using data
    } catch (error) {
        console.error('Error fetching trackers:', error);
    }
}

// Call fetchTrackers on page load or on some event
document.addEventListener('DOMContentLoaded', fetchTrackers);


// Context tracker retrieval
$(document).ready(function() {
    $('#trackerTable').DataTable();
    $('#trackerTableth').DataTable();
});


document.addEventListener('DOMContentLoaded', function() {
    const pdfButtons = document.querySelectorAll('.pdfButton');
    const pdfViewer = document.getElementById('pdfViewer');

    pdfButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pdfUrl = this.getAttribute('data-pdf-url');
            pdfViewer.src = pdfUrl;
        });
    });
});