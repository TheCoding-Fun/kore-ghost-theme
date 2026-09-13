document.addEventListener('DOMContentLoaded', function () {

    /* Theme switcher */
    themeInit();
    themeToggle();

    /* Mobile menu burger toggle */
    mobileBurgerToggle();

    /* Turn the main nav into dropdown menu when there are more than 5 menu items */
    dropdown();

    /* Read progress indicator */
    readProgressIndicator();

    /* Smaller sticky header on scroll */
    stickyHeaderSizeControl();

    /* Table of contents for post summary */
    initPostSummaryToc();

    /* Homepage featured carousel */
    if (document.body.classList.contains('home-template')) {
        initHomeFeaturedCarousel();
    }

    /* Scroll to top */
    scrollToTop()

    /* Write current year in footer */
    footerYear()

    /* Add lightbox to gallery images */
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img'
    );

    /* Infinite scroll pagination */
    if (!document.body.classList.contains('home-template') && !document.body.classList.contains('post-template')) {
        pagination();
    }

    /* Responsive HTML table */
    const tables = document.querySelectorAll('.gh-content > table:not(.gist table)');
    tables.forEach(function (table) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gh-table';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });


    /* Responsive video in post content */
    const sources = [
        '.gh-content iframe[src*="youtube.com"]',
        '.gh-content iframe[src*="youtube-nocookie.com"]',
        '.gh-content iframe[src*="player.vimeo.com"]',
        '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.gh-content object',
        '.gh-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));

});



