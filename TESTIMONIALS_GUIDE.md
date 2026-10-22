# Testimonials Guide

## How to add screenshots to the testimonials page

1. Copy your screenshot into the `images/` directory. For example, `images/my_screenshot.png`.
2. Open `testimonials.html`.
3. Locate the grid container, looking for `<div class="testimonials-grid">`.
4. Add the following HTML inside the grid:

```html
<div class="testimonial-card reveal">
    <div class="testimonial-image-container">
        <img src="images/my_screenshot.png" alt="Testimonial screenshot" oncontextmenu="return false;">
        <div class="watermark">Affan Runs Ads</div>
    </div>
</div>
```

The anti-theft properties (disabling drag, disabling right-click, and adding the watermark overlay) are already configured in CSS.
