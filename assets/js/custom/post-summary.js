function initPostSummaryToc() {
  if (window.__ghPostSummaryTocInitialized) {
    return;
  }

  const summaryRoot = document.querySelector('.gh-post-summary');
  const tocRoot = document.querySelector('.gh-toc');

  if (!summaryRoot || !tocRoot || !window.tocbot) {
    return;
  }

  const stickyHeader = document.querySelector('.gh-navigation.fixed, .gh-navigation.is-fixed') || document.querySelector('.has-sticky-header');
  const initSettings = {
    tocSelector: '.gh-toc',
    contentSelector: '.gh-content',
    ignoreSelector: '.js-toc-ignore, .kg-signup-card-heading, .kg-header-card-heading',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true,
    headingsOffset: 10,
    scrollSmoothOffset: -10
  };

  if (stickyHeader) {
    initSettings.headingsOffset = 85;
    initSettings.scrollSmoothOffset = -85;
  }

  window.tocbot.init(initSettings);
  window.__ghPostSummaryTocInitialized = true;
}
