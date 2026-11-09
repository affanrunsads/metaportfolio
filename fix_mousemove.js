const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf-8');

// Replace 1
content = content.replace(
`        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
        });`,
`        let mouseMoveTicking = false;
        card.addEventListener('mousemove', (e) => {
            if (!mouseMoveTicking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * -5;
                    const rotateY = ((x - centerX) / centerX) * 5;
                    card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
                    mouseMoveTicking = false;
                });
                mouseMoveTicking = true;
            }
        });`);

// Replace 2
content = content.replace(
`        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', \`\${x}px\`);
            card.style.setProperty('--mouse-y', \`\${y}px\`);
        });`,
`        let mouseTracerTicking = false;
        card.addEventListener('mousemove', (e) => {
            if (!mouseTracerTicking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', \`\${x}px\`);
                    card.style.setProperty('--mouse-y', \`\${y}px\`);
                    mouseTracerTicking = false;
                });
                mouseTracerTicking = true;
            }
        });`);

fs.writeFileSync('script.js', content);
