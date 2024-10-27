function openPDFPopup(pdfUrl) {
    // Create a new iframe element
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.zIndex = '9999'; // Ensure it's on top
    iframe.src = pdfUrl;
  
    // Add the iframe to the document body
    document.body.appendChild(iframe);
  
    // Function to close the popup
    function closePopup() {
      document.body.removeChild(iframe);
    }
  
    // Add an event listener to close the popup when the iframe is clicked
    iframe.addEventListener('click', (event) => {
      if (event.target === iframe) {
        closePopup();
      }
    });
  
    // Add a button to close the popup manually
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close PDF';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.zIndex = '9999';
    closeButton.addEventListener('click', closePopup);
    document.body.appendChild(closeButton);
  }
  
  // Example usage:
  const pdfButton = document.getElementById('pdfButton');
  pdfButton.addEventListener('click', () => {
    const pdfUrl = pdfButton.getAttribute('data-pdf-url');
    openPDFPopup(pdfUrl);
  });