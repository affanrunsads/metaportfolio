// ==========================================================================
// Affan Runs Ads — Shared Script
// ==========================================================================

// Preloader
window.addEventListener('load', () => {
    const pre = document.querySelector('.preloader');
    if (pre) setTimeout(() => pre.classList.add('hidden'), 500);
});

// Navigation scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('mobile-active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('mobile-active');
}

document.addEventListener('click', (e) => {
    const nav = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    if (nav && navLinks && !nav.contains(e.target)) {
        navLinks.classList.remove('mobile-active');
    }
});

// Intersection Observer for scroll animations
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const staggerGroups = [
    { parent: '.skills-grid', child: '.skill-item', delay: 100 },
    { parent: '.metrics', child: '.metric-card', delay: 150 },
    { parent: '.timeline', child: '.timeline-item', delay: 200 },
    { parent: '.contact-links', child: '.contact-item', delay: 150 },
    { parent: '.reels-grid', child: '.reel-card', delay: 80 },
    { parent: '.reels-preview-grid', child: '.reel-card', delay: 80 },
    { parent: '.benefits-grid', child: '.benefit-card', delay: 100 },
    { parent: '.testimonials-grid', child: '.testimonial-card', delay: 150 },
];

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            staggerGroups.forEach(group => {
                if (entry.target.matches(group.parent)) {
                    const items = entry.target.querySelectorAll(group.child);
                    items.forEach((item, index) => {
                        setTimeout(() => item.classList.add('visible'), index * group.delay);
                    });
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll(
    '.section-header, .about-text, .skills-grid, .metrics, .timeline, .contact-links, .reels-grid, .reels-preview-grid, .benefits-grid, .testimonials-grid, .contact-form'
).forEach(el => observer.observe(el));

// Floating particles
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==========================================================================
// Reel modal / lightbox — used on portfolio.html
// ==========================================================================
// REELS data — YouTube-hosted (fast: grid shows YouTube's own thumbnail
// image, the actual player only loads when someone clicks to watch).
//
// TO ADD A REEL:
// 1. Upload the video to YouTube (Shorts works great for 9:16 vertical).
// 2. Copy the video ID from the URL, e.g. youtube.com/shorts/dQw4w9WgXcQ
//    -> the ID is "dQw4w9WgXcQ"
// 3. Add an entry below with that youtubeId.
//
// (Legacy support: if you'd rather self-host, set "src" to a /videos/*.mp4
// path instead of youtubeId and leave youtubeId blank.)
const REELS = [
    {
        id: 'reel-1',
        title: 'Case Study: $0.02 CPR Campaign',
        category: 'case-study',
        youtubeId: 'qYadKfnz2CA',
        src: '',
        badge: 'Case Study'
    },
    {
        id: 'reel-2',
        title: 'Client Review — E-commerce Brand',
        category: 'review',
        youtubeId: 'B2vHEkw9rG0',
        src: '',
        badge: 'Review'
    },
    {
        id: 'reel-3',
        title: 'Behind the Scenes: Ad Creative Testing',
        category: 'content',
        youtubeId: 'JbqUXA6x6TY',
        src: '',
        badge: 'Content'
    },
    {
        id: 'reel-4',
        title: 'Case Study: 11% CTR Breakdown',
        category: 'case-study',
        youtubeId: 'UCM9a6_SfKE',
        src: '',
        badge: 'Case Study'
    },
    {
        id: 'reel-5',
        title: 'Client Review — SaaS Launch',
        category: 'review',
        youtubeId: 'pNZZTZHFrf0',
        src: '',
        badge: 'Review'
    },
    {
        id: 'reel-6',
        title: 'Mentorship Student Result',
        category: 'mentorship',
        youtubeId: 'HjbjXVJOb-M',
        src: '',
        badge: 'Mentorship'
    }
];

function reelThumbUrl(reel) {
    if (reel.youtubeId) return `https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`;
    return '';
}

function renderReelsGrid(containerId, limit) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    const items = limit ? REELS.slice(0, limit) : REELS;
    grid.innerHTML = items.map(reel => {
        const thumb = reelThumbUrl(reel);
        const media = thumb
            ? `<img class="reel-thumb" src="${thumb}" alt="${reel.title}" loading="lazy">`
            : (reel.src ? `<video muted loop playsinline preload="metadata" src="${reel.src}#t=0.5"></video>` : '');
        return `
        <div class="reel-card" data-category="${reel.category}" data-id="${reel.id}" tabindex="0" role="button" aria-label="Play ${reel.title}">
            ${media}
            <span class="reel-badge">${reel.badge}</span>
            <div class="reel-play-icon">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div class="reel-caption">
                <h4>${reel.title}</h4>
            </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.reel-card').forEach(card => {
        card.addEventListener('click', () => openReelModal(card.dataset.id));
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') openReelModal(card.dataset.id);
        });
    });
}

function openReelModal(reelId) {
    const reel = REELS.find(r => r.id === reelId);
    if (!reel) return;
    const modal = document.getElementById('reelModal');
    const inner = document.getElementById('reelModalInner');
    const meta = document.getElementById('reelModalMeta');
    if (!modal || !inner) return;

    if (reel.youtubeId) {
        inner.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&rel=0&playsinline=1" title="${reel.title}" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    } else if (reel.src) {
        inner.innerHTML = `<video src="${reel.src}" controls autoplay playsinline loop></video>`;
    } else {
        inner.innerHTML = `<p style="color:#999;padding:2rem;text-align:center;">Add a youtubeId for this reel in script.js</p>`;
    }

    if (meta) meta.innerHTML = `<span>${reel.badge}</span> — ${reel.title}`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeReelModal() {
    const modal = document.getElementById('reelModal');
    const inner = document.getElementById('reelModalInner');
    if (!modal) return;
    modal.classList.remove('open');
    if (inner) inner.innerHTML = '';
    document.body.style.overflow = '';
}

function filterReels(category) {
    document.querySelectorAll('.reel-card').forEach(card => {
        const match = category === 'all' || card.dataset.category === category;
        card.style.display = match ? '' : 'none';
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Home page mini preview (first 3 reels)
    if (document.getElementById('reelsPreviewGrid')) {
        renderReelsGrid('reelsPreviewGrid', 3);
    }
    // Full portfolio grid
    if (document.getElementById('reelsFullGrid')) {
        renderReelsGrid('reelsFullGrid');
    }

    const modal = document.getElementById('reelModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeReelModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeReelModal();
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterReels(btn.dataset.filter));
    });
});
