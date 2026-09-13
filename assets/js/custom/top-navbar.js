function readProgressIndicator() {
  const articleClass = ".gh-article";
  const isPost = document.querySelector(".post-template");
  const progressBar = document.querySelector(".gh-reading-progress");
  const articleEl = document.querySelector(articleClass);

  function updateProgress() {
    const heigthFromTop = articleEl?.offsetTop ?? 0;
    const totalHeight = articleEl?.clientHeight ?? document.body.clientHeight;
    const windowHeight = document.documentElement.clientHeight;
    const position =
      window.scrollY <= heigthFromTop ? 0 : window.scrollY - heigthFromTop;
    const progress = (position / (totalHeight - windowHeight)) * 100;
    progressBar.setAttribute("value", progress);
    requestAnimationFrame(updateProgress);
  }
  if (isPost && articleEl && progressBar) {
    requestAnimationFrame(updateProgress);
  }
}

function mobileBurgerToggle() {
  const navigation = document.querySelector(".gh-navigation");
  const actions = navigation.querySelector(".gh-navigation-actions");
  const burger = navigation.querySelector(".gh-burger");
  if (!burger) return;

  burger.addEventListener("click", function () {
    if (!navigation.classList.contains("is-open")) {
      navigation.classList.add("is-open");
      document.documentElement.style.overflowY = "hidden";
      // if header is sticky, remove transparency for burger menu
      if (navigation.classList.contains("fixed")) {
        navigation.classList.add("bg-(--header-bg)");
        navigation.classList.remove("bg-(--header-bg)/60");
        actions.classList.remove("bg-transparent");
      }
    } else {
      navigation.classList.remove("is-open");
      document.documentElement.style.overflowY = null;
      // if header is sticky, restore transparency on close
      if (navigation.classList.contains("fixed")) {
        navigation.classList.remove("bg-(--header-bg)");
        navigation.classList.add("bg-(--header-bg)/60");
        actions.classList.add("bg-transparent");
      }
    }
  });
}

function stickyHeaderSizeControl() {
  const navigation = document.querySelector(".gh-navigation");

  function throttle(callback, limit) {
    let timeout, date;

    return function (...args) {
      if (date) {
        clearTimeout(timeout);
        timeout = setTimeout(
          function () {
            if (Date.now() - date >= limit) {
              callback.apply(this, args);
              date = Date.now();
            }
          },
          limit - (Date.now() - date),
        );
      } else {
        callback.apply(this, args);
        date = Date.now();
      }
    };
  }
  if (navigation.classList.contains("fixed")) {
    window.addEventListener(
      "scroll",
      throttle(function () {
        const fromTop = window.scrollY;
        if (fromTop > 100) {
          navigation.classList.add("scroll-small");
        } else {
          navigation.classList.remove("scroll-small");
        }
      }, 150),
    );
  }
}
