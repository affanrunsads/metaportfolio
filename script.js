// ==========================================================================
// Affan Runs Ads — Shared Script
// ==========================================================================

// Dark/Light Theme Handler
(function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const savedCountry = localStorage.getItem('country');
    if (savedCountry) {
        document.documentElement.setAttribute('data-country', savedCountry);
        document.addEventListener('DOMContentLoaded', () => {
            document.body.setAttribute('data-country', savedCountry);
        });
    }
})();

// Preloader
window.addEventListener('load', () => {
    const pre = document.querySelector('.preloader');
    if (pre) setTimeout(() => pre.classList.add('hidden'), 500);
});

// Theme toggle button setup
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });
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
        const exportBtn = document.getElementById('btn-export-calc');

        // Restore values from localStorage
        const storedBudget = localStorage.getItem('calc_budget');
        const storedCpc = localStorage.getItem('calc_cpc');
        const storedConv = localStorage.getItem('calc_conv');
        const storedAov = localStorage.getItem('calc_aov');

        if (storedBudget) { calcBudgetNum.value = storedBudget; calcBudgetRange.value = storedBudget; }
        if (storedCpc) { calcCpcNum.value = storedCpc; calcCpcRange.value = storedCpc; }
        if (storedConv) { calcConvNum.value = storedConv; calcConvRange.value = storedConv; }
        if (storedAov) { calcAovNum.value = storedAov; calcAovRange.value = storedAov; }

        function formatCurrency(val) {
            const isNegative = val < 0;
            const absVal = Math.abs(val);
            const activeCountry = localStorage.getItem('country') || 'usa';
            if (activeCountry === 'pakistan') {
                const formatted = new Intl.NumberFormat('en-PK', {
                    style: 'currency',
                    currency: 'PKR',
                    maximumFractionDigits: 0
                }).format(absVal);
                return isNegative ? `-${formatted}` : formatted;
            } else {
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                }).format(absVal);
                return isNegative ? `-${formatted}` : formatted;
            }
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

            // Save variables to localStorage
            localStorage.setItem('calc_budget', budget);
            localStorage.setItem('calc_cpc', cpc);
            localStorage.setItem('calc_conv', conv);
            localStorage.setItem('calc_aov', aov);

            // Update Visual Progress Bar
            const calcEfficiencyBar = document.getElementById('calcEfficiencyBar');
            if (calcEfficiencyBar) {
                const barWidth = Math.min(Math.max((roas / 3.5) * 100, 10), 100);
                calcEfficiencyBar.style.width = barWidth + '%';

                // Colorize bar gradient dynamically based on profitability
                if (roas < 1.0) {
                    calcEfficiencyBar.style.background = 'linear-gradient(to right, #e74c3c, #f39c12)';
                } else if (roas < 2.5) {
                    calcEfficiencyBar.style.background = 'linear-gradient(to right, #f39c12, var(--gold))';
                } else {
                    calcEfficiencyBar.style.background = 'linear-gradient(to right, var(--gold), #2ecc71)';
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

        // Export Report Handler
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const budget = calcBudgetNum.value;
                const cpc = calcCpcNum.value;
                const conv = calcConvNum.value;
                const aov = calcAovNum.value;
                const clicks = resClicks ? resClicks.textContent : "0";
                const purchases = resPurchases ? resPurchases.textContent : "0";
                const revenue = resRevenue ? resRevenue.textContent : "$0";
                const roas = resRoas ? resRoas.textContent : "0x";
                const profit = resProfit ? resProfit.textContent : "$0";

                const activeCountry = localStorage.getItem('country') || 'usa';
                const currencySymbol = activeCountry === 'pakistan' ? 'PKR ' : '$';
                const textReport = `===================================================
AFFAN RUNS ADS - META PERFORMANCE SIMULATION REPORT
===================================================

[CAMPAIGN INPUT VARIABLES]
- Monthly Ad Spend: ${currencySymbol}${parseFloat(budget).toLocaleString()}
- Average Cost Per Click (CPC): ${currencySymbol}${parseFloat(cpc).toFixed(2)}
- Conversion Rate (CVR): ${parseFloat(conv).toFixed(1)}%
- Average Order Value (AOV): ${currencySymbol}${parseFloat(aov).toLocaleString()}

[SIMULATED PERFORMANCE RESULTS]
- Estimated Clicks: ${clicks}
- Estimated Purchases: ${purchases}
- Total Estimated Revenue: ${revenue}
- Estimated Net Profit: ${profit}
- Return on Ad Spend (ROAS): ${roas}

[AFFAN'S ACQUISITION STRATEGY ADVICE]
If your ROAS is below 2.5x, we recommend deploying dynamic creative
hook testing models. Slicing CPC down and lifting CVR through structured
survey presell routes are proven ways to unlock highly profitable scaling.

Let's scale your brand together.
Website: https://affanrunsads.github.io/metaportfolio/
Contact: affanrunsads@gmail.com
===================================================`;

                const blob = new Blob([textReport], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const tempLink = document.createElement('a');
                tempLink.href = url;
                tempLink.download = `AffanRunsAds_Simulation_Report.txt`;
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                URL.revokeObjectURL(url);
            });
        }

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

    // ==========================================================================
    // Interactive FAQ Accordions Handler
    // ==========================================================================
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const item = toggle.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const icon = toggle.querySelector('.faq-icon');

            const isOpen = item.classList.contains('active');

            // Close other FAQs for a clean accordion user experience
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                if (otherAnswer) otherAnswer.style.maxHeight = '0';
                if (otherIcon) otherIcon.textContent = '+';
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) icon.textContent = '−';
            }
        });
    });

    // ==========================================================================
    // "Discovery Call" Interactive Scheduler Modal Handler
    // ==========================================================================
    const openSchedulerBtn = document.getElementById('openSchedulerBtn');
    const closeSchedulerBtn = document.getElementById('closeSchedulerBtn');
    const schedulerModal = document.getElementById('schedulerModal');
    const confirmScheduleBtn = document.getElementById('confirmScheduleBtn');
    const submitScheduleBtn = document.getElementById('submitScheduleBtn');
    const closeSuccessSchedulerBtn = document.getElementById('closeSuccessSchedulerBtn');

    const step1 = document.getElementById('schedulerStep1');
    const step2 = document.getElementById('schedulerStep2');
    const stepSuccess = document.getElementById('schedulerStepSuccess');

    const schedulerDate = document.getElementById('scheduler-date');
    const schedulerTime = document.getElementById('scheduler-time');
    const schedulerBrand = document.getElementById('scheduler-brand');
    const schedulerEmail = document.getElementById('scheduler-email');

    const successDateText = document.getElementById('success-date-text');
    const successTimeText = document.getElementById('success-time-text');

    // Pre-populate date with tomorrow
    if (schedulerDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        schedulerDate.value = tomorrow.toISOString().split('T')[0];
        schedulerDate.min = tomorrow.toISOString().split('T')[0];
    }

    if (openSchedulerBtn && schedulerModal) {
        openSchedulerBtn.addEventListener('click', () => {
            schedulerModal.classList.add('open');
            document.body.style.overflow = 'hidden';

            // Reset to step 1
            if (step1) step1.style.display = 'block';
            if (step2) step2.style.display = 'none';
            if (stepSuccess) stepSuccess.style.display = 'none';
        });

        const closeModalFunc = () => {
            schedulerModal.classList.remove('open');
            document.body.style.overflow = '';
        };

        if (closeSchedulerBtn) closeSchedulerBtn.addEventListener('click', closeModalFunc);
        if (closeSuccessSchedulerBtn) closeSuccessSchedulerBtn.addEventListener('click', closeModalFunc);
        schedulerModal.addEventListener('click', (e) => {
            if (e.target === schedulerModal) closeModalFunc();
        });

        // Step 1 to Step 2 Transition
        if (confirmScheduleBtn && step1 && step2) {
            confirmScheduleBtn.addEventListener('click', () => {
                if (!schedulerDate.value) {
                    schedulerDate.focus();
                    return;
                }
                step1.style.display = 'none';
                step2.style.display = 'block';
            });
        }

        // Final Submission
        if (submitScheduleBtn && step2 && stepSuccess) {
            submitScheduleBtn.addEventListener('click', () => {
                if (!schedulerBrand.value.trim()) {
                    schedulerBrand.focus();
                    return;
                }
                if (!schedulerEmail.value.trim() || !schedulerEmail.value.includes('@')) {
                    schedulerEmail.focus();
                    return;
                }

                const dateVal = schedulerDate.value;
                const timeVal = schedulerTime.value;
                const brandVal = schedulerBrand.value.trim();
                const emailVal = schedulerEmail.value.trim();

                if (successDateText) successDateText.textContent = dateVal;
                if (successTimeText) successTimeText.textContent = timeVal;

                // Formulate Zoom/Discovery Call mailto trigger
                const mailtoUrl = `mailto:affanrunsads@gmail.com?subject=Discovery Session Requested - ${encodeURIComponent(brandVal)}&body=Brand/Company: ${encodeURIComponent(brandVal)}%0D%0AContact Email: ${encodeURIComponent(emailVal)}%0D%0ASelected Date: ${encodeURIComponent(dateVal)}%0D%0ASelected Time Slot: ${encodeURIComponent(timeVal)}%0D%0A%0D%0APlease send the secure Zoom invitation link over to confirm this booking.`;

                // Trigger mail client
                const tempLink = document.createElement('a');
                tempLink.href = mailtoUrl;
                tempLink.click();

                // Show Success Step
                step2.style.display = 'none';
                stepSuccess.style.display = 'block';
            });
        }
    }

    // Auto-fill Interest query parameter if passed in URL
    const urlParams = new URLSearchParams(window.location.search);
    const interestParam = urlParams.get('interest');
    const planParam = urlParams.get('plan');
    const contactInterestSelect = document.getElementById('contact-interest');
    const contactMessageTextarea = document.getElementById('contact-message');

    if (contactInterestSelect && interestParam) {
        // Find matching option
        for (let i = 0; i < contactInterestSelect.options.length; i++) {
            if (contactInterestSelect.options[i].text.toLowerCase().includes(interestParam.toLowerCase()) ||
                interestParam.toLowerCase().includes(contactInterestSelect.options[i].text.toLowerCase())) {
                contactInterestSelect.selectedIndex = i;
                break;
            }
        }
    }
    if (contactMessageTextarea && planParam) {
        contactMessageTextarea.value = `Hi Affan, I'm interested in scaling my business using the custom [${planParam}] package. Let's audit my current Meta Ads campaigns!`;
    }

    // ==========================================================================
    // Back to Top Smooth Scroll Visibility Controller
    // ==========================================================================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // Premium Mouse Tracer Highlights for Case Studies Grid
    // ==========================================================================
    const caseCards = document.querySelectorAll('.case-study-card');
    caseCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================================================
    // Country Localization Engine (JULES)
    // ==========================================================================
    const countryModal = document.getElementById('countryModal');
    const countrySelectorBtn = document.getElementById('countrySelectorBtn');
    const countryDropdownMenu = document.getElementById('countryDropdownMenu');
    const navCountryFlag = document.getElementById('nav-country-flag');
    const navCountryName = document.getElementById('nav-country-name');

    // 1. Setup Active Country on Body and UI
    function setCountry(country, shouldReload = false) {
        localStorage.setItem('country', country);
        document.documentElement.setAttribute('data-country', country);
        document.body.setAttribute('data-country', country);

        // Update Nav selector display
        if (country === 'pakistan') {
            if (navCountryFlag) navCountryFlag.textContent = '🇵🇰';
            if (navCountryName) navCountryName.textContent = 'PKR';
        } else {
            if (navCountryFlag) navCountryFlag.textContent = '🇺🇸';
            if (navCountryName) navCountryName.textContent = 'USA';
        }

        // Apply dynamic layout/ranges for Meta Ads Calculator if on Homepage
        adjustCalculatorConfig(country);

        // Trigger dynamic page update/rendering if requested
        if (shouldReload) {
            window.location.reload();
        }
    }

    // 2. Adjust Ranges and Labels on the Performance Calculator
    function adjustCalculatorConfig(country) {
        const budgetLabel = document.querySelector('label[for="calc-budget-range"]');
        const budgetRange = document.getElementById('calc-budget-range');
        const budgetNum = document.getElementById('calc-budget');

        const cpcLabel = document.querySelector('label[for="calc-cpc-range"]');
        const cpcRange = document.getElementById('calc-cpc-range');
        const cpcNum = document.getElementById('calc-cpc');

        const aovLabel = document.querySelector('label[for="calc-aov-range"]');
        const aovRange = document.getElementById('calc-aov-range');
        const aovNum = document.getElementById('calc-aov');

        if (!budgetRange) return; // Calculator is not on this page

        if (country === 'pakistan') {
            // Pakistan specific benchmarks & currency (Rs/PKR)
            if (budgetLabel) budgetLabel.textContent = 'Monthly Ad Spend (PKR Rs)';
            if (cpcLabel) cpcLabel.textContent = 'Average Cost Per Click (CPC) (PKR Rs)';
            if (aovLabel) aovLabel.textContent = 'Average Order Value (AOV) (PKR Rs)';

            // Adjust ranges and defaults for PKR
            budgetRange.min = "10000";
            budgetRange.max = "5000000";
            budgetRange.step = "10000";
            if (parseFloat(budgetNum.value) < 10000 || parseFloat(budgetNum.value) === 10000) {
                budgetRange.value = "250000";
                budgetNum.value = "250000";
            }
            const minBudgetSpan = budgetRange.parentNode.querySelector('.calc-range-output span:first-child');
            const maxBudgetSpan = budgetRange.parentNode.querySelector('.calc-range-output span:last-child');
            if (minBudgetSpan) minBudgetSpan.textContent = 'Rs 10K';
            if (maxBudgetSpan) maxBudgetSpan.textContent = 'Rs 5M+';

            cpcRange.min = "1";
            cpcRange.max = "150";
            cpcRange.step = "1";
            if (parseFloat(cpcNum.value) < 1) {
                cpcRange.value = "20";
                cpcNum.value = "20";
            }
            const minCpcSpan = cpcRange.parentNode.querySelector('.calc-range-output span:first-child');
            const maxCpcSpan = cpcRange.parentNode.querySelector('.calc-range-output span:last-child');
            if (minCpcSpan) minCpcSpan.textContent = 'Rs 1';
            if (maxCpcSpan) maxCpcSpan.textContent = 'Rs 150';

            aovRange.min = "500";
            aovRange.max = "50000";
            aovRange.step = "100";
            if (parseFloat(aovNum.value) < 500) {
                aovRange.value = "4500";
                aovNum.value = "4500";
            }
            const minAovSpan = aovRange.parentNode.querySelector('.calc-range-output span:first-child');
            const maxAovSpan = aovRange.parentNode.querySelector('.calc-range-output span:last-child');
            if (minAovSpan) minAovSpan.textContent = 'Rs 500';
            if (maxAovSpan) maxAovSpan.textContent = 'Rs 50K';

        } else {
            // US specific benchmarks & currency ($)
            if (budgetLabel) budgetLabel.textContent = 'Monthly Ad Spend ($)';
            if (cpcLabel) cpcLabel.textContent = 'Average Cost Per Click (CPC) ($)';
            if (aovLabel) aovLabel.textContent = 'Average Order Value (AOV) ($)';

            // Reset US ranges
            budgetRange.min = "1000";
            budgetRange.max = "100000";
            budgetRange.step = "1000";
            if (parseFloat(budgetNum.value) > 100000) {
                budgetRange.value = "10000";
                budgetNum.value = "10000";
            }
            const minBudgetSpan = budgetRange.parentNode.querySelector('.calc-range-output span:first-child');
            const maxBudgetSpan = budgetRange.parentNode.querySelector('.calc-range-output span:last-child');
            if (minBudgetSpan) minBudgetSpan.textContent = '$1,000';
            if (maxBudgetSpan) maxBudgetSpan.textContent = '$100,000+';

            cpcRange.min = "0.10";
            cpcRange.max = "5.00";
            cpcRange.step = "0.05";
            if (parseFloat(cpcNum.value) > 5) {
                cpcRange.value = "0.80";
                cpcNum.value = "0.80";
            }
            const minCpcSpan = cpcRange.parentNode.querySelector('.calc-range-output span:first-child');
            const maxCpcSpan = cpcRange.parentNode.querySelector('.calc-range-output span:last-child');
            if (minCpcSpan) minCpcSpan.textContent = '$0.10';
            if (maxCpcSpan) maxCpcSpan.textContent = '$5.00';

            aovRange.min = "10";
            aovRange.max = "1000";
            aovRange.step = "5";
            if (parseFloat(aovNum.value) > 1000) {
                aovRange.value = "75";
                aovNum.value = "75";
            }
            const minAovSpan = aovRange.parentNode.querySelector('.calc-range-output span:first-child');
            const maxAovSpan = aovRange.parentNode.querySelector('.calc-range-output span:last-child');
            if (minAovSpan) minAovSpan.textContent = '$10';
            if (maxAovSpan) maxAovSpan.textContent = '$1,000';
        }

        // Re-execute calculations with corrected parameters
        if (typeof calculatePerformance === 'function') {
            calculatePerformance();
        }
    }

    // 3. Setup First-Time Country Popup Logic (Only on Home/index.html)
    const activeCountry = localStorage.getItem('country');
    if (!activeCountry) {
        if (countryModal) {
            setTimeout(() => {
                countryModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }, 600);
        } else {
            // Default to US if not on Home Page and not set yet
            setCountry('usa');
        }
    } else {
        setCountry(activeCountry);
    }

    // 4. Modal Click Handlers
    const countryModalBtns = document.querySelectorAll('.country-modal-btn');
    countryModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedCountry = btn.dataset.country;
            if (countryModal) countryModal.classList.remove('open');
            document.body.style.overflow = '';
            setCountry(selectedCountry, true);
        });
    });

    // 5. Navbar Selector Toggle Handlers
    if (countrySelectorBtn && countryDropdownMenu) {
        countrySelectorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            countryDropdownMenu.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            countryDropdownMenu.classList.remove('open');
        });

        // Dropdown Items Click Handlers
        const dropdownItems = document.querySelectorAll('.country-dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedCountry = item.dataset.country;
                countryDropdownMenu.classList.remove('open');
                setCountry(selectedCountry, true);
            });
        });
    }
});
