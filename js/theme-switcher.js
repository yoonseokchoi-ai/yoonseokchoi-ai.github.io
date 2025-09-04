
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;
const icon = themeSwitcher.querySelector('i');

const sunIcon = 'far fa-sun';
const moonIcon = 'far fa-moon';

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark') {
        icon.className = moonIcon;
    }
}

themeSwitcher.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('dark');
    
    if (body.classList.contains('dark')) {
        icon.className = moonIcon;
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = sunIcon;
        localStorage.removeItem('theme');
    }
});
