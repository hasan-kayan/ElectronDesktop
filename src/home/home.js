// JavaScript for the home page

// Function to handle button clicks
function handleButtonClick(event) {
    const buttonId = event.target.id;
    switch (buttonId) {
        case 'analyzerBtn':
            // Code to navigate to the analyzer page
            break;
        case 'sketcherBtn':
            // Code to navigate to the sketcher page
            window.location.href = '../sketcher/sketcher.html';
            break;
        case 'otherBtn':
            // Code for other functionality or navigating to the home page
            window.location.href = 'index.html';
            break;
        default:
            break;
    }
}

// Add event listeners to buttons
document.getElementById('analyzerBtn').addEventListener('click', handleButtonClick);
document.getElementById('sketcherBtn').addEventListener('click', handleButtonClick);
document.getElementById('otherBtn').addEventListener('click', handleButtonClick);
