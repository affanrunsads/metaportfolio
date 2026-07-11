// ==========================================================================
// Affan Runs Ads — Shared Script
// ==========================================================================

// Preloader
window.addEventListener('load', () => {
    const pre = document.querySelector('.preloader');
    if (pre) setTimeout(() => pre.classList.add('hidden'), 500);
});

// Dynamic Scroll Progress Bar Integration
document.addEventListener('DOMContentLoaded', () => {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    
    progressContainer.appendChild(progressBar);
    document.body.prepend(progressContainer);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    });
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
    { parent: '.testimonials-carousel-container', child: '.testimonial-card', delay: 150 },
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
    '.section-header, .about-text, .skills-grid, .metrics, .timeline, .contact-links, .reels-grid, .reels-preview-grid, .benefits-grid, .testimonials-carousel-container, .contact-form'
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

    // ==========================================================================
    // Meta Ads Performance Calculator Logic
    // ==========================================================================
    const calcBudgetRange = document.getElementById('calc-budget-range');
    const calcBudgetNum = document.getElementById('calc-budget');
    const calcCpcRange = document.getElementById('calc-cpc-range');
    const calcCpcNum = document.getElementById('calc-cpc');
    const calcConvRange = document.getElementById('calc-conv-range');
    const calcConvNum = document.getElementById('calc-conv');
    const calcAovRange = document.getElementById('calc-aov-range');
    const calcAovNum = document.getElementById('calc-aov');

    if (calcBudgetRange && calcBudgetNum) {
        const resClicks = document.getElementById('res-clicks');
        const resPurchases = document.getElementById('res-purchases');
        const resRevenue = document.getElementById('res-revenue');
        const resRoas = document.getElementById('res-roas');
        const resProfit = document.getElementById('res-profit');
        const coachTip = document.getElementById('calc-coach-tip');

        function formatCurrency(val) {
            const isNegative = val < 0;
            const absVal = Math.abs(val);
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(absVal);
            return isNegative ? `-${formatted}` : formatted;
        }

        function formatNumber(val) {
            return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);
        }

        function calculatePerformance() {
            const budget = parseFloat(calcBudgetNum.value) || 0;
            const cpc = parseFloat(calcCpcNum.value) || 0.01; // Avoid divide by zero
            const conv = parseFloat(calcConvNum.value) || 0;
            const aov = parseFloat(calcAovNum.value) || 0;

            const clicks = budget / cpc;
            const purchases = clicks * (conv / 100);
            const revenue = purchases * aov;
            const roas = budget > 0 ? (revenue / budget) : 0;
            const profit = revenue - budget;

            if (resClicks) resClicks.textContent = formatNumber(clicks);
            if (resPurchases) resPurchases.textContent = formatNumber(purchases);
            if (resRevenue) resRevenue.textContent = formatCurrency(revenue);
            if (resRoas) resRoas.textContent = roas.toFixed(2) + 'x';
            
            if (resProfit) {
                resProfit.textContent = formatCurrency(profit);
                if (profit >= 0) {
                    resProfit.style.color = '#2ecc71';
                    resProfit.textContent = '+' + formatCurrency(profit);
                } else {
                    resProfit.style.color = '#e74c3c';
                }
            }

            if (coachTip) {
                if (roas < 1.0) {
                    coachTip.innerHTML = `<p>🔴 <strong>Critique:</strong> Your simulated campaign is not profitable (${roas.toFixed(2)}x ROAS). Decreasing your CPC or lifting your conversion rate is essential to reach profitability.</p>`;
                    coachTip.style.borderColor = 'rgba(231, 76, 60, 0.4)';
                } else if (roas < 2.5) {
                    coachTip.innerHTML = `<p>🟡 <strong>Healthy:</strong> You are moderately profitable (${roas.toFixed(2)}x ROAS). Let's test custom high-CTR hook creatives to reduce CPC and amplify this return!</p>`;
                    coachTip.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                } else {
                    coachTip.innerHTML = `<p>🏆 <strong>Scalable:</strong> Outstanding metrics (${roas.toFixed(2)}x ROAS)! This funnel is primed for high-budget scaling. Contact Affan to scale your monthly ads.</p>`;
                    coachTip.style.borderColor = 'rgba(46, 204, 113, 0.4)';
                }
            }
        }

        // Link range slider and number input
        function setupSyncedInputs(rangeEl, numEl) {
            rangeEl.addEventListener('input', () => {
                numEl.value = rangeEl.value;
                calculatePerformance();
            });
            numEl.addEventListener('input', () => {
                rangeEl.value = numEl.value;
                calculatePerformance();
            });
        }

        setupSyncedInputs(calcBudgetRange, calcBudgetNum);
        setupSyncedInputs(calcCpcRange, calcCpcNum);
        setupSyncedInputs(calcConvRange, calcConvNum);
        setupSyncedInputs(calcAovRange, calcAovNum);

        // Initial calculation
        calculatePerformance();
    }

    // ==========================================================================
    // Testimonial Carousel sliding logic
    // ==========================================================================
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselDotsContainer = document.getElementById('carouselDots');

    if (testimonialsTrack && carouselPrev && carouselNext && carouselDotsContainer) {
        const slides = testimonialsTrack.querySelectorAll('.testimonial-slide');
        let currentIndex = 0;
        let autoSlideTimer = null;

        // Create pagination dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetAutoSlide();
            });
            carouselDotsContainer.appendChild(dot);
        });

        const dots = carouselDotsContainer.querySelectorAll('.carousel-dot');

        function updateCarousel() {
            // Translate track
            testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        // Add event listeners to navigation buttons
        carouselNext.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        carouselPrev.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        // Auto slide every 6 seconds
        function startAutoSlide() {
            autoSlideTimer = setInterval(nextSlide, 6000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideTimer);
            startAutoSlide();
        }

        startAutoSlide();
    }

    // ==========================================================================
    // Contact Form Validation & Success Card Transitions
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const contactFormContainer = document.getElementById('contactFormContainer');

    if (contactForm && contactFormContainer) {
        const inputName = document.getElementById('contact-name');
        const inputEmail = document.getElementById('contact-email');
        const inputInterest = document.getElementById('contact-interest');
        const inputMessage = document.getElementById('contact-message');

        const groupName = document.getElementById('group-name');
        const groupEmail = document.getElementById('group-email');
        const groupMessage = document.getElementById('group-message');

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }

        // Live validation on input
        if (inputName) {
            inputName.addEventListener('input', () => {
                if (inputName.value.trim().length > 0) {
                    groupName.classList.remove('invalid');
                }
            });
        }
        if (inputEmail) {
            inputEmail.addEventListener('input', () => {
                if (validateEmail(inputEmail.value.trim())) {
                    groupEmail.classList.remove('invalid');
                }
            });
        }
        if (inputMessage) {
            inputMessage.addEventListener('input', () => {
                if (inputMessage.value.trim().length > 0) {
                    groupMessage.classList.remove('invalid');
                }
            });
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            let firstInvalidEl = null;

            // Name verification
            if (!inputName || inputName.value.trim() === '') {
                isValid = false;
                groupName.classList.add('invalid', 'invalid-shake');
                firstInvalidEl = inputName;
                setTimeout(() => groupName.classList.remove('invalid-shake'), 400);
            } else {
                groupName.classList.remove('invalid');
            }

            // Email verification
            if (!inputEmail || !validateEmail(inputEmail.value.trim())) {
                isValid = false;
                groupEmail.classList.add('invalid', 'invalid-shake');
                if (!firstInvalidEl) firstInvalidEl = inputEmail;
                setTimeout(() => groupEmail.classList.remove('invalid-shake'), 400);
            } else {
                groupEmail.classList.remove('invalid');
            }

            // Message verification
            if (!inputMessage || inputMessage.value.trim() === '') {
                isValid = false;
                groupMessage.classList.add('invalid', 'invalid-shake');
                if (!firstInvalidEl) firstInvalidEl = inputMessage;
                setTimeout(() => groupMessage.classList.remove('invalid-shake'), 400);
            } else {
                groupMessage.classList.remove('invalid');
            }

            if (!isValid) {
                if (firstInvalidEl) firstInvalidEl.focus();
                return;
            }

            // If valid, formulate mailto URL
            const nameVal = encodeURIComponent(inputName.value.trim());
            const emailVal = encodeURIComponent(inputEmail.value.trim());
            const interestVal = encodeURIComponent(inputInterest ? inputInterest.value : 'Meta Ads');
            const messageVal = encodeURIComponent(inputMessage.value.trim());

            const mailtoUrl = `mailto:affanrunsads@gmail.com?subject=Inquiry from ${nameVal} regarding ${interestVal}&body=Sender Name: ${nameVal}%0D%0ASender Email: ${emailVal}%0D%0AInterest: ${interestVal}%0D%0A%0D%0AMessage:%0D%0A${messageVal}`;

            // Trigger mailto link
            const tempLink = document.createElement('a');
            tempLink.href = mailtoUrl;
            tempLink.click();

            // Transition to elegant Success Card
            const originalFormHtml = contactFormContainer.innerHTML;
            
            contactFormContainer.innerHTML = `
                <div class="success-card">
                    <div class="success-icon-wrapper">✓</div>
                    <h3 class="success-title">Message Formatted!</h3>
                    <p class="success-desc">
                        I've formatted your inquiry and launched your system's email client. If your client didn't open automatically, use the buttons below to manually trigger or reset.
                    </p>
                    <div class="success-buttons">
                        <a href="${mailtoUrl}" class="btn btn-primary btn-shimmer" id="successTriggerMail">Open Mail Client Again</a>
                        <button class="btn btn-secondary" id="successResetBtn" style="border: 1px solid rgba(255,255,255,0.15); background: transparent; color: #fff;">Send Another Message</button>
                    </div>
                </div>
            `;

            // Setup listeners inside success card
            const successResetBtn = document.getElementById('successResetBtn');
            if (successResetBtn) {
                successResetBtn.addEventListener('click', () => {
                    contactFormContainer.innerHTML = originalFormHtml;
                    // Rebind event listener on the newly-inserted form
                    const reloadedForm = document.getElementById('contact-form');
                    if (reloadedForm) {
                        // Clear fields and re-run DOMContentLoaded contactForm logic
                        reloadedForm.reset();
                        // Recursive call to bind events (cleanest implementation)
                        window.location.reload();
                    }
                });
            }
        });
    }

    // ==========================================================================
    // Clipboard Utility Operations
    // ==========================================================================
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyPhoneBtn = document.getElementById('copyPhoneBtn');
    const emailCard = document.getElementById('contact-email-card');
    const phoneCard = document.getElementById('contact-phone-card');

    function performCopy(textToCopy, tooltipEl) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => showCopiedFeedback(tooltipEl))
                .catch(() => fallbackCopy(textToCopy, tooltipEl));
        } else {
            fallbackCopy(textToCopy, tooltipEl);
        }
    }

    function fallbackCopy(text, tooltipEl) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed'; // Avoid scrolling
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showCopiedFeedback(tooltipEl);
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
    }

    function showCopiedFeedback(tooltipEl) {
        if (!tooltipEl) return;
        const originalText = tooltipEl.textContent;
        tooltipEl.textContent = 'Copied!';
        tooltipEl.style.opacity = '1';
        tooltipEl.style.visibility = 'visible';

        setTimeout(() => {
            tooltipEl.textContent = originalText;
            tooltipEl.style.opacity = '';
            tooltipEl.style.visibility = '';
        }, 2000);
    }

    if (copyEmailBtn) {
        const tooltip = copyEmailBtn.querySelector('.copy-tooltip');
        copyEmailBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering card click
            performCopy('affanrunsads@gmail.com', tooltip);
        });
    }

    if (copyPhoneBtn) {
        const tooltip = copyPhoneBtn.querySelector('.copy-tooltip');
        copyPhoneBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering card click
            performCopy('+92 330 2617263', tooltip);
        });
    }

    // Clicking the cards triggers their default respective actions
    if (emailCard) {
        emailCard.addEventListener('click', (e) => {
            // Check if copy button was clicked
            if (e.target.closest('#copyEmailBtn')) return;
            window.location.href = 'mailto:affanrunsads@gmail.com';
        });
    }

    if (phoneCard) {
        phoneCard.addEventListener('click', (e) => {
            // Check if copy button was clicked
            if (e.target.closest('#copyPhoneBtn')) return;
            window.location.href = 'tel:+923302617263';
        });
    }
});
