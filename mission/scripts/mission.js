const themeSelector = document.querySelector('select');
function changeTheme() {
//check to see what the current value of our select is. The current value is conveniently found in themeSelector.value!
    const currentTheme = themeSelector.value;
    const logo = document.querySelector('img');
// if the value is dark then:
    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
        logo.src = 'images/byui-logo_white.png';
    }
// otherwise
    else {
        document.body.classList.remove('dark');
        logo.src = 'images/byui-logo_blue.webp';
    }
}
// add eventlistener to the themeSelector element here. Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);