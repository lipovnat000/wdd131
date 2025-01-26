function toggleVisibility() {
    // Select the element
    var element = document.getElementById('menu');

    // Check if the element has the hidden class
    if (element.classList.contains('hidden')) {
        // Remove the class
        element.classList.remove('hidden');
    } else {
        // Otherwise, add the class
        element.classList.add('hidden');
    }
}

function switchMenuLayout() {
    // Select the navigation menu
    var element = document.getElementById('menu');

    // Add the hidden class if screen width is less than 700px
    if (window.innerWidth < 700) {
        if (!element.classList.contains('hidden')) {
            element.classList.add('hidden');
        }
    } else {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        }
    }
}

function checkScreenSize() {
    // Check the initial screen size and adjust the menu layout
    var element = document.getElementById('menu');

    // Add the hidden class if screen width is less than 700px
    if (window.innerWidth < 700 && !element.classList.contains('hidden')) {
        element.classList.add('hidden');
    } else if (window.innerWidth >= 700 && element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }
}

// Variable to keep track of the last window width
let lastWidth = window.innerWidth;

function onResize() {
    var element = document.getElementById('menu');

    // Only hide/show the menu if the window crosses the 700px threshold
    if (window.innerWidth < 700 && lastWidth >= 700 && !element.classList.contains('hidden')) {
        element.classList.add('hidden');
    } else if (window.innerWidth >= 700 && lastWidth < 700 && element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }

    // Update the last width
    lastWidth = window.innerWidth;
}

// Check screen size on initial load
document.addEventListener('DOMContentLoaded', checkScreenSize);

// Check screen size when the window is resized
window.addEventListener('resize', onResize);
