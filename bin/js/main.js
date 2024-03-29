function getAge() {
    const birthDate = new Date('2004-08-31T04:26:00');
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    const timeDiff = currentDate.getTime() - birthDate.getTime();
    const years = timeDiff / (1000 * 60 * 60 * 24 * 365.25);

    return { age: Math.floor(years), birthdate: birthDate };
}

window.onload = () => {
    console.log(`I am ${getAge().age} and was born at approximately ${getAge().birthdate}`);
    document.querySelectorAll('.e-age').forEach(element => {
        element.innerText = getAge().age;
    });
    if(localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'dark')
    }
    applyTheme(localStorage.getItem('theme'));
    document.querySelectorAll('#theme-toggle').forEach(tgl => {
        tgl.addEventListener('click', () => {
            toggleTheme();
        })
    });
    document.getElementById('menu-toggle').addEventListener('click', () => {
        toggleMenu();
    })
}

function toggleMenu() {
    const menu = document.querySelector('.expand-menu');
    const overlay = document.querySelector('.overlay');

    if(menu.style.display === 'block') {
        let temp = 1;
        function decreaseOpacity() {
            setTimeout(() => {
                temp -= 0.1;
                menu.style.opacity = temp;
                if (temp > 0) {
                    decreaseOpacity();
                }
                if(temp <= 0) {
                    menu.style.display = 'none';
                    overlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }, 10);
        }
        decreaseOpacity();
    }
    else {
        menu.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        menu.style.opacity = 0;
        let temp = 0;
        function increaseOpacity() {
            setTimeout(() => {
                temp += 0.1;
                menu.style.opacity = temp;
                if (temp < 1) {
                    increaseOpacity();
                }
            }, 10);
        }
        increaseOpacity();
    }
}

function toggleTheme() {
    const lightModePreview = document.querySelectorAll('#light-mode-toggle-preview');
    const darkModePreview = document.querySelectorAll('#dark-mode-toggle-preview');
    if(localStorage.getItem('theme') !== null) {
        if(localStorage.getItem('theme') === 'dark') {
            localStorage.setItem('theme', 'light');
            lightModePreview.forEach(pt => {
                pt.style.display = 'none';
            })
            darkModePreview.forEach(pt => {
                pt.style.display = 'block';
            })

            applyTheme(localStorage.getItem('theme'));
        }
        else if (localStorage.getItem('theme') === 'light') {
            localStorage.setItem('theme', 'dark');
            lightModePreview.forEach(pt => {
                pt.style.display = 'block';
            })
            darkModePreview.forEach(pt => {
                pt.style.display = 'none';
            })
   
            
            applyTheme(localStorage.getItem('theme'));
        }
        
    }
    console.log(localStorage.getItem('theme'));
}

function applyTheme(theme) {
    if(theme === 'dark') {
        document.querySelector('html').dataset.theme = 'dark';
    }
    else if(theme === 'light') {
        document.querySelector('html').dataset.theme = 'light';
    }
    document.getElementById('mobile-theme-color').setAttribute('content', getComputedStyle(document.body).backgroundColor);
}

