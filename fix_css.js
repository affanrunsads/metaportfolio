const fs = require('fs');

let content = fs.readFileSync('styles.css', 'utf-8');

// Replace backdrop-filter
content = content.replace(/backdrop-filter:.*?;/g, '');
content = content.replace(/-webkit-backdrop-filter:.*?;/g, '');
content = content.replace(/-webkit-filter:.*?;/g, '');

// Replace box-shadow
content = content.replace(/box-shadow:.*?;/g, '');
content = content.replace(/,\s*box-shadow\s*[0-9.]+s\s*[a-zA-Z-]+\s*/g, '');

// Replace animation
content = content.replace(/animation:.*?;/g, '');
content = content.replace(/,\s*animation\s*[0-9.]+s\s*[a-zA-Z-]+\s*/g, '');

// Replace transition
content = content.replace(/transition:.*?;/g, '');


fs.writeFileSync('styles.css', content);
