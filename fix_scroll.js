const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf-8');

// Replace 1
content = content.replace(
`    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    });`,
`    let progressTicking = false;
    window.addEventListener('scroll', () => {
        if (!progressTicking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                progressBar.style.width = scrolled + '%';
                progressTicking = false;
            });
            progressTicking = true;
        }
    });`);

// Replace 2
content = content.replace(
`    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });`,
`    let navTicking = false;
    window.addEventListener('scroll', () => {
        if (!navTicking) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                navTicking = false;
            });
            navTicking = true;
        }
    });`);

// Replace 3
content = content.replace(
`        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });`,
`        let backToTopTicking = false;
        window.addEventListener('scroll', () => {
            if (!backToTopTicking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 400) {
                        backToTopBtn.classList.add('visible');
                    } else {
                        backToTopBtn.classList.remove('visible');
                    }
                    backToTopTicking = false;
                });
                backToTopTicking = true;
            }
        });`);

fs.writeFileSync('script.js', content);
