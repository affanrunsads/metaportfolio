AFFAN RUNS ADS — SITE UPGRADE — SETUP NOTES
=============================================

WHAT'S IN THIS FOLDER
----------------------
index.html         Home page
about.html          About / bio / skills / timeline
portfolio.html      Reels grid (filterable) + case study metrics
mentorship.html     Mentorship program + team testimonials
contact.html        Contact form + contact links
styles.css          Shared styles for all pages
script.js           Shared JS (nav, animations, reels data, modal)
sitemap.xml          For Google Search Console
robots.txt           Points crawlers to the sitemap
images/              Put profile.png here (same as before)
videos/              Not used anymore — reels are YouTube-hosted (see below)

REELS — NOW YOUTUBE-HOSTED
-----------------------------
All 6 reels are wired up to your YouTube Shorts already:
  1. Case Study: $0.02 CPR Campaign     -> qYadKfnz2CA
  2. Client Review — E-commerce Brand    -> B2vHEkw9rG0
  3. Behind the Scenes: Ad Creative Testing -> JbqUXA6x6TY
  4. Case Study: 11% CTR Breakdown       -> UCM9a6_SfKE
  5. Client Review — SaaS Launch         -> pNZZTZHFrf0
  6. Mentorship Student Result           -> HjbjXVJOb-M

The reel grid shows YouTube's own thumbnail image (fast) and only
loads the embedded player when someone clicks a card. To add or swap
reels later, open script.js, find the REELS array near the top, and
edit the "youtubeId" field (just the ID from the YouTube URL, not the
full link) for each entry.

BEFORE YOU UPLOAD
--------------------
1. Add your photo: images/profile.png (this file is not included —
   drag your existing photo into the images folder, keep the filename).
2. Update mentorship.html testimonials with your mentees' real names,
   roles and quotes once you have their permission to use them.

WHEN YOU GET A DOMAIN (or know your GitHub Pages URL)
---------------------------------------------------------
Every page has "https://affanrunsads.github.io/metaportfolio/" hardcoded in:
  - the <link rel="canonical"> tag
  - the <meta property="og:url"> and og:image tags
  - the JSON-LD schema "url" fields
  - sitemap.xml and robots.txt
Find-and-replace that placeholder URL with your real GitHub Pages URL
(e.g. https://yourusername.github.io/affanrunsads/) or custom domain
once you have one — this matters for SEO and AI Overview.

===========================================================
HOW TO DEPLOY ON GITHUB PAGES (step by step)
===========================================================

1. CREATE A REPOSITORY
   - Log into github.com with your new account.
   - Click the "+" icon top-right -> "New repository".
   - Name it something like "affanrunsads" (repo name becomes part
     of your URL, so keep it simple).
   - Set it to "Public" (required for free GitHub Pages).
   - Do NOT initialize with a README (you're uploading your own files).
   - Click "Create repository".

2. UPLOAD YOUR FILES
   - On the new repo's page, click "uploading an existing file"
     (or "Add file" -> "Upload files").
   - Drag in ALL the files and folders from this package:
     index.html, about.html, portfolio.html, mentorship.html,
     contact.html, styles.css, script.js, sitemap.xml, robots.txt,
     the google verification .html file, and the images folder
     (with your profile.png inside it).
   - Scroll down, add a commit message like "Initial site upload",
     click "Commit changes".

3. TURN ON GITHUB PAGES
   - In your repo, go to "Settings" (top menu).
   - In the left sidebar, click "Pages".
   - Under "Build and deployment" -> "Source", choose
     "Deploy from a branch".
   - Under "Branch", select "main" and folder "/ (root)", click Save.
   - Wait 1-2 minutes. Refresh the Pages settings page — it will show
     your live URL, something like:
     https://yourusername.github.io/affanrunsads/

4. UPDATE THE URLS IN YOUR FILES
   - Once you have that live URL, go back through index.html,
     about.html, portfolio.html, mentorship.html, contact.html,
     sitemap.xml, and robots.txt.
   - Replace every instance of
     "https://affanrunsads.github.io/metaportfolio/" with your real GitHub Pages
     URL (e.g. "https://yourusername.github.io/affanrunsads/").
   - You can edit files directly on GitHub: open the file, click the
     pencil (Edit) icon, use Ctrl+F / Cmd+F in your browser if needed,
     save with "Commit changes". Repeat for each file.

5. SUBMIT TO SEARCH ENGINES
   - Go to search.google.com/search-console, add your GitHub Pages
     URL as a property, verify with the google verification file
     already included in this package (it verifies automatically
     once the file is live at yoursite/google7ee0245db6186853.html).
   - Use "Request Indexing" on each page, and submit sitemap.xml
     under "Sitemaps".
   - Do the same on Bing Webmaster Tools (bing.com/webmasters).

6. KEEP YOUR ENTITY CONSISTENT
   - Make sure your Instagram bio and LinkedIn headline/about section
     say "Affan Runs Ads" — this links your social profiles to your
     site as one entity, which is what AI Overview draws from.

NOTE ON CUSTOM DOMAINS WITH GITHUB PAGES
--------------------------------------------
If you later buy a domain (e.g. affanrunsads.com), GitHub Pages
supports connecting it for free: Settings -> Pages -> "Custom domain"
field, then add a CNAME record at your domain registrar pointing to
yourusername.github.io. GitHub will also handle free HTTPS for it.

CONTACT FORM NOTE
--------------------
contact.html uses a mailto: form (opens the visitor's email app
pre-filled) — this works on any static host, including GitHub Pages,
since it doesn't need a server. If you want a form that submits
silently without opening email, you'd need a third-party service like
Formspree (formspree.io has a free tier) since GitHub Pages can't run
server-side form handling.
