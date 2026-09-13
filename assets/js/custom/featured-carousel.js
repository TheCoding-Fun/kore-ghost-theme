function initHomeFeaturedCarousel() {
  if (window.__ghHomeFeaturedCarouselInitialized) {
    return;
  }

  if (!document.body || !document.body.classList.contains('home-template')) {
    return;
  }

  const carousels = document.querySelectorAll('.gh-featured [data-autoplay="true"], .gh-featured .k--carousel[data-autoplay="true"]');

  if (!carousels.length) {
    return;
  }

  carousels.forEach((carousel) => {
    const wrapper = carousel.parentElement;
    const items = [...carousel.querySelectorAll('.k--carousel-item')];
    const prevButton = wrapper?.querySelector('[data-carousel-prev]');
    const nextButton = wrapper?.querySelector('[data-carousel-next]');

    if (!items.length) return;

    let currentIndex = 0;
    let timerId = null;

    const scrollToCurrent = () => {
      const item = items[currentIndex];
      if (!item || !carousel) return;

      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      const viewportWidth = carousel.clientWidth;
      const scrollLeft = carousel.scrollLeft;
      const targetScroll = itemLeft - (viewportWidth - itemWidth) / 2;

      carousel.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });

      if (scrollLeft === carousel.scrollLeft && itemLeft < scrollLeft) {
        carousel.scrollLeft = Math.max(0, itemLeft - 24);
      }
    };

    const goTo = (direction) => {
      currentIndex = (currentIndex + direction + items.length) % items.length;
      scrollToCurrent();
    };

    const start = () => {
      stop();
      timerId = window.setInterval(() => {
        goTo(1);
      }, 5000);
    };

    const stop = () => {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = null;
      }
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        stop();
        goTo(-1);
        start();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        stop();
        goTo(1);
        start();
      });
    }

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    start();
  });

  window.__ghHomeFeaturedCarouselInitialized = true;
}
