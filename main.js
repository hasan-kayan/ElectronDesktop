// renderer.js
const { Router } = require('electron-router');

const router = Router('Renderer');

// Function to navigate to a specific page
function navigateToPage(pageName) {
    router.send('navigate', pageName);
}

document.getElementById('button1').addEventListener('click', function() {
    navigateToPage('page1.html');
});

document.getElementById('button2').addEventListener('click', function() {
    navigateToPage('page2.html');
});

document.getElementById('button3').addEventListener('click', function() {
    navigateToPage('page3.html');
});
